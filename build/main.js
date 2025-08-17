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
var import_states = require("./lib/states");
class HoymilesMs extends utils.Adapter {
  mqtt;
  hoymilesMqtt = null;
  onlineInterval;
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
    await (0, import_states.resetStates)(this);
    this.hoymilesMqtt = new import_hoymilesMqtt.HoymilesMqtt(this);
    this.mqtt = new import_mqttServer.MqttServer(
      this,
      { network: this.config.srvNetwork, port: this.config.srvPort },
      this.mqttEventCallback.bind(this)
    );
    try {
      await this.mqtt.start();
      this.log.info("[MQTT-Server] started");
    } catch (e) {
      this.log.error(`[MQTT-Server] cannot start server - ${e.message}`);
      this.terminate("check adapter configuration", utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
    }
    this.onlineInterval = this.setInterval(import_states.checkOnlineStatus.bind(this), 15 * 1e3, this);
  }
  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   *
   * @param callback standard iobroker callback
   */
  onUnload(callback) {
    try {
      this.onlineInterval && this.clearInterval(this.onlineInterval);
      callback();
    } catch {
      callback();
    }
  }
  async mqttEventCallback(name, event) {
    var _a;
    if (name === "connect") {
      this.log.info(`[MQTT] client ${event.clientId} connected from ${event.ip}`);
    } else if (name === "message") {
      await ((_a = this.hoymilesMqtt) == null ? void 0 : _a.onMqttMessage(event));
    }
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
}
if (require.main !== module) {
  module.exports = (options) => new HoymilesMs(options);
} else {
  (() => new HoymilesMs())();
}
//# sourceMappingURL=main.js.map
