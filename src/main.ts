/*
 * Created with @iobroker/create-adapter v2.6.5
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from '@iobroker/adapter-core';

import type { MqttConnectEvent, MqttMessageEvent } from './lib/mqtt-events';
import { MqttServer } from './lib/mqttServer';
import { HoymilesMqtt } from './lib/hoymilesMqtt';

class HoymilesMs extends utils.Adapter {
    private mqtt: any;
    private hoymilesMqtt: HoymilesMqtt | null = null;

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

        // init hoymileMqtt
        this.hoymilesMqtt = new HoymilesMqtt(this);

        // init mqttServer
        this.mqtt = new MqttServer(this, { port: 1883 });
        this.mqtt.on('connect', this.onMqttConnect.bind(this));
        this.mqtt.on('message', this.onMqttMessage.bind(this));
        //this.mqtt.on('message', this.hoymilesMqtt.onMqttMessage.bind(this.hoymilesMqtt));
        await this.mqtt.start();
        this.log.info('[MQTT-Server] started');
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     *
     * @param callback standard iobroker callback
     */
    private onUnload(callback: () => void): void {
        try {
            // Here you must clear all timeouts or intervals that may still be active
            // clearTimeout(timeout1);
            // clearTimeout(timeout2);
            // ...
            // clearInterval(interval1);

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
    private onMqttConnect(event: MqttConnectEvent): void {
        this.log.info(`[MQTT] client ${event.clientId} connected from ${event.ip}`);
    }

    /**
     * onMqttMessage is called whenever a new message is received
     *
     * @param event message details
     */
    private async onMqttMessage(event: MqttMessageEvent): Promise<void> {
        await this.hoymilesMqtt?.onMqttMessage(event);
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
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new HoymilesMs(options);
} else {
    // otherwise start the instance directly
    (() => new HoymilesMs())();
}
