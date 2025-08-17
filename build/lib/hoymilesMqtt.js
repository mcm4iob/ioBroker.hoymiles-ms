"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var hoymilesMqtt_exports = {};
__export(hoymilesMqtt_exports, {
  HoymilesMqtt: () => HoymilesMqtt
});
module.exports = __toCommonJS(hoymilesMqtt_exports);
var import_states = require("./states");
class HoymilesMqtt {
  adapter;
  log;
  /**
   * class constructor
   *
   * @param adapter reference to ioBroker aapter class
   */
  constructor(adapter) {
    this.adapter = adapter;
    this.log = adapter.log;
    this.log.debug(`[hoymilesMqtt] initializing`);
  }
  /**
   *
   */
  async onMqttMessage(event) {
    var _a;
    this.log.debug(`[hoymilesMqtt] process message ${event.topic}: ${event.payload.toString()}`);
    if (!event.topic) {
      this.log.debug(`[hoymilesMqtt] ignoring empty topic`);
      return;
    }
    const topicDetails = event.topic.split("/");
    if (topicDetails.length < 2) {
      this.log.debug(`[hoymilesMqtt] ignoring invalid topic ${event.topic}`);
      return;
    }
    const deviceId = topicDetails[2];
    topicDetails[2] = "<dev_id>";
    const topic = topicDetails.join("/");
    await (0, import_states.initStates)(this.adapter, deviceId);
    await (0, import_states.handleOnlineStatus)(this.adapter, deviceId);
    for (const stateKey in import_states.stateConfig) {
      if (!import_states.stateConfig[stateKey].mqtt || import_states.stateConfig[stateKey].mqtt.mqtt_publish !== topic) {
        continue;
      }
      const state = import_states.stateConfig[stateKey];
      const stateId = `${(0, import_states.filterDevId)(deviceId)}.${stateKey}`;
      const mqtt_publish_func = (_a = state.mqtt) == null ? void 0 : _a.mqtt_publish_funct;
      let value = mqtt_publish_func(event.payload);
      if (state.common.type === "boolean" && value === "false") {
        value = false;
      }
      if (state.common.type === "boolean" && value === "true") {
        value = true;
      }
      if (state.common.type === "number" && value !== void 0) {
        value = Number(value);
      }
      if (value !== void 0) {
        this.log.debug(`[hoymilesMqtt] updateing state ${stateId} from ${event.topic} using value ${value}`);
        await (0, import_states.initState)(this.adapter, stateId);
        await this.adapter.setState(stateId, value, true);
      } else {
        this.log.debug(
          `[hoymilesMqtt] updateing state ${stateId} from ${event.topic} failed, value is undefined`
        );
      }
    }
  }
  async onMqttSubscribe(event) {
    this.log.debug(`[hoymilesMqtt] process subscription ${event.topic}`);
    if (!event.topic) {
      this.log.debug(`[hoymilesMqtt] ignoring empty topic`);
      return;
    }
    const topicDetails = event.topic.split("/");
    if (topicDetails.length < 2) {
      this.log.debug(`[hoymilesMqtt] ignoring invalid topic ${event.topic}`);
      return;
    }
    const deviceId = topicDetails[2];
    topicDetails[2] = "<dev_id>";
    const topic = topicDetails.join("/");
    await (0, import_states.initStates)(this.adapter, deviceId);
    await (0, import_states.handleOnlineStatus)(this.adapter, deviceId);
    const stateKey = event.topic.split("/").slice(3).join(".");
    if (!import_states.stateConfig[stateKey]) {
      this.adapter.log.warn(
        `[hoymilesMqtt] ignoring subscription to unknown key ${stateKey} / topic ${event.topic}`
      );
      return;
    }
    this.adapter.log.info(`[hoymilesMqtt] device ${deviceId} subscribing to topic ${event.topic}`);
    const stateId = `${(0, import_states.filterDevId)(deviceId)}.${stateKey}`;
    await (0, import_states.initState)(this.adapter, stateId);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HoymilesMqtt
});
//# sourceMappingURL=hoymilesMqtt.js.map
