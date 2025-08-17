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
        mqtt?: {
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
    q: number;
    ein: number;
    eout: number;
    etin: number;
    etout: number;
};

const channelConfig: ChannelConfig = {
    device: {
        common: {
            name: '',
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
            name: '',
        },
    },

    realtime: {
        common: {
            name: '',
        },
    },

    system: {
        common: {
            name: '',
        },
    },
};

const folderConfig: FolderConfig = {
    info: {
        common: {
            name: '',
        },
    },
};

export const stateConfig: StateConfig = {
    'device.bat_i': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_i,
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

    'device.bat_p': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_p,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },

    'device.bat_temp': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_temp,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.temperature',
            read: true,
            write: false,
            unit: '°C',
        },
    },

    'device.bat_v': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_v,
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

    'device.bat_sts': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).bat_sts,
        },
        common: {
            name: '',
            type: 'string',
            role: 'text',
            read: true,
            write: false,
        },
    },

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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
            type: 'string',
            role: 'info.name',
            read: true,
            write: false,
        },
    },

    'device.rssi': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).rssi,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            unit: 'db',
        },
    },

    'device.soc': {
        mqtt: {
            mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).soc,
        },
        common: {
            name: '',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            unit: '%',
        },
    },

    'device.sw_version': {
        mqtt: {
            mqtt_publish: `homeassistant/switch/<dev_id>/config`,
            mqtt_publish_funct: (value: string): any => JSON.parse(value).device?.sw_version,
        },
        common: {
            name: '',
            type: 'string',
            role: 'info.firmware',
            read: true,
            write: false,
        },
    },

    'info.online': {
        common: {
            name: '',
            type: 'boolean',
            role: 'indicator.reachable',
            read: true,
            write: false,
        },
    },

    'info.timestamp': {
        common: {
            name: '',
            type: 'number',
            role: 'date',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
            type: 'number',
            role: 'value.power',
            read: true,
            write: false,
            unit: 'W',
        },
    },
};

type DevIdCache = {
    [key: string]: {
        initializing: boolean;
        ready: boolean;
        online: boolean;
        ts: number;
    };
};

const devIdCache: DevIdCache = {};

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

    if (!devIdCache[deviceId]) {
        devIdCache[deviceId] = {
            initializing: false,
            ready: false,
            online: false,
            ts: 0,
        };
    }

    // Events are raised faster than initialization completes. So lets wait is init is already in progress.
    while (devIdCache[deviceId].initializing) {
        adapter.log.debug(`initialization of states for device ${dev_id} in progress...`);
        await adapter.delay(250);
    }

    if (devIdCache[deviceId].ready) {
        // nothing to do if already processed
        return;
    }

    devIdCache[deviceId].initializing = true;

    adapter.log.info(`Device ${dev_id} is initializing states`);

    // create device object
    await adapter.extendObject(
        `${deviceId}`,
        {
            type: 'device',
            common: {
                name: deviceId,
                statusStates: {
                    onlineId: `${adapter.name}.${adapter.instance}.${deviceId}.info.online`,
                },
            },
            native: {},
        },
        { preserve: { common: ['name'] } },
    );

    for (const channelKey in channelConfig) {
        const common = channelConfig[channelKey].common;
        common.name = utils.I18n.getTranslatedObject(`${channelKey}_name`);
        common.desc = utils.I18n.getTranslatedObject(`${channelKey}_desc`);
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
        common.desc = utils.I18n.getTranslatedObject(`${folderKey}_desc`);
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
        common.name = utils.I18n.getTranslatedObject(`${stateKey}_name`);
        common.desc = utils.I18n.getTranslatedObject(`${stateKey}_desc`);
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

    devIdCache[deviceId].ready = true;
    devIdCache[deviceId].initializing = false;
    adapter.log.debug(`initialization of states for device ${dev_id} completed`);
}

/**
 *
 */
export async function handleOnlineStatus(adapter: ioBroker.Adapter, dev_id: string): Promise<void> {
    const deviceId = filterDevId(dev_id);
    const ts = Date.now();

    if (!devIdCache[deviceId]) {
        return;
    }

    await adapter.setState(`${deviceId}.info.timestamp`, ts, true);
    devIdCache[deviceId].ts = ts;

    const oldState = devIdCache[deviceId].online;
    devIdCache[deviceId].online = true;

    if (!oldState) {
        await adapter.setState(`${deviceId}.info.online`, true, true);
        adapter.log.info(`Device ${deviceId} is online`);
        await adapter.setState(`info.connection`, true, true);
    }
}

/**
 *
 */
export async function checkOnlineStatus(adapter: ioBroker.Adapter): Promise<void> {
    const now = Date.now();
    let connected = false;

    for (const deviceId in devIdCache) {
        if (!devIdCache[deviceId].online) {
            continue;
        }
        if (now - devIdCache[deviceId].ts > 30 * 1000 /* 30s */) {
            await adapter.setState(`${deviceId}.info.online`, false, true);
            adapter.log.warn(`Device ${deviceId} is offline`);
            devIdCache[deviceId].online = false;
        } else {
            connected = true;
        }
    }

    await adapter.setState(`info.connection`, connected, true);
}
