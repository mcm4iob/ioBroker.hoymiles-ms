import * as utils from '@iobroker/adapter-core';

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

type GridObj = {
    type: string;
    v: number;
    i: number;
    f: number;
    p: number;
    q:  number;
    ein:  number;
    eout:  number;
    etin: number;
    etout: number;
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

    'device.grid_on': {
        common: {
            name: '',
        },
    },

    'device.grid_off': {
        common: {
            name: '',
        },
    },

    'device.inv': {
        common: {
            name: '',
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

    realtime: {
        common: {
            name: {
                en: 'Realtime Data',
                de: 'Echtzeitdaten',
                ru: 'Данные в реальном времени',
                pt: 'Dados em tempo real',
                nl: 'Realtime gegevens',
                fr: 'Données en temps réel',
                it: 'Dati in tempo reale',
                es: 'Datos en tiempo real',
                pl: 'Dane w czasie rzeczywistym',
                uk: 'Дані в реальному часі',
                'zh-cn': '实时数据',
            },
        },
    },

    system: {
        common: {
            name: {
                en: 'System Data',
                de: 'Systemdaten',
                ru: 'Системные данные',
                pt: 'Dados do sistema',
                nl: 'Systeemgegevens',
                fr: 'Données système',
                it: 'Dati di sistema',
                es: 'Datos del sistema',
                pl: 'Dane systemowe',
                uk: 'Системні дані',
                'zh-cn': '系统数据',
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
    'device.grid_off.ein': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.ein,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_off.eout': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.eout,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_off.etin': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.etin,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_off.etout': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.etout,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_off.i': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.i,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.current',
            read: true,
            write: false,
            unit: 'A',
        },
    },

    'device.grid_off.f': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.f,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.frequency',
            read: true,
            write: false,
            unit: 'Hz',
        },
    },

    'device.grid_off.p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.p,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.power.active',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'device.grid_off.q': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.q,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.power.reactive',
            read: true,
            write: false,
            unit: 'Var',
        },
    },

    'device.grid_off.v': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_off')[0]?.v,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            unit: 'V',
        },
    },

    'device.grid_on.ein': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.ein,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_on.eout': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.eout,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_on.etin': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.etin,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_on.etout': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.etout,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.grid_on.i': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.i,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.current',
            read: true,
            write: false,
            unit: 'A',
        },
    },

    'device.grid_on.f': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.f,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.frequency',
            read: true,
            write: false,
            unit: 'Hz',
        },
    },

    'device.grid_on.p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.p,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.power.active',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'device.grid_on.q': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.q,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.power.reactive',
            read: true,
            write: false,
            unit: 'Var',
        },
    },

    'device.grid_on.v': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'grid_on')[0]?.v,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            unit: 'V',
        },
    },

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

    'device.inv.ein': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.ein,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.inv.eout': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.eout,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.inv.etin': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.etin,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.inv.etout': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.etout,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'device.inv.i': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.i,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.current',
            read: true,
            write: false,
            unit: 'A',
        },
    },

    'device.inv.p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.p,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.power.active',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'device.inv.q': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.q,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.power.reactive',
            read: true,
            write: false,
            unit: 'Var',
        },
    },

    'device.inv.v': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any =>
                JSON.parse(value).grid?.filter((obj: GridObj) => obj.type === 'inv')[0]?.v,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            unit: 'V',
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

    'realtime.bat_p': {
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

    'realtime.bat_sts': {
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

    'realtime.grid_on_p': {
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

    'realtime.grid_off_p': {
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

    'realtime.soc': {
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

    'realtime.sys_bat_p': {
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

    'realtime.sys_grid_p': {
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

    'realtime.sys_load_p': {
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

    'realtime.sys_plug_p': {
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

    'realtime.sys_pv_p': {
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

    'realtime.sys_soc': {
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

    'realtime.sys_sp_p': {
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

    'system.bat_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_p,
        },
        common: {
            name: {
                en: 'Battery Power',
                de: 'Batterieleistung',
                ru: 'Мощность аккумулятора',
                pt: 'Energia da bateria',
                nl: 'Batterijvoeding',
                fr: 'Alimentation par batterie',
                it: 'Potenza della batteria',
                es: 'Energía de la batería',
                pl: 'Moc baterii',
                uk: 'Живлення від батареї',
                'zh-cn': '电池电量',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'system.chg_e': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).chg_e,
        },
        common: {
            name: {
                en: 'Battery Charge (Today)\n',
                de: 'Batterieladung (heute)\n',
                ru: 'Заряд батареи (сегодня)\n',
                pt: 'Carga da bateria (hoje)\n',
                nl: 'Batterijlading (vandaag)\n',
                fr: "Charge de la batterie (aujourd'hui)\n",
                it: 'Carica della batteria (oggi)\n',
                es: 'Carga de la batería (hoy)\n',
                pl: 'Ładowanie baterii (dzisiaj)\n',
                uk: 'Заряд акумулятора (сьогодні)\n',
                'zh-cn': '电池电量（今日）\n',
            },
            type: 'number',
            role: 'value.energy.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'system.dchg_e': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).dchg_e,
        },
        common: {
            name: {
                en: 'Battery Decharge (Today)\n',
                de: 'Batterieentladung (Heute)\n',
                ru: 'Разряд батареи (сегодня)\n',
                pt: 'Descarga da bateria (hoje)\n',
                nl: 'Batterij ontladen (vandaag)\n',
                fr: "Décharge de la batterie (aujourd'hui)\n",
                it: 'Scarica della batteria (oggi)\n',
                es: 'Descarga de la batería (hoy)\n',
                pl: 'Rozładowanie akumulatora (dzisiaj)\n',
                uk: 'Розрядка акумулятора (сьогодні)\n',
                'zh-cn': '电池放电（今天）\n',
            },
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'system.grid_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).grid_p,
        },
        common: {
            name: {
                en: 'Grid Power',
                de: 'Netzleistung',
                ru: 'Сетевая мощность',
                pt: 'Energia da rede',
                nl: 'Netstroom',
                fr: 'Réseau électrique',
                it: 'Potenza di rete',
                es: 'Energía de red',
                pl: 'Moc sieciowa',
                uk: 'Енергія мережі',
                'zh-cn': '电网电力',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'system.ems_mode': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).ems_mode,
        },
        common: {
            name: {
                en: 'EMS Mode',
                de: 'EMS-Modus',
                ru: 'Режим EMS',
                pt: 'Modo EMS',
                nl: 'EMS-modus',
                fr: 'Mode EMS',
                it: 'Modalità EMS',
                es: 'Modo EMS',
                pl: 'Tryb EMS',
                uk: 'Режим екстреної медичної допомоги',
                'zh-cn': 'EMS模式',
            },
            type: 'string',
            role: 'state',
            read: true,
            write: false,
        },
    },

    'system.plug_in_e': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).plug_in_e,
        },
        common: {
            name: {
                en: 'Grid-Socket Input-Energy (Today)',
                de: 'Netz-Steckdosen-Eingangsenergie (Heute)',
                ru: 'Входная мощность сети-розетки (сегодня)',
                pt: 'Entrada de energia na rede elétrica (hoje)',
                nl: 'Netstroom-ingangsenergie (vandaag)',
                fr: "Énergie d'entrée du réseau (aujourd'hui)",
                it: 'Energia in ingresso alla rete elettrica (oggi)',
                es: 'Energía de entrada de la toma de red (hoy)',
                pl: 'Wejście-energia sieciowa-gniazdkowa (dzisiaj)',
                uk: 'Вхідна енергія розетки мережі (сьогодні)',
                'zh-cn': '电网插座输入能量（今日）',
            },
            type: 'number',
            role: 'value.enery.consumed',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'system.plug_out_e': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).plug_out_e,
        },
        common: {
            name: {
                en: 'Grid-Socket Output-Energy (Today)',
                de: 'Netz-Steckdosen-Ausgangsenergie (Heute)',
                ru: 'Выход энергии из сети (сегодня)',
                pt: 'Saída de energia da rede elétrica (hoje)',
                nl: 'Netstroom-energie (vandaag)',
                fr: "Énergie de sortie du réseau (aujourd'hui)",
                it: 'Energia in uscita dalla rete elettrica (oggi)',
                es: 'Energía de salida de la toma de red (hoy)',
                pl: 'Wyjście sieciowe-energia (obecnie)',
                uk: 'Вихідна енергія розетки мережі (сьогодні)',
                'zh-cn': '电网插座输出能量（今日）',
            },
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'system.pv_e': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).pv_e,
        },
        common: {
            name: {
                en: 'Photovoltaic Energyproduction (Today)',
                de: 'Photovoltaik-Energieerzeugung (heute)',
                ru: 'Производство фотоэлектрической энергии (сегодня)',
                pt: 'Produção de Energia Fotovoltaica (Hoje)',
                nl: 'Fotovoltaïsche energieproductie (vandaag)',
                fr: "Production d'énergie photovoltaïque (aujourd'hui)",
                it: 'Produzione di energia fotovoltaica (oggi)',
                es: 'Producción de energía fotovoltaica (hoy)',
                pl: 'Produkcja energii fotowoltaicznej (dzisiaj)',
                uk: 'Виробництво фотоелектричної енергії (сьогодні)',
                'zh-cn': '光伏发电（今天）',
            },
            type: 'number',
            role: 'value.energy.produced',
            read: true,
            write: false,
            unit: 'Wh',
        },
    },

    'system.pv_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).pv_p,
        },
        common: {
            name: {
                en: 'Photovoltaic Power',
                de: 'Photovoltaik Leistung',
                ru: 'Фотоэлектрическая энергия',
                pt: 'Energia Fotovoltaica',
                nl: 'Fotovoltaïsche energie',
                fr: 'Énergie photovoltaïque',
                it: 'Energia fotovoltaica',
                es: 'Energía fotovoltaica',
                pl: 'Energia fotowoltaiczna',
                uk: 'Фотоелектрична енергія',
                'zh-cn': '光伏发电',
            },
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'system.soc': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).soc,
        },
        common: {
            name: {
                en: 'Battery SOC',
                de: 'Batterie-SOC',
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

    'system.sp_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).sp_p,
        },
        common: {
            name: {
                en: 'Smart-Socket Power',
                de: 'Smart-Socket Leistung',
                ru: 'Умная розетка Power',
                pt: 'Energia Smart-Socket',
                nl: 'Slimme stopcontactvoeding',
                fr: 'Prise de courant intelligente',
                it: 'Potenza della presa intelligente',
                es: 'Alimentación mediante enchufe inteligente',
                pl: 'Smart-Socket Power',
                uk: 'Живлення від смарт-розеток',
                'zh-cn': '智能插座电源',
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

/**
 *
 */
export async function initStates(adapter: ioBroker.Adapter, dev_id: string): Promise<void> {
    const deviceId = filterDevId(dev_id);
    if (devIdCache[deviceId]) {
        // nothing to do if already processed
        return;
    }

    adapter.log.debug(`initializing states for device ${dev_id}`);

    // create device object
    await adapter.extendObject(
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
        const common = channelConfig[channelKey].common;
        common.name = utils.I18n.getTranslatedObject(`${channelKey}_name`);
        await adapter.extendObject(
            `${deviceId}.${channelKey}`,
            {
                type: 'channel',
                common: common,
                native: {},
            },
            { preserve: { common: ['name'] } },
        );
    }

    for (const folderKey in folderConfig) {
        const common = folderConfig[folderKey].common;
        common.name = utils.I18n.getTranslatedObject(`${folderKey}_name`);
        await adapter.extendObject(
            `${deviceId}.${folderKey}`,
            {
                type: 'folder',
                common: common,
                native: {},
            },
            { preserve: { common: ['name'] } },
        );
    }

    for (const stateKey in stateConfig) {
        const common = stateConfig[stateKey].common;
        common.name = utils.I18n.getTranslatedObject(`${stateKey}_name`)
        await adapter.extendObject(
            `${deviceId}.${stateKey}`,
            {
                type: 'state',
                common: common,
                native: {},
            },
            { preserve: { common: ['name'] } },
        );
    }

    devIdCache[deviceId] = 'X';
    adapter.log.debug(`initialization of states for device ${dev_id} completed`);

}
