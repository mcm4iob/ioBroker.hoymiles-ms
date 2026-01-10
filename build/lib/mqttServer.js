"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttServer = void 0;
const node_net_1 = require("node:net");
const mqtt_connection_1 = __importDefault(require("mqtt-connection"));
/**
 * MqttServer
 *
 * class to hold one mqtt server instance
 *
 * api reference: https://www.npmjs.com/package/mqtt-connection#api
 */
class MqttServer {
    #adapter;
    #log;
    #server;
    #port;
    #network;
    #mqttClients = {};
    constructor(adapter, options = {}) {
        this.#adapter = adapter;
        this.#log = adapter.log;
        this.#network = options.network ?? '0.0.0.0';
        this.#port = options.port ?? 1883;
        this.#log.debug(`[MQTT-Server] init server at ${this.#network}:${this.#port}`);
        this.#server = (0, node_net_1.createServer)(this.handleConnection.bind(this));
    }
    handleConnection(stream) {
        const remoteAddress = stream.remoteAddress || 'unknown';
        this.#log.debug(`[MQTT-Server] client connection from  ${remoteAddress}`);
        const client = (0, mqtt_connection_1.default)(stream);
        client.on('connect', async (packet) => {
            client.id = packet.clientId;
            client.ip = remoteAddress;
            this.#log.debug(`[MQTT-Server] (${client.id}) client connected with id ${packet.clientId} connected from ${remoteAddress}`);
            if (this.#mqttClients[client.id]?.mqttClient) {
                const oldMqttClient = this.#mqttClients[client.id].mqttClient;
                this.#log.debug(`[MQTT-Server] (${client.id}) client reconnected from ${remoteAddress}, dropping old connection to ${oldMqttClient.ip}`);
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
            });
        });
        client.on('publish', async (packet) => {
            this.#log.debug(`[MQTT-Server] (${client.id}) received message from client on topic "${packet.topic}": ${packet.payload?.toString()}`);
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
            });
        });
        client.on('subscribe', (packet) => {
            this.#log.debug(`[MQTT-Server] (${client.id}) client subscribing to "${JSON.stringify(packet.subscriptions)}"`);
            // packet.subscriptions.forEach(async (sub: any) => {
            //     this.#log.debug(`[MQTT-Server] (${client.id}) client subscribing to "${sub.topic}"`);
            //     await this.#adapter.mqttEventCallback('subscribe', {
            //         clientId: client.id,
            //         ip: remoteAddress,
            //         topic: sub.topic,
            //         qos: packet.qos ?? 0,
            //         retain: packet.retain ?? false,
            //         packet,
            //     } as MqttSubscribeEvent);
            // });
            // Grant all requested QoS levels
            // client.suback({
            //     granted: packet.subscriptions.map((sub: any) => sub.qos ?? 0),
            //     messageId: client._lastSubscriptionId || 1,
            // });
            this.#log.debug(`[MQTT-Server] (${client.id}) client sending suback id:${packet.messageId}, qos:${packet.qos}"`);
            client.suback({
                granted: [packet.qos],
                messageId: packet.messageId,
            });
            // process subscriptions
            packet.subscriptions.forEach(async (sub) => {
                this.#log.debug(`[MQTT-Server] (${client.id}) client processing subscription to "${sub.topic}"`);
                await this.#adapter.mqttEventCallback('subscribe', {
                    clientId: client.id,
                    ip: remoteAddress,
                    topic: sub.topic,
                    qos: packet.qos ?? 0,
                    retain: packet.retain ?? false,
                    packet,
                });
            });
        });
        client.on('unsubscribe', (unsubscriptions) => {
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
        client.on('error', (err) => {
            this.#log.error(`[MQTT-Server] (${client.id}) client error ${err}`);
            client.stream.end();
        });
    }
    publish(clientId, publishOptions) {
        this.#log.debug(`[MQTT-Server] (${clientId}) client publish performed on topic ${publishOptions.topic}.`);
        const client = this.#mqttClients[clientId]?.mqttClient;
        if (!client) {
            this.#log.warn(`[MQTT-Server] (${clientId}) unknown or disconnected client, ignoring publich request`);
            return;
        }
        client.publish(publishOptions);
    }
    async start() {
        await new Promise((resolve, reject) => {
            this.#server.listen(this.#port, this.#network, () => {
                this.#log.info(`MQTT server is running on ${this.#network}:${this.#port}`);
                resolve();
            });
            this.#server.on('error', err => reject(err));
        });
    }
    async stop() {
        await new Promise((resolve, reject) => {
            this.#server.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.#log.info('MQTT server stopped.');
                    resolve();
                }
            });
        });
    }
}
exports.MqttServer = MqttServer;
//# sourceMappingURL=mqttServer.js.map