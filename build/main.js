"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var utils = __toESM(require("@iobroker/adapter-core"));
var import_mqttServer = require("./lib/mqttServer");
var import_hoymilesMqtt = require("./lib/hoymilesMqtt");
class HoymilesMs extends utils.Adapter {
  mqtt;
  hoymilesMqtt = null;
  constructor(options = {}) {
    super({
      ...options,
      name: "hoymiles-ms"
    });
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
  }
  /**
   * Is called when databases are connected and adapter received configuration.
   */
  async onReady() {
    await this.setState("info.connection", false, true);
    await utils.I18n.init(`${__dirname}/..`, this);
    this.hoymilesMqtt = new import_hoymilesMqtt.HoymilesMqtt(this);
    this.mqtt = new import_mqttServer.MqttServer(this, { port: 1883 });
    this.mqtt.on("connect", this.onMqttConnect.bind(this));
    this.mqtt.on("message", this.onMqttMessage.bind(this));
    await this.mqtt.start();
    this.log.info("[MQTT-Server] started");
  }
  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   *
   * @param callback standard iobroker callback
   */
  onUnload(callback) {
    try {
      callback();
    } catch {
      callback();
    }
  }
  /**
   * onMqttConnect is called whenever a client connects
   *
   * @param event connection details
   */
  onMqttConnect(event) {
    this.log.info(`[MQTT] client ${event.clientId} connected from ${event.ip}`);
  }
  /**
   * onMqttMessage is called whenever a new message is received
   *
   * @param event message details
   */
  async onMqttMessage(event) {
    var _a;
    await ((_a = this.hoymilesMqtt) == null ? void 0 : _a.onMqttMessage(event));
  }
  /**
   * onStateChange is called if a subscribed state changes
   *
   * @param id id of state
   * @param state state details
   */
  onStateChange(id, state) {
    if (state) {
      this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
    } else {
      this.log.info(`state ${id} deleted`);
    }
  }
  // If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
  // /**
  //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
  //  * Using this method requires "common.messagebox" property to be set to true in io-package.json
  //  */
  // private onMessage(obj: ioBroker.Message): void {
  //     if (typeof obj === 'object' && obj.message) {
  //         if (obj.command === 'send') {
  //             // e.g. send email or pushover or whatever
  //             this.log.info('send command');
  //             // Send response in callback if required
  //             if (obj.callback) this.sendTo(obj.from, obj.command, 'Message received', obj.callback);
  //         }
  //     }
  // }
}
if (require.main !== module) {
  module.exports = (options) => new HoymilesMs(options);
} else {
  (() => new HoymilesMs())();
}
//# sourceMappingURL=main.js.map
