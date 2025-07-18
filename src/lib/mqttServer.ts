import { EventEmitter } from 'node:events';
import type { Server as NetServer, Socket } from 'node:net';
// eslint-disable-next-line no-duplicate-imports
import net from 'node:net';

import type { MqttClient, Packet } from 'mqtt-connection';
// eslint-disable-next-line no-duplicate-imports
import mqttCon from 'mqtt-connection';

import type { MqttConnectEvent, MqttMessageEvent } from './mqtt-events';

type MqttClient = typeof MqttClient;
type Packet = typeof Packet;

export interface MqttServerOptions {
    port?: number;
    host?: string;
}

export class MqttServer extends EventEmitter {
    private server: NetServer;
    private port: number;
    private host: string;
    //private adapter: ioBroker.Adapter;
    private log: ioBroker.Log;

    constructor(adapter: ioBroker.Adapter, options: MqttServerOptions = {}) {
        super();
        this.log = adapter.log;
        this.host = options.host ?? '0.0.0.0';
        this.port = options.port ?? 1883;

        this.log.silly(`[MQTT-Server] init server at ${this.host}:${this.port}`);
        this.server = net.createServer(this.handleConnection.bind(this));
    }

    private handleConnection(stream: Socket): void {
        const remoteAddress = stream.remoteAddress || 'unknown';
        this.log.silly(`[MQTT-Server] client connect from  ${remoteAddress}`);

        const client: MqttClient = mqttCon(stream);
        let clientId: any;

        client.on('connect', (packet: Packet) => {
            clientId = packet.clientId;
            this.log.silly(
                `[MQTT-Server] (${clientId}) client connected with id ${packet.clientId} connected from ${remoteAddress}`,
            );

            // Acknowledge connection
            client.connack({ returnCode: 0 });

            // report connection
            this.emit('connect', {
                clientId: packet.clientId,
                ip: remoteAddress,
                packet,
            } as MqttConnectEvent);
        });

        client.on('publish', (packet: Packet) => {
            this.log.silly(
                `[MQTT-Server] (${clientId}) received message on topic "${packet.topic}": ${packet.payload?.toString()}`,
            );

            if (packet.qos && packet.qos > 0) {
                client.puback({ messageId: packet.messageId });
            }

            // report message
            this.emit('message', {
                clientId: client.id || '',
                ip: remoteAddress,
                topic: packet.topic,
                payload: packet.payload,
                qos: packet.qos ?? 0,
                retain: packet.retain ?? false,
                packet,
            } as MqttMessageEvent);
        });

        client.on('subscribe', (packet: Packet) => {
            packet.subscriptions.forEach((sub: any) => {
                this.log.silly(`[MQTT-Server] (${clientId}) client ${packet.clientId} subscribed to "${sub.topic}"`);
            });
            // Grant all requested QoS levels
            client.suback({
                granted: packet.subscriptions.map((sub: any) => sub.qos ?? 0),
                messageId: client._lastSubscriptionId || 1,
            });
        });

        client.on('unsubscribe', (unsubscriptions: any[]) => {
            unsubscriptions.forEach(topic => {
                this.log.silly(`[MQTT-Server] (${clientId}) client unsubscribed from "${topic}"`);
            });
            client.unsuback({ messageId: client._lastUnsubscribeId || 1 });
        });

        client.on('pingreq', () => {
            this.log.silly(`[MQTT-Server] (${clientId}) client ping`);
            client.pingresp();
        });

        client.on('disconnect', () => {
            this.log.silly(`[MQTT-Server] (${clientId}) client disconnect from  ${remoteAddress}`);
            client.stream.end();
        });

        client.on('close', () => {
            this.log.silly(`[MQTT-Server] (${clientId}) client ${remoteAddress} closed connection`);
        });

        client.on('error', (err: any) => {
            this.log.error(`[MQTT-Server] (${clientId}) client error  ${err}`);
            client.stream.end();
        });
    }

    public async start(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.server.listen(this.port, this.host, () => {
                this.log.info(`MQTT server is running on ${this.host}:${this.port}`);
                resolve();
            });
            this.server.on('error', err => reject(err));
        });
    }

    public async stop(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.server.close((err?: Error) => {
                if (err) {
                    reject(err);
                } else {
                    this.log.info('MQTT server stopped.');
                    resolve();
                }
            });
        });
    }
}

// Example usage:
// (async () => {
//   const mqttServer = new MqttAsyncServer({ port: 1883 });
//   await mqttServer.start();
//   // To stop: await mqttServer.stop();
// })();
