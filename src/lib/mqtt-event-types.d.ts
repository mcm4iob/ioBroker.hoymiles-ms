export type MqttConnectEvent = {
    clientId: string;
    ip: string;
    packet: Packet;
};

export type MqttMessageEvent = {
    clientId: string;
    ip: string;
    topic: string;
    payload: Buffer;
    qos: number;
    retain: boolean;
    packet: Packet;
};

export type MqttSubscribeEvent = {
    clientId: string;
    ip: string;
    topic: string;
    qos: number;
    retain: boolean;
    packet: Packet;
};

export type MqttEvent = MqttConnectEvent | MqttMessageEvent | MqttSubscribeEvent;
