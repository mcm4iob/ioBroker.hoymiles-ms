type ChannelConfig = {
    [key: string]: {
        common: ioBroker.ObjectCommon;
    };
};

type FolderConfig = {
    [key: string]: {
        common: ioBroker.ObjectCommon;
    };
};

type StateConfig = {
    [key: string]: {
        mqtt: {
            mqtt_publish: string;
            mqtt_publish_funct: any;
        };
        common: ioBroker.StateCommon;
    };
};

const channelConfig: ChannelConfig = {
    device: {
        common: {
            name: {
                en: 'Device',
                de: 'Gerät',
                ru: 'Устройство',
                pt: 'Dispositivo',
                nl: 'Apparaat',
                fr: 'Appareil',
                it: 'Dispositivo',
                es: 'Dispositivo',
                pl: 'Urządzenie',
                uk: 'Пристрій',
                'zh-cn': '设备',
            },
        },
    },
    power_ctrl: {
        common: {
            name: {
                en: 'Power-control',
                de: 'Leistungsregelung',
                ru: 'Управление мощностью',
                pt: 'Controle de potência',
                nl: 'Vermogensregeling',
                fr: 'Contrôle de puissance',
                it: 'Controllo di potenza',
                es: 'Control de potencia',
                pl: 'Kontrola mocy',
                uk: 'Контроль живлення',
                'zh-cn': '功率控制',
            },
        },
    },
    quick: {
        common: {
            name: {
                en: 'Fast Updated Data ',
                de: 'Schnell aktualisierte Daten',
                ru: 'Быстрое обновление данных',
                pt: 'Dados atualizados rapidamente',
                nl: 'Snel bijgewerkte gegevens',
                fr: 'Données mises à jour rapidement',
                it: 'Dati aggiornati rapidamente',
                es: 'Datos actualizados rápidamente',
                pl: 'Szybko aktualizowane dane',
                uk: 'Швидко оновлювані дані',
                'zh-cn': '快速更新数据',
            },
        },
    },
};

const folderConfig: FolderConfig = {
    info: {
        common: {
            name: {
                en: 'Status Information',
                de: 'Statusinformationen',
                ru: 'Информация о статусе',
                pt: 'Informações de status',
                nl: 'Statusinformatie',
                fr: 'Informations sur le statut',
                it: 'Informazioni sullo stato',
                es: 'Información de estado',
                pl: 'Informacje o statusie',
                uk: 'Інформація про статус',
                'zh-cn': '状态信息',
            },
        },
    },
};

export const stateConfig: StateConfig = {
    'device.identifiers': {
        mqtt: {
            mqtt_publish: `homeassistant/switch/<dev_id>/config`,
            mqtt_publish_funct: (value: string): any => JSON.stringify(JSON.parse(value).device?.identifiers),
        },
        common: {
            name: {
                en: 'Device Identifiers',
                de: 'Gerätekennungen',
                ru: 'Идентификаторы устройств',
                pt: 'Identificadores de dispositivos',
                nl: "Apparaat-ID's",
                fr: 'Identifiants de périphérique',
                it: 'Identificatori del dispositivo',
                es: 'Identificadores de dispositivos',
                pl: 'Identyfikatory urządzeń',
                uk: 'Ідентифікатори пристроїв',
                'zh-cn': '设备标识符',
            },
            type: 'array',
            role: 'list',
            read: true,
            write: false,
        },
    },

    'device.manufacturer': {
        mqtt: {
            mqtt_publish: `homeassistant/switch/<dev_id>/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).device?.manufacturer,
        },
        common: {
            name: {
                en: 'Device Manufacturer',
                de: 'Gerätehersteller',
                ru: 'Производитель устройства',
                pt: 'Fabricante do dispositivo',
                nl: 'Fabrikant van het apparaat',
                fr: "Fabricant de l'appareil",
                it: 'Produttore del dispositivo',
                es: 'Fabricante del dispositivo',
                pl: 'Producent urządzenia',
                uk: 'Виробник пристрою',
                'zh-cn': '设备制造商',
            },
            type: 'string',
            role: 'text',
            read: true,
            write: false,
        },
    },

    'device.model': {
        mqtt: {
            mqtt_publish: `homeassistant/switch/<dev_id>/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).device?.model,
        },
        common: {
            name: {
                en: 'Device Model',
                de: 'Gerätemodell',
                ru: 'Модель устройства',
                pt: 'Modelo do dispositivo',
                nl: 'Apparaatmodel',
                fr: "Modèle d'appareil",
                it: 'Modello del dispositivo',
                es: 'Modelo del dispositivo',
                pl: 'Model urządzenia',
                uk: 'Модель пристрою',
                'zh-cn': '设备型号',
            },
            type: 'string',
            role: 'info.model',
            read: true,
            write: false,
        },
    },

    'device.name': {
        mqtt: {
            mqtt_publish: `homeassistant/switch/<dev_id>/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).device?.name,
        },
        common: {
            name: {
                en: 'Device Name',
                de: 'Gerätename',
                ru: 'Имя устройства',
                pt: 'Nome do dispositivo',
                nl: 'Apparaatnaam',
                fr: "Nom de l'appareil",
                it: 'Nome del dispositivo',
                es: 'Nombre del dispositivo',
                pl: 'Nazwa urządzenia',
                uk: 'Назва пристрою',
                'zh-cn': '设备名称',
            },
            type: 'string',
            role: 'info.name',
            read: true,
            write: false,
        },
    },

    'device.sw_version': {
        mqtt: {
            mqtt_publish: `homeassistant/switch/<dev_id>/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).device?.sw_version,
        },
        common: {
            name: {
                en: 'Softwareversion',
                de: 'Softwareversion',
                ru: 'Версия программного обеспечения',
                pt: 'Versão do software',
                nl: 'Softwareversie',
                fr: 'Version du logiciel',
                it: 'Versione software',
                es: 'Versión del software',
                pl: 'Wersja oprogramowania',
                uk: 'Версія програмного забезпечення',
                'zh-cn': '软件版本',
            },
            type: 'string',
            role: 'info.firmware',
            read: true,
            write: false,
        },
    },

    'power_ctrl.min': {
        mqtt: {
            mqtt_publish: `homeassistant/number/<dev_id>/power_ctrl/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).min,
        },
        common: {
            name: {
                en: 'Maximum Input Power',
                de: 'Maximale Eingangsleistung',
                ru: 'Максимальная входная мощность',
                pt: 'Potência máxima de entrada',
                nl: 'Maximaal ingangsvermogen',
                fr: "Puissance d'entrée maximale",
                it: 'Potenza massima in ingresso',
                es: 'Potencia máxima de entrada',
                pl: 'Maksymalna moc wejściowa',
                uk: 'Максимальна вхідна потужність',
                'zh-cn': '最大输入功率',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'power_ctrl.max': {
        mqtt: {
            mqtt_publish: `homeassistant/number/<dev_id>/power_ctrl/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).max,
        },
        common: {
            name: {
                en: 'Maximum Output Power',
                de: 'Maximale Ausgangsleistung',
                ru: 'Максимальная выходная мощность',
                pt: 'Potência máxima de saída',
                nl: 'Maximaal uitgangsvermogen',
                fr: 'Puissance de sortie maximale',
                it: 'Potenza massima in uscita',
                es: 'Potencia máxima de salida',
                pl: 'Maksymalna moc wyjściowa',
                uk: 'Максимальна вихідна потужність',
                'zh-cn': '最大输出功率',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'power_ctrl.step': {
        mqtt: {
            mqtt_publish: `homeassistant/number/<dev_id>/power_ctrl/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).step,
        },
        common: {
            name: {
                en: 'Power Stepsize',
                de: 'Leistungsschrittweite',
                ru: 'Мощность Stepsize',
                pt: 'Tamanho do passo de potência',
                nl: 'Vermogen Stapgrootte',
                fr: 'Pas de puissance',
                it: 'Gradino di potenza',
                es: 'Tamaño del paso de potencia',
                pl: 'Wielkość kroku mocy',
                uk: 'Розмір кроку потужності',
                'zh-cn': '功率步长',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.bat_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_p,
        },
        common: {
            name: {
                en: 'Device Battery Power',
                de: 'Akkuleistung des Geräts',
                ru: 'Заряд батареи устройства',
                pt: 'Energia da bateria do dispositivo',
                nl: 'Batterijvermogen van het apparaat',
                fr: "Puissance de la batterie de l'appareil",
                it: 'Potenza della batteria del dispositivo',
                es: 'Energía de la batería del dispositivo',
                pl: 'Moc baterii urządzenia',
                uk: 'Заряд батареї пристрою',
                'zh-cn': '设备电池电量',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.bat_sts': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_sts,
        },
        common: {
            name: {
                en: 'Device Battery Status',
                de: 'Batteriestatus des Geräts',
                ru: 'Состояние батареи устройства',
                pt: 'Status da bateria do dispositivo',
                nl: 'Batterijstatus van het apparaat',
                fr: "État de la batterie de l'appareil",
                it: 'Stato della batteria del dispositivo',
                es: 'Estado de la batería del dispositivo',
                pl: 'Stan baterii urządzenia',
                uk: 'Стан батареї пристрою',
                'zh-cn': '设备电池状态',
            },
            type: 'string',
            role: 'text',
            read: true,
            write: false,
        },
    },

    'quick.grid_on_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).grid_on_p,
        },
        common: {
            name: {
                en: 'Active Power to Grid',
                de: 'Wirkleistung zum Netz',
                ru: 'Активная мощность в сеть',
                pt: 'Energia Ativa para Rede',
                nl: 'Actief vermogen TO-net',
                fr: 'Puissance active vers le réseau',
                it: 'Potenza attiva alla rete',
                es: 'Potencia activa a la red',
                pl: 'Moc czynna do sieci',
                uk: 'Активна потужність для мережі',
                'zh-cn': '有功功率并网',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.grid_off_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).grid_off_p,
        },
        common: {
            name: {
                en: 'Active Power from Grid',
                de: 'Wirkleistung aus dem Netz',
                ru: 'Активная мощность из сети',
                pt: 'Potência Ativa da Rede',
                nl: 'Actief vermogen van het net',
                fr: 'Puissance active du réseau',
                it: 'Potenza attiva dalla rete',
                es: 'Energía activa de la red',
                pl: 'Moc czynna z sieci',
                uk: 'Активна потужність з мережі',
                'zh-cn': '来自电网的有功功率',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.soc': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).soc,
        },
        common: {
            name: {
                en: 'Battery SOC',
                de: 'Batterie-Ladezustand',
                ru: 'Уровень заряда батареи',
                pt: 'SOC da bateria',
                nl: 'Batterij SOC',
                fr: 'SOC de la batterie',
                it: 'SOC della batteria',
                es: 'SOC de la batería',
                pl: 'Stan baterii',
                uk: 'Заряд батареї',
                'zh-cn': '电池SOC',
            },
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            unit: '%',
        },
    },

    'quick.sys_bat_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sys_bat_p,
        },
        common: {
            name: {
                en: 'System Battery SOC',
                de: 'Systemweiter Batterie-Ladezustand',
                ru: 'Системная батарея SOC',
                pt: 'SOC da bateria do sistema',
                nl: 'Systeembatterij SOC',
                fr: 'Système de surveillance de la batterie',
                it: 'SOC della batteria di sistema',
                es: 'SOC de la batería del sistema',
                pl: 'Stan akumulatora systemowego SOC',
                uk: 'Заряд батареї системи',
                'zh-cn': '系统电池SOC',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.sys_grid_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sys_grid_p,
        },
        common: {
            name: {
                en: 'System Grid Power',
                de: 'Systemnetzstrom',
                ru: 'Системная сетка питания',
                pt: 'Sistema de energia da rede elétrica',
                nl: 'Systeemnetstroom',
                fr: 'Réseau électrique du système',
                it: 'Sistema di alimentazione della rete',
                es: 'Energía de la red del sistema',
                pl: 'System zasilania sieciowego',
                uk: 'Системна мережа живлення',
                'zh-cn': '系统电网功率',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.sys_load_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sys_load_p,
        },
        common: {
            name: {
                en: 'System Load Power',
                de: 'Systemlastleistung',
                ru: 'Мощность нагрузки системы',
                pt: 'Potência de carga do sistema',
                nl: 'Systeembelastingvermogen',
                fr: 'Puissance de charge du système',
                it: 'Potenza del carico del sistema',
                es: 'Potencia de carga del sistema',
                pl: 'Moc obciążenia systemu',
                uk: 'Потужність системного навантаження',
                'zh-cn': '系统负载功率',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.sys_plug_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sys_plug_p,
        },
        common: {
            name: {
                en: 'System Socket Power',
                de: 'Systemsteckdosen-Leistung',
                ru: 'Мощность системной розетки',
                pt: 'Sistema de alimentação de soquete',
                nl: 'Systeem Socket Power',
                fr: "Prise d'alimentation du système",
                it: 'Presa di alimentazione del sistema',
                es: 'Alimentación del zócalo del sistema',
                pl: 'Gniazdo zasilania systemu',
                uk: 'Живлення системної розетки',
                'zh-cn': '系统插座电源',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.sys_pv_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sys_pv_p,
        },
        common: {
            name: {
                en: 'System Photovoltaic Power',
                de: 'Photovoltaikleistung',
                ru: 'Система фотоэлектрической энергии',
                pt: 'Sistema de Energia Fotovoltaica',
                nl: 'Systeem Fotovoltaïsche Energie',
                fr: "Système d'énergie photovoltaïque",
                it: 'Sistema di alimentazione fotovoltaica',
                es: 'Sistema de energía fotovoltaica',
                pl: 'System zasilania fotowoltaicznego',
                uk: 'Системна фотоелектрична енергія',
                'zh-cn': '系统光伏发电',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'quick.sys_soc': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sys_soc,
        },
        common: {
            name: {
                en: 'System battery SOC',
                de: 'Systembatterie-SOC',
                ru: 'Системная батарея SOC',
                pt: 'Bateria do sistema SOC',
                nl: 'Systeembatterij SOC',
                fr: 'SOC de la batterie du système',
                it: 'SOC della batteria di sistema',
                es: 'SOC de la batería del sistema',
                pl: 'Stan baterii systemowej SOC',
                uk: 'Заряд батареї системи',
                'zh-cn': '系统电池SOC',
            },
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            unit: '%',
        },
    },

    'quick.sys_sp_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sys_sp_p,
        },
        common: {
            name: {
                en: 'System Smart Socket Power',
                de: 'System Smart Socket Power',
                ru: 'Система интеллектуальных розеток Power',
                pt: 'Sistema Smart Socket Power',
                nl: 'Systeem Smart Socket Power',
                fr: 'Système Smart Socket Power',
                it: 'Sistema di alimentazione Smart Socket',
                es: 'Sistema de alimentación de enchufe inteligente',
                pl: 'System Smart Socket Power',
                uk: 'Система розумного живлення розетки',
                'zh-cn': '系统智能插座电源',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },
};

const devIdCache: { [key: string]: string } = {};

/**
 * remove invalid characters from devId
 *
 * @param devId device Id to filter
 */
export function filterDevId(devId: string): string {
    return devId.replace(/[^a-zA-Z0-9-]/g, '_');
}

export async function initStates(adapter: ioBroker.Adapter, dev_id: string): Promise<void> {
    const deviceId = filterDevId(dev_id);
    if (devIdCache[deviceId]) {
        // nothing to do if already processed
        return;
    }

    adapter.log.debug(`initializing states for device ${dev_id}`);

    // create device object
    await adapter.extendObjectAsync(
        `${deviceId}`,
        {
            type: 'device',
            common: {
                name: deviceId,
                // statusStates: {
                //     onlineId: `${this.name}.${this.instance}.${deviceId}.info.online`,
                // },
            },
            native: {},
        },
        { preserve: { common: ['name'] } },
    );

    for (const channelKey in channelConfig) {
        await adapter.extendObjectAsync(
            `${deviceId}.${channelKey}`,
            {
                type: 'channel',
                common: channelConfig[channelKey].common,
                native: {},
            },
            { preserve: { common: ['name'] } },
        );
    }

    for (const folderKey in folderConfig) {
        await adapter.extendObject(
            `${deviceId}.${folderKey}`,
            {
                type: 'folder',
                common: folderConfig[folderKey].common,
                native: {},
            },
            { preserve: { common: ['name'] } },
        );
    }

    for (const stateKey in stateConfig) {
        await adapter.extendObjectAsync(
            `${deviceId}.${stateKey}`,
            {
                type: 'state',
                common: stateConfig[stateKey].common,
                native: {},
            },
            { preserve: { common: ['name'] } },
        );
    }

    devIdCache[deviceId] = 'X';
}
