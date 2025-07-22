import { stateConfig, initStates, filterDevId } from './states';

import type { /*MqttConnectEvent,*/ MqttMessageEvent } from './mqtt-events';

/**
 * HoymilesMqtt - class to handle hoymiles mqtt topics within ioBroker
 *
 */
export class HoymilesMqtt {
    private adapter: ioBroker.Adapter;
    private log: ioBroker.Log;

    /**
     * class constructor
     *
     * @param adapter reference to ioBroker aapter class
     */
    constructor(adapter: ioBroker.Adapter) {
        this.adapter = adapter;
        this.log = adapter.log;
        this.log.debug(`[hoymilesMqtt] initializing`);
    }

    public async onMqttMessage(event: MqttMessageEvent): Promise<void> {
        this.log.debug(`[hoymilesMqtt] process message ${event.topic}: ${event.payload.toString()}`);

        if (!event.topic) {
            this.log.debug(`[hoymilesMqtt] ignoring empty topic`);
            return;
        }

        const topicDetails = event.topic.split('/');
        if (topicDetails.length < 2) {
            this.log.debug(`[hoymilesMqtt] ignoring invalid topic ${event.topic}`);
            return;
        }
        const deviceId = topicDetails[2];
        topicDetails[2] = '<dev_id>';
        const topic = topicDetails.join('/');

        await initStates(this.adapter, deviceId);

        for (const stateKey in stateConfig) {
            if (stateConfig[stateKey].mqtt.mqtt_publish !== topic) {
                continue;
            }

            this.log.debug(`[hoymilesMqtt] updateing state ${stateKey} from ${event.topic}`);
            const state = stateConfig[stateKey];

            const stateId = `${filterDevId(deviceId)}.${stateKey}`;
            const mqtt_publish_func = state.mqtt.mqtt_publish_funct;
            let value = mqtt_publish_func(event.payload);
            if (state.common.type === 'boolean' && value === 'false') {
                value = false;
            }
            if (state.common.type === 'boolean' && value === 'true') {
                value = true;
            }
            if (state.common.type === 'number' && value !== undefined) {
                value = Number(value);
            }

            if (value !== undefined) {
                this.log.debug(`[hoymilesMqtt] updateing state ${stateId} using value ${value}`);
                await this.adapter.setState(stateId, value, true);
            } else {
                this.log.warn(`[hoymilesMqtt] updateing state ${stateId} failed, value is undefined`);
            }
        }
    }
}
