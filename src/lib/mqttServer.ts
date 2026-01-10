import { type Server as NetServer, type Socket, createServer as netCreateServer } from 'node:net';

import { type MqttPublishOptions } from './mqtt-connection-types';
import { type MqttClient, type Packet, default as mqttCon } from 'mqtt-connection';

type MqttClient = typeof MqttClient;
type Packet = typeof Packet;

import { type HoymilesMsAdapter } from '../main';
import type { MqttConnectEvent, MqttMessageEvent, MqttSubscribeEvent } from './mqtt-event-types';

export type MqttServerOptions = {
    port?: number;
    network?: string;
};

type MqttClients = {
    [key: string]: {
        mqttClient: MqttClient;
        ip: string;
    };
};

/**
 * MqttServer
 *
 * class to hold one mqtt server instance
 */
export class MqttServer {
    #adapter: HoymilesMsAdapter;
    #log: ioBroker.Log;
    #server: NetServer;
    #port: number;
    #network: string;
    #mqttClients: MqttClients = {};

    constructor(adapter: HoymilesMsAdapter, options: MqttServerOptions = {}) {
        this.#adapter = adapter;
        this.#log = adapter.log;
        this.#network = options.network ?? '0.0.0.0';
        this.#port = options.port ?? 1883;

        this.#log.debug(`[MQTT-Server] init server at ${this.#network}:${this.#port}`);
        this.#server = netCreateServer(this.handleConnection.bind(this));
    }

    private handleConnection(stream: Socket): void {
        const remoteAddress = stream.remoteAddress || 'unknown';
        this.#log.debug(`[MQTT-Server] client connection from  ${remoteAddress}`);

        const client: MqttClient = mqttCon(stream);

        client.on('connect', async (packet: Packet) => {
            client.id = packet.clientId;
            client.ip = remoteAddress;
            this.#log.debug(
                `[MQTT-Server] (${client.id}) client connected with id ${packet.clientId} connected from ${remoteAddress}`,
            );

            if (this.#mqttClients[client.id]?.mqttClient) {
                const oldMqttClient = this.#mqttClients[client.id].mqttClient;
                this.#log.debug(
                    `[MQTT-Server] (${client.id}) client reconnected from ${remoteAddress}, dropping old connection to ${oldMqttClient.ip}`,
                );
                oldMqttClient.disconnect();
                this.#mqttClients[client.id].mqttClient = null;
            }

            // register new client
            this.#mqttClients[client.id] = { mqttClient: client, ip: remoteAddress };

            // Acknowledge connection
            client.connack({ returnCode: 0 });

            // report connection
            await this.#adapter.mqttEventCallback('connect', {
                clientId: client.id,
                ip: remoteAddress,
                packet,
            } as MqttConnectEvent);
        });

        client.on('publish', async (packet: Packet) => {
            this.#log.debug(
                `[MQTT-Server] (${client.id}) received message from client on topic "${packet.topic}": ${packet.payload?.toString()}`,
            );

            if (packet.qos && packet.qos > 0) {
                client.puback({ messageId: packet.messageId });
            }

            // report message
            await this.#adapter.mqttEventCallback('message', {
                clientId: client.id,
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
                this.#log.debug(`[MQTT-Server] (${client.id}) client subscribing to "${sub.topic}"`);
                await this.#adapter.mqttEventCallback('subscribe', {
                    clientId: client.id,
                    ip: remoteAddress,
                    topic: sub.topic,
                    qos: packet.qos ?? 0,
                    retain: packet.retain ?? false,
                    packet,
                } as MqttSubscribeEvent);
            });

            // Grant all requested QoS levels
            // client.suback({
            //     granted: packet.subscriptions.map((sub: any) => sub.qos ?? 0),
            //     messageId: client._lastSubscriptionId || 1,
            // });
            this.#log.debug(
                `[MQTT-Server] (${client.id}) client sending suback id:${packet.messageId}, qos:${packet.qos}"`,
            );
            client.suback({
                granted: [packet.qos],
                messageId: packet.messageId,
            });
        });

        client.on('unsubscribe', (unsubscriptions: any[]) => {
            unsubscriptions.forEach(topic => {
                this.#log.debug(`[MQTT-Server] (${client.id}) client unsubscribed from "${topic}"`);
            });
            client.unsuback({ messageId: client._lastUnsubscribeId || 1 });
        });

        client.on('pingreq', () => {
            this.#log.debug(`[MQTT-Server] (${client.id}) client ping`);
            client.pingresp();
        });

        client.on('disconnect', () => {
            this.#log.debug(`[MQTT-Server] (${client.id}) client disconnect from  ${client.ip}`);
            client.stream.end();
        });

        client.on('close', () => {
            this.#log.debug(`[MQTT-Server] (${client.id}) client ${client.ip} closed connection`);
        });

        client.on('error', (err: any) => {
            this.#log.error(`[MQTT-Server] (${client.id}) client error ${err}`);
            client.stream.end();
        });
    }

    public publish(clientId: string, publishOptions: MqttPublishOptions): void /*Promise<void>*/ {
        this.#log.debug(`[MQTT-Server] (${clientId}) client publish performed on topic ${publishOptions.topic}.`);

        const client = this.#mqttClients[clientId]?.mqttClient;
        if (!client) {
            this.#log.warn(`[MQTT-Server] (${clientId}) unknown or disconnected client, ignoring publich request`);
            return;
        }

        client.publish(publishOptions);
    }

    public async start(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.#server.listen(this.#port, this.#network, () => {
                this.#log.info(`MQTT server is running on ${this.#network}:${this.#port}`);
                resolve();
            });
            this.#server.on('error', err => reject(err));
        });
    }

    public async stop(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.#server.close((err?: Error) => {
                if (err) {
                    reject(err);
                } else {
                    this.#log.info('MQTT server stopped.');
                    resolve();
                }
            });
        });
    }
}
