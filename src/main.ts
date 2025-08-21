/*
 * Created with @iobroker/create-adapter v2.6.5
 */

import { Adapter, type AdapterOptions, I18n, EXIT_CODES } from '@iobroker/adapter-core';

import { type MqttMessageEvent, type MqttEvent } from './lib/mqtt-event-types';
import { type MqttPublishOptions } from './lib/mqtt-connection-types';
import { MqttServer } from './lib/mqttServer';
import { HoymilesMqtt } from './lib/hoymilesMqtt';
import { checkOnlineStatus, resetStates } from './lib/states';

export class HoymilesMsAdapter extends Adapter {
    #mqtt: any;
    #hoymilesMqtt: HoymilesMqtt | null = null;
    #onlineInterval: ioBroker.Interval | undefined;

    public constructor(options: Partial</*utils.*/ AdapterOptions> = {}) {
        super({
            ...options,
            name: 'hoymiles-ms',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        // this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    private async onReady(): Promise<void> {
        // Reset the connection indicator during startup
        await this.setState('info.connection', false, true);

        await I18n.init(`${__dirname}/..`, this);

        // reset existing states
        await resetStates(this);

        // init hoymileMqtt
        this.#hoymilesMqtt = new HoymilesMqtt(this);

        // init mqttServer
        this.#mqtt = new MqttServer(this, { network: this.config.srvNetwork, port: this.config.srvPort });
        try {
            await this.#mqtt.start();
            this.log.info('[MQTT-Server] started');
        } catch (e: any) {
            this.log.error(`[MQTT-Server] cannot start server - ${e.message}`);
            this.terminate('check adapter configuration', EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
        }

        this.#onlineInterval = this.setInterval(checkOnlineStatus.bind(this), 15 * 1000, this);
    }

    private onUnload(callback: () => void): void {
        try {
            this.#onlineInterval && this.clearInterval(this.#onlineInterval);
            callback();
        } catch {
            callback();
        }
    }

    private async onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void> {
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

    public async mqttEventCallback(name: string, event: MqttEvent): Promise<void> {
        if (name === 'connect') {
            this.log.info(`[MQTT] client ${event.clientId} connected from ${event.ip}`);
        } else if (name === 'message') {
            this.#hoymilesMqtt && (await this.#hoymilesMqtt.onMqttMessage(event as MqttMessageEvent));
        } else if (name === 'subscribe') {
            this.#hoymilesMqtt && (await this.#hoymilesMqtt.onMqttSubscribe(event as MqttMessageEvent));
        } else {
            this.log.warn(
                `[MQTT] unknown event ${name} received from client ${event.clientId} connected from ${event.ip}`,
            );
        }
    }

    public mqttPublish(clientId: string, publishOptions: MqttPublishOptions): void /*Promise<void>*/ {
        this.#mqtt.publish(clientId, publishOptions);
    }
}

if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial</*utils.*/ AdapterOptions> | undefined) => new HoymilesMsAdapter(options);
} else {
    // otherwise start the instance directly
    (() => new HoymilesMsAdapter())();
}
