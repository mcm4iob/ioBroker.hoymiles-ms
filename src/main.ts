/*
 * Created with @iobroker/create-adapter v2.6.5
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from '@iobroker/adapter-core';

import type { MqttMessageEvent, MqttEvent } from './lib/mqtt-events';
import { MqttServer } from './lib/mqttServer';
import { HoymilesMqtt } from './lib/hoymilesMqtt';
import { checkOnlineStatus, resetStates } from './lib/states';

class HoymilesMs extends utils.Adapter {
    private mqtt: any;
    private hoymilesMqtt: HoymilesMqtt | null = null;
    private onlineInterval: ioBroker.Interval | undefined;

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'hoymiles-ms',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        // this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
        // Reset the connection indicator during startup
        await this.setState('info.connection', false, true);

        await utils.I18n.init(`${__dirname}/..`, this);

        // reset existing states
        await resetStates(this);

        // init hoymileMqtt
        this.hoymilesMqtt = new HoymilesMqtt(this);

        // init mqttServer
        this.mqtt = new MqttServer(
            this,
            { network: this.config.srvNetwork, port: this.config.srvPort },
            this.mqttEventCallback.bind(this),
        );

        try {
            await this.mqtt.start();
            this.log.info('[MQTT-Server] started');
        } catch (e: any) {
            this.log.error(`[MQTT-Server] cannot start server - ${e.message}`);
            this.terminate('check adapter configuration', utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
        }

        this.onlineInterval = this.setInterval(checkOnlineStatus.bind(this), 15 * 1000, this);
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     *
     * @param callback standard iobroker callback
     */
    private onUnload(callback: () => void): void {
        try {
            this.onlineInterval && this.clearInterval(this.onlineInterval);

            callback();
        } catch {
            callback();
        }
    }

    private async mqttEventCallback(name: string, event: MqttEvent): Promise<void> {
        if (name === 'connect') {
            this.log.info(`[MQTT] client ${event.clientId} connected from ${event.ip}`);
        } else if (name === 'message') {
            await this.hoymilesMqtt?.onMqttMessage(event as MqttMessageEvent);
        }
    }

    /**
     * onStateChange is called if a subscribed state changes
     *
     * @param id id of state
     * @param state state details
     */
    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (state) {
            // The state was changed
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
        } else {
            // The state was deleted
            this.log.info(`state ${id} deleted`);
        }
    }
}

if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new HoymilesMs(options);
} else {
    // otherwise start the instance directly
    (() => new HoymilesMs())();
}
