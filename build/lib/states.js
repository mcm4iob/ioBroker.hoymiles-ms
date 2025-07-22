"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var states_exports = {};
__export(states_exports, {
  filterDevId: () => filterDevId,
  initStates: () => initStates,
  stateConfig: () => stateConfig
});
module.exports = __toCommonJS(states_exports);
var utils = __toESM(require("@iobroker/adapter-core"));
const channelConfig = {
  device: {
    common: {
      name: {
        en: "Device",
        de: "Ger\xE4t",
        ru: "\u0423\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E",
        pt: "Dispositivo",
        nl: "Apparaat",
        fr: "Appareil",
        it: "Dispositivo",
        es: "Dispositivo",
        pl: "Urz\u0105dzenie",
        uk: "\u041F\u0440\u0438\u0441\u0442\u0440\u0456\u0439",
        "zh-cn": "\u8BBE\u5907"
      }
    }
  },
  "device.grid_on": {
    common: {
      name: ""
    }
  },
  "device.grid_off": {
    common: {
      name: ""
    }
  },
  "device.inv": {
    common: {
      name: ""
    }
  },
  power_ctrl: {
    common: {
      name: {
        en: "Power-control",
        de: "Leistungsregelung",
        ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C\u044E",
        pt: "Controle de pot\xEAncia",
        nl: "Vermogensregeling",
        fr: "Contr\xF4le de puissance",
        it: "Controllo di potenza",
        es: "Control de potencia",
        pl: "Kontrola mocy",
        uk: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0436\u0438\u0432\u043B\u0435\u043D\u043D\u044F",
        "zh-cn": "\u529F\u7387\u63A7\u5236"
      }
    }
  },
  realtime: {
    common: {
      name: {
        en: "Realtime Data",
        de: "Echtzeitdaten",
        ru: "\u0414\u0430\u043D\u043D\u044B\u0435 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
        pt: "Dados em tempo real",
        nl: "Realtime gegevens",
        fr: "Donn\xE9es en temps r\xE9el",
        it: "Dati in tempo reale",
        es: "Datos en tiempo real",
        pl: "Dane w czasie rzeczywistym",
        uk: "\u0414\u0430\u043D\u0456 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u0447\u0430\u0441\u0456",
        "zh-cn": "\u5B9E\u65F6\u6570\u636E"
      }
    }
  },
  system: {
    common: {
      name: {
        en: "System Data",
        de: "Systemdaten",
        ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435",
        pt: "Dados do sistema",
        nl: "Systeemgegevens",
        fr: "Donn\xE9es syst\xE8me",
        it: "Dati di sistema",
        es: "Datos del sistema",
        pl: "Dane systemowe",
        uk: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0456 \u0434\u0430\u043D\u0456",
        "zh-cn": "\u7CFB\u7EDF\u6570\u636E"
      }
    }
  }
};
const folderConfig = {
  info: {
    common: {
      name: {
        en: "Status Information",
        de: "Statusinformationen",
        ru: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0441\u0442\u0430\u0442\u0443\u0441\u0435",
        pt: "Informa\xE7\xF5es de status",
        nl: "Statusinformatie",
        fr: "Informations sur le statut",
        it: "Informazioni sullo stato",
        es: "Informaci\xF3n de estado",
        pl: "Informacje o statusie",
        uk: "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u0441\u0442\u0430\u0442\u0443\u0441",
        "zh-cn": "\u72B6\u6001\u4FE1\u606F"
      }
    }
  }
};
const stateConfig = {
  "device.grid_off.ein": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.ein;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_off.eout": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.eout;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_off.etin": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.etin;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_off.etout": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.etout;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_off.i": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.i;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.current",
      read: true,
      write: false,
      unit: "A"
    }
  },
  "device.grid_off.f": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.f;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.frequency",
      read: true,
      write: false,
      unit: "Hz"
    }
  },
  "device.grid_off.p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.p;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.power.active",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "device.grid_off.q": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.q;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.power.reactive",
      read: true,
      write: false,
      unit: "Var"
    }
  },
  "device.grid_off.v": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_off")[0]) == null ? void 0 : _b.v;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.voltage",
      read: true,
      write: false,
      unit: "V"
    }
  },
  "device.grid_on.ein": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.ein;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_on.eout": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.eout;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_on.etin": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.etin;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_on.etout": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.etout;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.grid_on.i": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.i;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.current",
      read: true,
      write: false,
      unit: "A"
    }
  },
  "device.grid_on.f": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.f;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.frequency",
      read: true,
      write: false,
      unit: "Hz"
    }
  },
  "device.grid_on.p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.p;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.power.active",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "device.grid_on.q": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.q;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.power.reactive",
      read: true,
      write: false,
      unit: "Var"
    }
  },
  "device.grid_on.v": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "grid_on")[0]) == null ? void 0 : _b.v;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.voltage",
      read: true,
      write: false,
      unit: "V"
    }
  },
  "device.identifiers": {
    mqtt: {
      mqtt_publish: `homeassistant/switch/<dev_id>/config`,
      mqtt_publish_funct: (value) => {
        var _a;
        return JSON.stringify((_a = JSON.parse(value).device) == null ? void 0 : _a.identifiers);
      }
    },
    common: {
      name: {
        en: "Device Identifiers",
        de: "Ger\xE4tekennungen",
        ru: "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u044B \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432",
        pt: "Identificadores de dispositivos",
        nl: "Apparaat-ID's",
        fr: "Identifiants de p\xE9riph\xE9rique",
        it: "Identificatori del dispositivo",
        es: "Identificadores de dispositivos",
        pl: "Identyfikatory urz\u0105dze\u0144",
        uk: "\u0406\u0434\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0438 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457\u0432",
        "zh-cn": "\u8BBE\u5907\u6807\u8BC6\u7B26"
      },
      type: "array",
      role: "list",
      read: true,
      write: false
    }
  },
  "device.inv.ein": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.ein;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.inv.eout": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.eout;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.inv.etin": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.etin;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.inv.etout": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.etout;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "device.inv.i": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.i;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.current",
      read: true,
      write: false,
      unit: "A"
    }
  },
  "device.inv.p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.p;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.power.active",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "device.inv.q": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.q;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.power.reactive",
      read: true,
      write: false,
      unit: "Var"
    }
  },
  "device.inv.v": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/device/state`,
      mqtt_publish_funct: (value) => {
        var _a, _b;
        return (_b = (_a = JSON.parse(value).grid) == null ? void 0 : _a.filter((obj) => obj.type === "inv")[0]) == null ? void 0 : _b.v;
      }
    },
    common: {
      name: "",
      type: "number",
      role: "value.voltage",
      read: true,
      write: false,
      unit: "V"
    }
  },
  "device.manufacturer": {
    mqtt: {
      mqtt_publish: `homeassistant/switch/<dev_id>/config`,
      mqtt_publish_funct: (value) => {
        var _a;
        return (_a = JSON.parse(value).device) == null ? void 0 : _a.manufacturer;
      }
    },
    common: {
      name: {
        en: "Device Manufacturer",
        de: "Ger\xE4tehersteller",
        ru: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Fabricante do dispositivo",
        nl: "Fabrikant van het apparaat",
        fr: "Fabricant de l'appareil",
        it: "Produttore del dispositivo",
        es: "Fabricante del dispositivo",
        pl: "Producent urz\u0105dzenia",
        uk: "\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u8BBE\u5907\u5236\u9020\u5546"
      },
      type: "string",
      role: "text",
      read: true,
      write: false
    }
  },
  "device.model": {
    mqtt: {
      mqtt_publish: `homeassistant/switch/<dev_id>/config`,
      mqtt_publish_funct: (value) => {
        var _a;
        return (_a = JSON.parse(value).device) == null ? void 0 : _a.model;
      }
    },
    common: {
      name: {
        en: "Device Model",
        de: "Ger\xE4temodell",
        ru: "\u041C\u043E\u0434\u0435\u043B\u044C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Modelo do dispositivo",
        nl: "Apparaatmodel",
        fr: "Mod\xE8le d'appareil",
        it: "Modello del dispositivo",
        es: "Modelo del dispositivo",
        pl: "Model urz\u0105dzenia",
        uk: "\u041C\u043E\u0434\u0435\u043B\u044C \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u8BBE\u5907\u578B\u53F7"
      },
      type: "string",
      role: "info.model",
      read: true,
      write: false
    }
  },
  "device.name": {
    mqtt: {
      mqtt_publish: `homeassistant/switch/<dev_id>/config`,
      mqtt_publish_funct: (value) => {
        var _a;
        return (_a = JSON.parse(value).device) == null ? void 0 : _a.name;
      }
    },
    common: {
      name: {
        en: "Device Name",
        de: "Ger\xE4tename",
        ru: "\u0418\u043C\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Nome do dispositivo",
        nl: "Apparaatnaam",
        fr: "Nom de l'appareil",
        it: "Nome del dispositivo",
        es: "Nombre del dispositivo",
        pl: "Nazwa urz\u0105dzenia",
        uk: "\u041D\u0430\u0437\u0432\u0430 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u8BBE\u5907\u540D\u79F0"
      },
      type: "string",
      role: "info.name",
      read: true,
      write: false
    }
  },
  "device.sw_version": {
    mqtt: {
      mqtt_publish: `homeassistant/switch/<dev_id>/config`,
      mqtt_publish_funct: (value) => {
        var _a;
        return (_a = JSON.parse(value).device) == null ? void 0 : _a.sw_version;
      }
    },
    common: {
      name: {
        en: "Softwareversion",
        de: "Softwareversion",
        ru: "\u0412\u0435\u0440\u0441\u0438\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u043E\u0433\u043E \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u044F",
        pt: "Vers\xE3o do software",
        nl: "Softwareversie",
        fr: "Version du logiciel",
        it: "Versione software",
        es: "Versi\xF3n del software",
        pl: "Wersja oprogramowania",
        uk: "\u0412\u0435\u0440\u0441\u0456\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043D\u043E\u0433\u043E \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0435\u043D\u043D\u044F",
        "zh-cn": "\u8F6F\u4EF6\u7248\u672C"
      },
      type: "string",
      role: "info.firmware",
      read: true,
      write: false
    }
  },
  "power_ctrl.min": {
    mqtt: {
      mqtt_publish: `homeassistant/number/<dev_id>/power_ctrl/config`,
      mqtt_publish_funct: (value) => JSON.parse(value).min
    },
    common: {
      name: {
        en: "Maximum Input Power",
        de: "Maximale Eingangsleistung",
        ru: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0445\u043E\u0434\u043D\u0430\u044F \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C",
        pt: "Pot\xEAncia m\xE1xima de entrada",
        nl: "Maximaal ingangsvermogen",
        fr: "Puissance d'entr\xE9e maximale",
        it: "Potenza massima in ingresso",
        es: "Potencia m\xE1xima de entrada",
        pl: "Maksymalna moc wej\u015Bciowa",
        uk: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430 \u0432\u0445\u0456\u0434\u043D\u0430 \u043F\u043E\u0442\u0443\u0436\u043D\u0456\u0441\u0442\u044C",
        "zh-cn": "\u6700\u5927\u8F93\u5165\u529F\u7387"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "power_ctrl.max": {
    mqtt: {
      mqtt_publish: `homeassistant/number/<dev_id>/power_ctrl/config`,
      mqtt_publish_funct: (value) => JSON.parse(value).max
    },
    common: {
      name: {
        en: "Maximum Output Power",
        de: "Maximale Ausgangsleistung",
        ru: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u044B\u0445\u043E\u0434\u043D\u0430\u044F \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C",
        pt: "Pot\xEAncia m\xE1xima de sa\xEDda",
        nl: "Maximaal uitgangsvermogen",
        fr: "Puissance de sortie maximale",
        it: "Potenza massima in uscita",
        es: "Potencia m\xE1xima de salida",
        pl: "Maksymalna moc wyj\u015Bciowa",
        uk: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430 \u0432\u0438\u0445\u0456\u0434\u043D\u0430 \u043F\u043E\u0442\u0443\u0436\u043D\u0456\u0441\u0442\u044C",
        "zh-cn": "\u6700\u5927\u8F93\u51FA\u529F\u7387"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "power_ctrl.step": {
    mqtt: {
      mqtt_publish: `homeassistant/number/<dev_id>/power_ctrl/config`,
      mqtt_publish_funct: (value) => JSON.parse(value).step
    },
    common: {
      name: {
        en: "Power Stepsize",
        de: "Leistungsschrittweite",
        ru: "\u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C Stepsize",
        pt: "Tamanho do passo de pot\xEAncia",
        nl: "Vermogen Stapgrootte",
        fr: "Pas de puissance",
        it: "Gradino di potenza",
        es: "Tama\xF1o del paso de potencia",
        pl: "Wielko\u015B\u0107 kroku mocy",
        uk: "\u0420\u043E\u0437\u043C\u0456\u0440 \u043A\u0440\u043E\u043A\u0443 \u043F\u043E\u0442\u0443\u0436\u043D\u043E\u0441\u0442\u0456",
        "zh-cn": "\u529F\u7387\u6B65\u957F"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.bat_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).bat_p
    },
    common: {
      name: {
        en: "Device Battery Power",
        de: "Akkuleistung des Ger\xE4ts",
        ru: "\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0438 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Energia da bateria do dispositivo",
        nl: "Batterijvermogen van het apparaat",
        fr: "Puissance de la batterie de l'appareil",
        it: "Potenza della batteria del dispositivo",
        es: "Energ\xEDa de la bater\xEDa del dispositivo",
        pl: "Moc baterii urz\u0105dzenia",
        uk: "\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u8BBE\u5907\u7535\u6C60\u7535\u91CF"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.bat_sts": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).bat_sts
    },
    common: {
      name: {
        en: "Device Battery Status",
        de: "Batteriestatus des Ger\xE4ts",
        ru: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0431\u0430\u0442\u0430\u0440\u0435\u0438 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Status da bateria do dispositivo",
        nl: "Batterijstatus van het apparaat",
        fr: "\xC9tat de la batterie de l'appareil",
        it: "Stato della batteria del dispositivo",
        es: "Estado de la bater\xEDa del dispositivo",
        pl: "Stan baterii urz\u0105dzenia",
        uk: "\u0421\u0442\u0430\u043D \u0431\u0430\u0442\u0430\u0440\u0435\u0457 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u8BBE\u5907\u7535\u6C60\u72B6\u6001"
      },
      type: "string",
      role: "text",
      read: true,
      write: false
    }
  },
  "realtime.grid_on_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).grid_on_p
    },
    common: {
      name: {
        en: "Active Power to Grid",
        de: "Wirkleistung zum Netz",
        ru: "\u0410\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u0432 \u0441\u0435\u0442\u044C",
        pt: "Energia Ativa para Rede",
        nl: "Actief vermogen TO-net",
        fr: "Puissance active vers le r\xE9seau",
        it: "Potenza attiva alla rete",
        es: "Potencia activa a la red",
        pl: "Moc czynna do sieci",
        uk: "\u0410\u043A\u0442\u0438\u0432\u043D\u0430 \u043F\u043E\u0442\u0443\u0436\u043D\u0456\u0441\u0442\u044C \u0434\u043B\u044F \u043C\u0435\u0440\u0435\u0436\u0456",
        "zh-cn": "\u6709\u529F\u529F\u7387\u5E76\u7F51"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.grid_off_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).grid_off_p
    },
    common: {
      name: {
        en: "Active Power from Grid",
        de: "Wirkleistung aus dem Netz",
        ru: "\u0410\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u0438\u0437 \u0441\u0435\u0442\u0438",
        pt: "Pot\xEAncia Ativa da Rede",
        nl: "Actief vermogen van het net",
        fr: "Puissance active du r\xE9seau",
        it: "Potenza attiva dalla rete",
        es: "Energ\xEDa activa de la red",
        pl: "Moc czynna z sieci",
        uk: "\u0410\u043A\u0442\u0438\u0432\u043D\u0430 \u043F\u043E\u0442\u0443\u0436\u043D\u0456\u0441\u0442\u044C \u0437 \u043C\u0435\u0440\u0435\u0436\u0456",
        "zh-cn": "\u6765\u81EA\u7535\u7F51\u7684\u6709\u529F\u529F\u7387"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.soc": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).soc
    },
    common: {
      name: {
        en: "Battery SOC",
        de: "Batterie-Ladezustand",
        ru: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0437\u0430\u0440\u044F\u0434\u0430 \u0431\u0430\u0442\u0430\u0440\u0435\u0438",
        pt: "SOC da bateria",
        nl: "Batterij SOC",
        fr: "SOC de la batterie",
        it: "SOC della batteria",
        es: "SOC de la bater\xEDa",
        pl: "Stan baterii",
        uk: "\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457",
        "zh-cn": "\u7535\u6C60SOC"
      },
      type: "number",
      role: "value",
      read: true,
      write: false,
      unit: "%"
    }
  },
  "realtime.sys_bat_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sys_bat_p
    },
    common: {
      name: {
        en: "System Battery SOC",
        de: "Systemweiter Batterie-Ladezustand",
        ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0431\u0430\u0442\u0430\u0440\u0435\u044F SOC",
        pt: "SOC da bateria do sistema",
        nl: "Systeembatterij SOC",
        fr: "Syst\xE8me de surveillance de la batterie",
        it: "SOC della batteria di sistema",
        es: "SOC de la bater\xEDa del sistema",
        pl: "Stan akumulatora systemowego SOC",
        uk: "\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457 \u0441\u0438\u0441\u0442\u0435\u043C\u0438",
        "zh-cn": "\u7CFB\u7EDF\u7535\u6C60SOC"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.sys_grid_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sys_grid_p
    },
    common: {
      name: {
        en: "System Grid Power",
        de: "Systemnetzstrom",
        ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0441\u0435\u0442\u043A\u0430 \u043F\u0438\u0442\u0430\u043D\u0438\u044F",
        pt: "Sistema de energia da rede el\xE9trica",
        nl: "Systeemnetstroom",
        fr: "R\xE9seau \xE9lectrique du syst\xE8me",
        it: "Sistema di alimentazione della rete",
        es: "Energ\xEDa de la red del sistema",
        pl: "System zasilania sieciowego",
        uk: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430 \u043C\u0435\u0440\u0435\u0436\u0430 \u0436\u0438\u0432\u043B\u0435\u043D\u043D\u044F",
        "zh-cn": "\u7CFB\u7EDF\u7535\u7F51\u529F\u7387"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.sys_load_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sys_load_p
    },
    common: {
      name: {
        en: "System Load Power",
        de: "Systemlastleistung",
        ru: "\u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u044B",
        pt: "Pot\xEAncia de carga do sistema",
        nl: "Systeembelastingvermogen",
        fr: "Puissance de charge du syst\xE8me",
        it: "Potenza del carico del sistema",
        es: "Potencia de carga del sistema",
        pl: "Moc obci\u0105\u017Cenia systemu",
        uk: "\u041F\u043E\u0442\u0443\u0436\u043D\u0456\u0441\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0433\u043E \u043D\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F",
        "zh-cn": "\u7CFB\u7EDF\u8D1F\u8F7D\u529F\u7387"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.sys_plug_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sys_plug_p
    },
    common: {
      name: {
        en: "System Socket Power",
        de: "Systemsteckdosen-Leistung",
        ru: "\u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0439 \u0440\u043E\u0437\u0435\u0442\u043A\u0438",
        pt: "Sistema de alimenta\xE7\xE3o de soquete",
        nl: "Systeem Socket Power",
        fr: "Prise d'alimentation du syst\xE8me",
        it: "Presa di alimentazione del sistema",
        es: "Alimentaci\xF3n del z\xF3calo del sistema",
        pl: "Gniazdo zasilania systemu",
        uk: "\u0416\u0438\u0432\u043B\u0435\u043D\u043D\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0457 \u0440\u043E\u0437\u0435\u0442\u043A\u0438",
        "zh-cn": "\u7CFB\u7EDF\u63D2\u5EA7\u7535\u6E90"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.sys_pv_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sys_pv_p
    },
    common: {
      name: {
        en: "System Photovoltaic Power",
        de: "Photovoltaikleistung",
        ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0444\u043E\u0442\u043E\u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u044D\u043D\u0435\u0440\u0433\u0438\u0438",
        pt: "Sistema de Energia Fotovoltaica",
        nl: "Systeem Fotovolta\xEFsche Energie",
        fr: "Syst\xE8me d'\xE9nergie photovolta\xEFque",
        it: "Sistema di alimentazione fotovoltaica",
        es: "Sistema de energ\xEDa fotovoltaica",
        pl: "System zasilania fotowoltaicznego",
        uk: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430 \u0444\u043E\u0442\u043E\u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0430 \u0435\u043D\u0435\u0440\u0433\u0456\u044F",
        "zh-cn": "\u7CFB\u7EDF\u5149\u4F0F\u53D1\u7535"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "realtime.sys_soc": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sys_soc
    },
    common: {
      name: {
        en: "System battery SOC",
        de: "Systembatterie-SOC",
        ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0431\u0430\u0442\u0430\u0440\u0435\u044F SOC",
        pt: "Bateria do sistema SOC",
        nl: "Systeembatterij SOC",
        fr: "SOC de la batterie du syst\xE8me",
        it: "SOC della batteria di sistema",
        es: "SOC de la bater\xEDa del sistema",
        pl: "Stan baterii systemowej SOC",
        uk: "\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457 \u0441\u0438\u0441\u0442\u0435\u043C\u0438",
        "zh-cn": "\u7CFB\u7EDF\u7535\u6C60SOC"
      },
      type: "number",
      role: "value",
      read: true,
      write: false,
      unit: "%"
    }
  },
  "realtime.sys_sp_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/quick/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sys_sp_p
    },
    common: {
      name: {
        en: "System Smart Socket Power",
        de: "System Smart Socket Power",
        ru: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u0440\u043E\u0437\u0435\u0442\u043E\u043A Power",
        pt: "Sistema Smart Socket Power",
        nl: "Systeem Smart Socket Power",
        fr: "Syst\xE8me Smart Socket Power",
        it: "Sistema di alimentazione Smart Socket",
        es: "Sistema de alimentaci\xF3n de enchufe inteligente",
        pl: "System Smart Socket Power",
        uk: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0440\u043E\u0437\u0443\u043C\u043D\u043E\u0433\u043E \u0436\u0438\u0432\u043B\u0435\u043D\u043D\u044F \u0440\u043E\u0437\u0435\u0442\u043A\u0438",
        "zh-cn": "\u7CFB\u7EDF\u667A\u80FD\u63D2\u5EA7\u7535\u6E90"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "system.bat_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).bat_p
    },
    common: {
      name: {
        en: "Battery Power",
        de: "Batterieleistung",
        ru: "\u041C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0443\u043C\u0443\u043B\u044F\u0442\u043E\u0440\u0430",
        pt: "Energia da bateria",
        nl: "Batterijvoeding",
        fr: "Alimentation par batterie",
        it: "Potenza della batteria",
        es: "Energ\xEDa de la bater\xEDa",
        pl: "Moc baterii",
        uk: "\u0416\u0438\u0432\u043B\u0435\u043D\u043D\u044F \u0432\u0456\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457",
        "zh-cn": "\u7535\u6C60\u7535\u91CF"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "system.chg_e": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).chg_e
    },
    common: {
      name: {
        en: "Battery Charge (Today)\n",
        de: "Batterieladung (heute)\n",
        ru: "\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0438 (\u0441\u0435\u0433\u043E\u0434\u043D\u044F)\n",
        pt: "Carga da bateria (hoje)\n",
        nl: "Batterijlading (vandaag)\n",
        fr: "Charge de la batterie (aujourd'hui)\n",
        it: "Carica della batteria (oggi)\n",
        es: "Carga de la bater\xEDa (hoy)\n",
        pl: "\u0141adowanie baterii (dzisiaj)\n",
        uk: "\u0417\u0430\u0440\u044F\u0434 \u0430\u043A\u0443\u043C\u0443\u043B\u044F\u0442\u043E\u0440\u0430 (\u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456)\n",
        "zh-cn": "\u7535\u6C60\u7535\u91CF\uFF08\u4ECA\u65E5\uFF09\n"
      },
      type: "number",
      role: "value.energy.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "system.dchg_e": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).dchg_e
    },
    common: {
      name: {
        en: "Battery Decharge (Today)\n",
        de: "Batterieentladung (Heute)\n",
        ru: "\u0420\u0430\u0437\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0438 (\u0441\u0435\u0433\u043E\u0434\u043D\u044F)\n",
        pt: "Descarga da bateria (hoje)\n",
        nl: "Batterij ontladen (vandaag)\n",
        fr: "D\xE9charge de la batterie (aujourd'hui)\n",
        it: "Scarica della batteria (oggi)\n",
        es: "Descarga de la bater\xEDa (hoy)\n",
        pl: "Roz\u0142adowanie akumulatora (dzisiaj)\n",
        uk: "\u0420\u043E\u0437\u0440\u044F\u0434\u043A\u0430 \u0430\u043A\u0443\u043C\u0443\u043B\u044F\u0442\u043E\u0440\u0430 (\u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456)\n",
        "zh-cn": "\u7535\u6C60\u653E\u7535\uFF08\u4ECA\u5929\uFF09\n"
      },
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "system.grid_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).grid_p
    },
    common: {
      name: {
        en: "Grid Power",
        de: "Netzleistung",
        ru: "\u0421\u0435\u0442\u0435\u0432\u0430\u044F \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C",
        pt: "Energia da rede",
        nl: "Netstroom",
        fr: "R\xE9seau \xE9lectrique",
        it: "Potenza di rete",
        es: "Energ\xEDa de red",
        pl: "Moc sieciowa",
        uk: "\u0415\u043D\u0435\u0440\u0433\u0456\u044F \u043C\u0435\u0440\u0435\u0436\u0456",
        "zh-cn": "\u7535\u7F51\u7535\u529B"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "system.ems_mode": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).ems_mode
    },
    common: {
      name: {
        en: "EMS Mode",
        de: "EMS-Modus",
        ru: "\u0420\u0435\u0436\u0438\u043C EMS",
        pt: "Modo EMS",
        nl: "EMS-modus",
        fr: "Mode EMS",
        it: "Modalit\xE0 EMS",
        es: "Modo EMS",
        pl: "Tryb EMS",
        uk: "\u0420\u0435\u0436\u0438\u043C \u0435\u043A\u0441\u0442\u0440\u0435\u043D\u043E\u0457 \u043C\u0435\u0434\u0438\u0447\u043D\u043E\u0457 \u0434\u043E\u043F\u043E\u043C\u043E\u0433\u0438",
        "zh-cn": "EMS\u6A21\u5F0F"
      },
      type: "string",
      role: "state",
      read: true,
      write: false
    }
  },
  "system.plug_in_e": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).plug_in_e
    },
    common: {
      name: {
        en: "Grid-Socket Input-Energy (Today)",
        de: "Netz-Steckdosen-Eingangsenergie (Heute)",
        ru: "\u0412\u0445\u043E\u0434\u043D\u0430\u044F \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C \u0441\u0435\u0442\u0438-\u0440\u043E\u0437\u0435\u0442\u043A\u0438 (\u0441\u0435\u0433\u043E\u0434\u043D\u044F)",
        pt: "Entrada de energia na rede el\xE9trica (hoje)",
        nl: "Netstroom-ingangsenergie (vandaag)",
        fr: "\xC9nergie d'entr\xE9e du r\xE9seau (aujourd'hui)",
        it: "Energia in ingresso alla rete elettrica (oggi)",
        es: "Energ\xEDa de entrada de la toma de red (hoy)",
        pl: "Wej\u015Bcie-energia sieciowa-gniazdkowa (dzisiaj)",
        uk: "\u0412\u0445\u0456\u0434\u043D\u0430 \u0435\u043D\u0435\u0440\u0433\u0456\u044F \u0440\u043E\u0437\u0435\u0442\u043A\u0438 \u043C\u0435\u0440\u0435\u0436\u0456 (\u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456)",
        "zh-cn": "\u7535\u7F51\u63D2\u5EA7\u8F93\u5165\u80FD\u91CF\uFF08\u4ECA\u65E5\uFF09"
      },
      type: "number",
      role: "value.enery.consumed",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "system.plug_out_e": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).plug_out_e
    },
    common: {
      name: {
        en: "Grid-Socket Output-Energy (Today)",
        de: "Netz-Steckdosen-Ausgangsenergie (Heute)",
        ru: "\u0412\u044B\u0445\u043E\u0434 \u044D\u043D\u0435\u0440\u0433\u0438\u0438 \u0438\u0437 \u0441\u0435\u0442\u0438 (\u0441\u0435\u0433\u043E\u0434\u043D\u044F)",
        pt: "Sa\xEDda de energia da rede el\xE9trica (hoje)",
        nl: "Netstroom-energie (vandaag)",
        fr: "\xC9nergie de sortie du r\xE9seau (aujourd'hui)",
        it: "Energia in uscita dalla rete elettrica (oggi)",
        es: "Energ\xEDa de salida de la toma de red (hoy)",
        pl: "Wyj\u015Bcie sieciowe-energia (obecnie)",
        uk: "\u0412\u0438\u0445\u0456\u0434\u043D\u0430 \u0435\u043D\u0435\u0440\u0433\u0456\u044F \u0440\u043E\u0437\u0435\u0442\u043A\u0438 \u043C\u0435\u0440\u0435\u0436\u0456 (\u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456)",
        "zh-cn": "\u7535\u7F51\u63D2\u5EA7\u8F93\u51FA\u80FD\u91CF\uFF08\u4ECA\u65E5\uFF09"
      },
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "system.pv_e": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).pv_e
    },
    common: {
      name: {
        en: "Photovoltaic Energyproduction (Today)",
        de: "Photovoltaik-Energieerzeugung (heute)",
        ru: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0444\u043E\u0442\u043E\u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u044D\u043D\u0435\u0440\u0433\u0438\u0438 (\u0441\u0435\u0433\u043E\u0434\u043D\u044F)",
        pt: "Produ\xE7\xE3o de Energia Fotovoltaica (Hoje)",
        nl: "Fotovolta\xEFsche energieproductie (vandaag)",
        fr: "Production d'\xE9nergie photovolta\xEFque (aujourd'hui)",
        it: "Produzione di energia fotovoltaica (oggi)",
        es: "Producci\xF3n de energ\xEDa fotovoltaica (hoy)",
        pl: "Produkcja energii fotowoltaicznej (dzisiaj)",
        uk: "\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u0446\u0442\u0432\u043E \u0444\u043E\u0442\u043E\u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u043E\u0457 \u0435\u043D\u0435\u0440\u0433\u0456\u0457 (\u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456)",
        "zh-cn": "\u5149\u4F0F\u53D1\u7535\uFF08\u4ECA\u5929\uFF09"
      },
      type: "number",
      role: "value.energy.produced",
      read: true,
      write: false,
      unit: "Wh"
    }
  },
  "system.pv_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).pv_p
    },
    common: {
      name: {
        en: "Photovoltaic Power",
        de: "Photovoltaik Leistung",
        ru: "\u0424\u043E\u0442\u043E\u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u044D\u043D\u0435\u0440\u0433\u0438\u044F",
        pt: "Energia Fotovoltaica",
        nl: "Fotovolta\xEFsche energie",
        fr: "\xC9nergie photovolta\xEFque",
        it: "Energia fotovoltaica",
        es: "Energ\xEDa fotovoltaica",
        pl: "Energia fotowoltaiczna",
        uk: "\u0424\u043E\u0442\u043E\u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0430 \u0435\u043D\u0435\u0440\u0433\u0456\u044F",
        "zh-cn": "\u5149\u4F0F\u53D1\u7535"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  },
  "system.soc": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).soc
    },
    common: {
      name: {
        en: "Battery SOC",
        de: "Batterie-SOC",
        ru: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0437\u0430\u0440\u044F\u0434\u0430 \u0431\u0430\u0442\u0430\u0440\u0435\u0438",
        pt: "SOC da bateria",
        nl: "Batterij SOC",
        fr: "SOC de la batterie",
        it: "SOC della batteria",
        es: "SOC de la bater\xEDa",
        pl: "Stan baterii",
        uk: "\u0417\u0430\u0440\u044F\u0434 \u0431\u0430\u0442\u0430\u0440\u0435\u0457",
        "zh-cn": "\u7535\u6C60SOC"
      },
      type: "number",
      role: "value",
      read: true,
      write: false,
      unit: "%"
    }
  },
  "system.sp_p": {
    mqtt: {
      mqtt_publish: `homeassistant/sensor/<dev_id>/system/state`,
      mqtt_publish_funct: (value) => JSON.parse(value).sp_p
    },
    common: {
      name: {
        en: "Smart-Socket Power",
        de: "Smart-Socket Leistung",
        ru: "\u0423\u043C\u043D\u0430\u044F \u0440\u043E\u0437\u0435\u0442\u043A\u0430 Power",
        pt: "Energia Smart-Socket",
        nl: "Slimme stopcontactvoeding",
        fr: "Prise de courant intelligente",
        it: "Potenza della presa intelligente",
        es: "Alimentaci\xF3n mediante enchufe inteligente",
        pl: "Smart-Socket Power",
        uk: "\u0416\u0438\u0432\u043B\u0435\u043D\u043D\u044F \u0432\u0456\u0434 \u0441\u043C\u0430\u0440\u0442-\u0440\u043E\u0437\u0435\u0442\u043E\u043A",
        "zh-cn": "\u667A\u80FD\u63D2\u5EA7\u7535\u6E90"
      },
      type: "number",
      role: "value.power",
      read: true,
      write: false,
      unit: "W"
    }
  }
};
const devIdCache = {};
function filterDevId(devId) {
  return devId.replace(/[^a-zA-Z0-9-]/g, "_");
}
async function initStates(adapter, dev_id) {
  const deviceId = filterDevId(dev_id);
  if (devIdCache[deviceId]) {
    return;
  }
  adapter.log.debug(`initializing states for device ${dev_id}`);
  await adapter.extendObject(
    `${deviceId}`,
    {
      type: "device",
      common: {
        name: deviceId
        // statusStates: {
        //     onlineId: `${this.name}.${this.instance}.${deviceId}.info.online`,
        // },
      },
      native: {}
    },
    { preserve: { common: ["name"] } }
  );
  for (const channelKey in channelConfig) {
    const common = channelConfig[channelKey].common;
    common.name = utils.I18n.getTranslatedObject(`${channelKey}_name`);
    await adapter.extendObject(
      `${deviceId}.${channelKey}`,
      {
        type: "channel",
        common,
        native: {}
      },
      { preserve: { common: ["name"] } }
    );
  }
  for (const folderKey in folderConfig) {
    const common = folderConfig[folderKey].common;
    common.name = utils.I18n.getTranslatedObject(`${folderKey}_name`);
    await adapter.extendObject(
      `${deviceId}.${folderKey}`,
      {
        type: "folder",
        common,
        native: {}
      },
      { preserve: { common: ["name"] } }
    );
  }
  for (const stateKey in stateConfig) {
    const common = stateConfig[stateKey].common;
    common.name = utils.I18n.getTranslatedObject(`${stateKey}_name`);
    await adapter.extendObject(
      `${deviceId}.${stateKey}`,
      {
        type: "state",
        common,
        native: {}
      },
      { preserve: { common: ["name"] } }
    );
  }
  devIdCache[deviceId] = "X";
  adapter.log.debug(`initialization of states for device ${dev_id} completed`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filterDevId,
  initStates,
  stateConfig
});
//# sourceMappingURL=states.js.map
