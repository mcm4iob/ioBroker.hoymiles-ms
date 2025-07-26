"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mqttServer_exports = {};
__export(mqttServer_exports, {
  MqttServer: () => MqttServer
});
module.exports = __toCommonJS(mqttServer_exports);
var import_node_net = __toESM(require("node:net"));
var import_mqtt_connection = __toESM(require("mqtt-connection"));
class MqttServer {
  server;
  port;
  network;
  //private adapter: ioBroker.Adapter;
  log;
  mqttEventCallback;
  constructor(adapter, options = {}, callback) {
    var _a, _b;
    this.log = adapter.log;
    this.network = (_a = options.network) != null ? _a : "0.0.0.0";
    this.port = (_b = options.port) != null ? _b : 1883;
    this.log.silly(`[MQTT-Server] init server at ${this.network}:${this.port}`);
    this.server = import_node_net.default.createServer(this.handleConnection.bind(this));
    this.mqttEventCallback = callback;
  }
  handleConnection(stream) {
    const remoteAddress = stream.remoteAddress || "unknown";
    this.log.silly(`[MQTT-Server] client connect from  ${remoteAddress}`);
    const client = (0, import_mqtt_connection.default)(stream);
    let clientId;
    client.on("connect", async (packet) => {
      clientId = packet.clientId;
      this.log.silly(
        `[MQTT-Server] (${clientId}) client connected with id ${packet.clientId} connected from ${remoteAddress}`
      );
      client.connack({ returnCode: 0 });
      await this.mqttEventCallback("connect", {
        clientId: packet.clientId,
        ip: remoteAddress,
        packet
      });
    });
    client.on("publish", async (packet) => {
      var _a, _b, _c;
      this.log.silly(
        `[MQTT-Server] (${clientId}) received message on topic "${packet.topic}": ${(_a = packet.payload) == null ? void 0 : _a.toString()}`
      );
      if (packet.qos && packet.qos > 0) {
        client.puback({ messageId: packet.messageId });
      }
      await this.mqttEventCallback("message", {
        clientId: client.id || "",
        ip: remoteAddress,
        topic: packet.topic,
        payload: packet.payload,
        qos: (_b = packet.qos) != null ? _b : 0,
        retain: (_c = packet.retain) != null ? _c : false,
        packet
      });
    });
    client.on("subscribe", (packet) => {
      packet.subscriptions.forEach((sub) => {
        this.log.silly(`[MQTT-Server] (${clientId}) client ${packet.clientId} subscribed to "${sub.topic}"`);
      });
      client.suback({
        granted: packet.subscriptions.map((sub) => {
          var _a;
          return (_a = sub.qos) != null ? _a : 0;
        }),
        messageId: client._lastSubscriptionId || 1
      });
    });
    client.on("unsubscribe", (unsubscriptions) => {
      unsubscriptions.forEach((topic) => {
        this.log.silly(`[MQTT-Server] (${clientId}) client unsubscribed from "${topic}"`);
      });
      client.unsuback({ messageId: client._lastUnsubscribeId || 1 });
    });
    client.on("pingreq", () => {
      this.log.silly(`[MQTT-Server] (${clientId}) client ping`);
      client.pingresp();
    });
    client.on("disconnect", () => {
      this.log.silly(`[MQTT-Server] (${clientId}) client disconnect from  ${remoteAddress}`);
      client.stream.end();
    });
    client.on("close", () => {
      this.log.silly(`[MQTT-Server] (${clientId}) client ${remoteAddress} closed connection`);
    });
    client.on("error", (err) => {
      this.log.error(`[MQTT-Server] (${clientId}) client error  ${err}`);
      client.stream.end();
    });
  }
  async start() {
    await new Promise((resolve, reject) => {
      this.server.listen(this.port, this.network, () => {
        this.log.info(`MQTT server is running on ${this.network}:${this.port}`);
        resolve();
      });
      this.server.on("error", (err) => reject(err));
    });
  }
  async stop() {
    await new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
        } else {
          this.log.info("MQTT server stopped.");
          resolve();
        }
      });
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MqttServer
});
//# sourceMappingURL=mqttServer.js.map
