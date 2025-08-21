import { stateConfig, initState, initStates, filterDevId, handleOnlineStatus } from './states';
import type { HoymilesMsAdapter } from '../main';
import type { MqttMessageEvent, MqttSubscribeEvent } from './mqtt-event-types';

/**
 * HoymilesMqtt - class to handle hoymiles mqtt topics within ioBroker
 *
 */
export class HoymilesMqtt {
    private adapter: HoymilesMsAdapter; /*ioBroker.Adapter;*/
    private log: ioBroker.Log;

    constructor(adapter: HoymilesMsAdapter /* ioBroker.Adapter */) {
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

        await initStates(this.adapter, deviceId, { clientId: event.clientId });
        await handleOnlineStatus(this.adapter, deviceId);

        for (const stateKey in stateConfig) {
            if (!stateConfig[stateKey].mqtt || stateConfig[stateKey].mqtt.mqtt_publish !== topic) {
                continue;
            }

            const state = stateConfig[stateKey];

            const stateId = `${filterDevId(deviceId)}.${stateKey}`;
            const mqtt_publish_func = state.mqtt?.mqtt_publish_funct;
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
                this.log.debug(`[hoymilesMqtt] updateing state ${stateId} from ${event.topic} using value ${value}`);
                await initState(this.adapter, stateId, { clientId: event.clientId });
                await this.adapter.setState(stateId, value, true);
            } else {
                this.log.debug(
                    `[hoymilesMqtt] updateing state ${stateId} from ${event.topic} failed, value is undefined`,
                );
            }
        }
    }

    public async onMqttSubscribe(event: MqttSubscribeEvent): Promise<void> {
        this.log.debug(`[hoymilesMqtt] process subscription ${event.topic}`);

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
        //topicDetails[2] = '<dev_id>';
        //const topic = topicDetails.join('/');

        await initStates(this.adapter, deviceId, { clientId: event.clientId });
        await handleOnlineStatus(this.adapter, deviceId);

        const stateKey = event.topic.split('/').slice(3).join('.');
        if (!stateConfig[stateKey]) {
            this.adapter.log.warn(
                `[hoymilesMqtt] ignoring subscription to unknown key ${stateKey} / topic ${event.topic}`,
            );
            return;
        }
        this.adapter.log.info(`[hoymilesMqtt] device ${deviceId} subscribing to topic ${event.topic}`);
        const stateId = `${filterDevId(deviceId)}.${stateKey}`;
        await initState(this.adapter, stateId, { clientId: event.clientId, topic: event.topic });
        await this.adapter.subscribeStatesAsync(stateId);
    }

    public async onMqttStateChange(id: string, state: ioBroker.State): Promise<void> {
        const deviceId = id.split('.')[2];
        const val = state.val;
        const stateObject = await this.adapter.getObjectAsync(id);
        const clientId = stateObject?.native?.clientId;
        const topic = stateObject?.native?.topic;

        if (!clientId) {
            this.adapter.log.debug(`[hoymilesMqtt] state ${id} has no clientId set, ignoring change`);
            return;
        }

        if (!topic) {
            this.adapter.log.debug(`[hoymilesMqtt] state ${id} has no registered topic, ignoring change`);
            return;
        }

        this.adapter.log.debug(
            `[hoymilesMqtt] device ${deviceId} changed value (${val}) at ${id} will be published at ${topic}`,
        );

        const payload = val?.toString() || '';
        this.adapter.mqttPublish(clientId, { topic: topic, payload: payload, qos: 0, retain: false });
    }
}
