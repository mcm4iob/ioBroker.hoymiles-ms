import type { Server as NetServer, Socket } from 'node:net';
// eslint-disable-next-line no-duplicate-imports
import net from 'node:net';

import type { MqttClient, Packet } from 'mqtt-connection';
// eslint-disable-next-line no-duplicate-imports
import mqttCon from 'mqtt-connection';

import type { MqttConnectEvent, MqttMessageEvent, MqttSubscribeEvent, MqttEventCallback } from './mqtt-events';

type MqttClient = typeof MqttClient;
type Packet = typeof Packet;

export interface MqttServerOptions {
    port?: number;
    network?: string;
}

export class MqttServer {
    private server: NetServer;
    private port: number;
    private network: string;
    //private adapter: ioBroker.Adapter;
    private log: ioBroker.Log;
    private mqttEventCallback: MqttEventCallback;

    constructor(adapter: ioBroker.Adapter, options: MqttServerOptions = {}, callback: MqttEventCallback) {
        //super();
        this.log = adapter.log;
        this.network = options.network ?? '0.0.0.0';
        this.port = options.port ?? 1883;

        this.log.silly(`[MQTT-Server] init server at ${this.network}:${this.port}`);
        this.server = net.createServer(this.handleConnection.bind(this));

        this.mqttEventCallback = callback;
    }

    private handleConnection(stream: Socket): void {
        const remoteAddress = stream.remoteAddress || 'unknown';
        this.log.silly(`[MQTT-Server] client connect from  ${remoteAddress}`);

        const client: MqttClient = mqttCon(stream);
        // let clientId: any;

        client.on('connect', async (packet: Packet) => {
            this.log.silly(
                `[MQTT-Server] (${client.id}) client connected with id ${packet.clientId} connected from ${remoteAddress}`,
            );

            // Acknowledge connection
            client.connack({ returnCode: 0 });

            // report connection
            await this.mqttEventCallback('connect', {
                clientId: packet.clientId,
                ip: remoteAddress,
                packet,
            } as MqttConnectEvent);
        });

        client.on('publish', async (packet: Packet) => {
            this.log.silly(
                `[MQTT-Server] (${client.id}) received message from client ${packet.clientId} on topic "${packet.topic}": ${packet.payload?.toString()}`,
            );

            if (packet.qos && packet.qos > 0) {
                client.puback({ messageId: packet.messageId });
            }

            // report message
            await this.mqttEventCallback('message', {
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
            packet.subscriptions.forEach(async (sub: any) => {
                this.log.silly(`[MQTT-Server] (${client.id}) client ${packet.clientId} subscribed to "${sub.topic}"`);
                await this.mqttEventCallback('subscribe', {
                    clientId: packet.clientId || '',
                    ip: remoteAddress,
                    topic: sub.topic,
                    qos: packet.qos ?? 0,
                    retain: packet.retain ?? false,
                    packet,
                } as MqttSubscribeEvent);
            });

            // Grant all requested QoS levels
            client.suback({
                granted: packet.subscriptions.map((sub: any) => sub.qos ?? 0),
                messageId: client._lastSubscriptionId || 1,
            });
        });

        client.on('unsubscribe', (unsubscriptions: any[]) => {
            unsubscriptions.forEach(topic => {
                this.log.silly(`[MQTT-Server] (${client.id}) client unsubscribed from "${topic}"`);
            });
            client.unsuback({ messageId: client._lastUnsubscribeId || 1 });
        });

        client.on('pingreq', () => {
            this.log.silly(`[MQTT-Server] (${client.id}) client ping`);
            client.pingresp();
        });

        client.on('disconnect', () => {
            this.log.silly(`[MQTT-Server] (${client.id}) client disconnect from  ${remoteAddress}`);
            client.stream.end();
        });

        client.on('close', () => {
            this.log.silly(`[MQTT-Server] (${client.id}) client ${remoteAddress} closed connection`);
        });

        client.on('error', (err: any) => {
            this.log.error(`[MQTT-Server] (${client.id}) client error  ${err}`);
            client.stream.end();
        });
    }

    public async start(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.server.listen(this.port, this.network, () => {
                this.log.info(`MQTT server is running on ${this.network}:${this.port}`);
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
