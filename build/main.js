"use strict";
/*
 * Created with @iobroker/create-adapter v2.6.5
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoymilesMsAdapter = void 0;
const adapter_core_1 = require("@iobroker/adapter-core");
const mqttServer_1 = require("./lib/mqttServer");
const hoymilesMqtt_1 = require("./lib/hoymilesMqtt");
const states_1 = require("./lib/states");
class HoymilesMsAdapter extends adapter_core_1.Adapter {
    #mqtt;
    #hoymilesMqtt = null;
    #onlineInterval;
    constructor(options = {}) {
        super({
            ...options,
            name: 'hoymiles-ms',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        // this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }
    async onReady() {
        // Reset the connection indicator during startup
        await this.setState('info.connection', false, true);
        await adapter_core_1.I18n.init(`${__dirname}/..`, this);
        // reset existing states
        await (0, states_1.resetStates)(this);
        // init hoymileMqtt
        this.#hoymilesMqtt = new hoymilesMqtt_1.HoymilesMqtt(this);
        // init mqttServer
        this.#mqtt = new mqttServer_1.MqttServer(this, { network: this.config.srvNetwork, port: this.config.srvPort });
        try {
            await this.#mqtt.start();
            this.log.info('[MQTT-Server] started');
        }
        catch (e) {
            this.log.error(`[MQTT-Server] cannot start server - ${e.message}`);
            this.terminate('check adapter configuration', adapter_core_1.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
        }
        this.#onlineInterval = this.setInterval(states_1.checkOnlineStatus.bind(this), 15 * 1000, this);
    }
    onUnload(callback) {
        try {
            this.#onlineInterval && this.clearInterval(this.#onlineInterval);
            this.#hoymilesMqtt && this.#hoymilesMqtt.onUnload();
            callback();
        }
        catch {
            callback();
        }
    }
    async onStateChange(id, state) {
        if (!state || state.ack) {
            return;
        }
        this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
        if (!this.#hoymilesMqtt) {
            this.log.warn(`hoymilesMqtt not initialized, ignoreing state change`);
            return;
        }
        await this.#hoymilesMqtt.onMqttStateChange(id, state);
    }
    async mqttEventCallback(name, event) {
        if (name === 'connect') {
            this.#hoymilesMqtt && (await this.#hoymilesMqtt.onMqttConnect(event));
        }
        else if (name === 'message') {
            this.#hoymilesMqtt && (await this.#hoymilesMqtt.onMqttMessage(event));
        }
        else if (name === 'subscribe') {
            this.#hoymilesMqtt && (await this.#hoymilesMqtt.onMqttSubscribe(event));
        }
        else {
            this.log.warn(`[MQTT] unknown event ${name} received from client ${event.clientId} connected from ${event.ip}`);
        }
    }
    mqttPublish(clientId, publishOptions) {
        this.#mqtt.publish(clientId, publishOptions);
    }
}
exports.HoymilesMsAdapter = HoymilesMsAdapter;
if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options) => new HoymilesMsAdapter(options);
}
else {
    // otherwise start the instance directly
    (() => new HoymilesMsAdapter())();
}
//# sourceMappingURL=main.js.map