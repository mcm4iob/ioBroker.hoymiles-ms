export interface MqttConnectEvent {
    clientId: string;
    ip: string;
    packet: Packet;
}

export interface MqttMessageEvent {
    clientId: string;
    ip: string;
    topic: string;
    payload: Buffer;
    qos: number;
    retain: boolean;
    packet: Packet;
}

export type MqttEvent = MqttConnectEvent | MqttMessageEvent;
export type MqttEventCallback = (name: string, event: MqttEvent) => Promise<void>;
