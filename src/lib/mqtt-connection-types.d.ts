// see https://github.com/mqttjs/mqtt-connection#connectionpublishoptions-callback
export type MqttPublishOptions = {
    topic: string; // topic to publish to
    payload: string | Buffer; // payload to publish, defaults to an empty buffer. string or buffer
    qos: number; // quality of service level to publish on
    messageId?: number; // message ID of the packet, required if qos > 0.
    retain: boolean; // retain flag

    /**
     * properties: object
     *  payloadFormatIndicator: Payload is UTF-8 Encoded Character Data or not boolean,
     *  messageExpiryInterval: the lifetime of the Application Message in seconds number,
     *  topicAlias: value that is used to identify the Topic instead of using the Topic Name number,
     *  responseTopic: String which is used as the Topic Name for a response message string,
     *  correlationData: used by the sender of the Request Message to identify which request the Response Message is for when it is received binary,
     *  userProperties: The User Property is allowed to appear multiple times to represent multiple name, value pairs object,
     *  subscriptionIdentifier: representing the identifier of the subscription number,
     *  contentType: String describing the content of the Application Message string
     */
    properties?: object;
};
