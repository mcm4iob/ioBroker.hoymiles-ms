# Hoymiles MSA Micro Energy Storage MQTT Protocol Development Guide

### 1. Basic Configuration Information (Device Publishing)
*Note: Published immediately after device connection for device discovery*

**Topic:**
`homeassistant/switch/<dev_id>/config`

**Payload:**
```json
{
  "state_topic": "homeassistant/sensor/<dev_id>/device/state",
  "command_topic": "homeassistant/switch/<dev_id>/set",
  "json_attributes_topic": "homeassistant/sensor/<dev_id>/attributes",
  "unique_id": "<dev_id>",
  "device": {
    "identifiers": ["<id>"],
    "name": "<dev_id>",
    "manufacturer": "Hoymiles",
    "model": "MS-A2",
    "sw_version": "1.0.0"
  }
}
```

**QoS:**
`1`

**Retain:**
`true`

### 2. Basic Attribute Information (Device Publishing)
*Note: Published immediately after device connection for topic synchronization*

**Topic:**
`homeassistant/sensor/<dev_id>/attributes`

**Payload:**
```json
{
  "supported_topics": {
    "quick_state": "homeassistant/sensor/<dev_id>/quick/state",
    "device_state": "homeassistant/sensor/<dev_id>/device/state",
    "system_state": "homeassistant/sensor/<dev_id>/system/state",
    "switch_ctrl": "homeassistant/switch/<dev_id>/set",
    "ems_mode": "homeassistant/select/<dev_id>/ems_mode/command",
    "power_ctrl": "homeassistant/number/<dev_id>/power_ctrl/set",
    "tou_day_plan": "homeassistant/sensor/<dev_id>/tou_day_plan/set",
    "tou_week_plan": "homeassistant/sensor/<dev_id>/tou_week_plan/set",
    "tou_get": "homeassistant/sensor/<dev_id>/tou_plan/get"
  }
}
```

**QoS:**
`1`

**Retain:**
`true`

**Note:**  
`supported_topics`: Indicates the topics that the device supports publishing and subscribing to  
`quick_state`: Topic published by the device for fast update of device and system status  
`device_state`: Topic published by the device for scheduled update of device status  
`system_state`: Topic published by the device for scheduled update of system status  
`switch_ctrl`: Topic responded by the device for device on/off control  
`ems_mode`: Topic responded by the device for setting EMS mode  
`power_ctrl`: Topic responded by the device for power control  
`tou_day_plan`: Topic responded by the device for TOU daily plan configuration  
`tou_week_plan`: Topic responded by the device for TOU weekly plan configuration  
`tou_get`: Topic responded by the device for TOU plan retrieval  

### 3. EMS Mode Configuration (Device Publishing)
*Note: Published immediately after device connection to notify power control rules. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/select/<dev_id>/ems_mode/config`

**Payload:**
```json
{
  "command_topic": "homeassistant/select/<dev_id>/ems_mode/command",
  "options": ["general", "mqtt_ctrl", "tou_plan"],
  "unique_id": "<dev_id>",
  "device": {
    "identifiers": ["<id>"],
    "name": "<dev_id>",
    "manufacturer": "Hoymiles",
    "model": "MS-A2"
  }
}
```

**QoS:**
`1`

**Retain:**
`true`

**Note:**  
`options`: System EMS modes with the following definitions:  
&nbsp;&nbsp;`general`: Default mode. When enabled, the device performs energy management through inherent logic.  
&nbsp;&nbsp;`mqtt_ctrl`: When enabled, the device responds to MQTT commands to control power, and energy management can be performed via the `homeassistant/number/<dev_id>/power_ctrl/set` topic.  
&nbsp;&nbsp;`tou_plan`: When enabled, the device responds to TOU plan configurations, and TOU plans can be delivered via the `homeassistant/sensor/<dev_id>/tou_day_plan/set` and `homeassistant/sensor/<dev_id>/tou_week_plan/set` topics.  

### 4. Power Control Configuration (Device Publishing)
*Note: Published immediately after device connection to notify power control rules. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/number/<dev_id>/power_ctrl/config`

**Payload:**
```json
{
  "name": null,
  "command_topic": "homeassistant/number/<dev_id>/power_ctrl/set",
  "device_class": "power",
  "unit_of_measurement": "w",
  "min": -1000,
  "max": 1000,
  "step": 0.1,
  "unique_id": "<dev_id>",
  "device": {
    "identifiers": ["<id>"],
    "name": "<dev_id>",
    "manufacturer": "Hoymiles",
    "model": "MS-A2"
  }
}
```

**QoS:**
`1`

**Retain:**
`true`

### 5. SOC Information Display Configuration (Device Publishing)
*Note: Published immediately after device connection for SOC display configuration*

**Topic:**
`homeassistant/sensor/<dev_id>/soc/config`

**Payload:**
```json
{
  "name": "soc",
  "state_topic": "homeassistant/sensor/<dev_id>/quick/state",
  "value_template": "{{ value_json.soc }}",
  "device_class": "battery",
  "unit_of_measurement": "%",
  "device": {
    "identifiers": ["<id>"],
    "name": "<dev_id>",
    "manufacturer": "Hoymiles",
    "model": "MS-A2"
  }
}
```

**QoS:**
`1`

**Retain:**
`true`

### 6. Battery Charge/Discharge Power Display Configuration (Device Publishing)
*Note: Published immediately after device connection for power display configuration*

**Topic:**
`homeassistant/sensor/<dev_id>/bat_p/config`

**Payload:**
```json
{
  "name": "bat_power",
  "state_topic": "homeassistant/sensor/<dev_id>/quick/state",
  "value_template": "{{ value_json.bat_p }}",
  "device_class": "power",
  "unit_of_measurement": "W",
  "device": {
    "identifiers": ["<id>"],
    "name": "<dev_id>",
    "manufacturer": "Hoymiles",
    "model": "MS-A2"
  }
}
```

**QoS:**
`1`

**Retain:**
`true`

### 7. On/Off Control (Device Subscription) [Reserved Function]
*Note: Subscribed and responded by the device, not supported temporarily*

**Topic:**
`homeassistant/switch/<dev_id>/set`

**Payload:**
`ON`

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
The payload can be set to `ON` or `OFF`.

### 8. EMS Mode (Device Subscription)
*Note: Subscribed and responded by the device. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/select/<dev_id>/ems_mode/command`

**Payload:**
`mqtt_ctrl`

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
The payload types are as defined in the `options` of the `homeassistant/select/<dev_id>/ems_mode/config` topic.  

### 9. Power Control (Device Subscription)
*Note: Subscribed and responded by the device. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/number/<dev_id>/power_ctrl/set`

**Payload:**
`80.0`

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
This function takes effect only after setting the mode to `mqtt_ctrl` via the `homeassistant/select/<dev_id>/ems_mode/command` topic.  
The payload range is as defined in the `min` and `max` of the `homeassistant/number/<dev_id>/power_ctrl/config` topic.  
This topic needs to be published periodically with an interval of no less than 1 minute; otherwise, the device will automatically switch to self-consumption mode.  

### 10. TOU Daily Plan Configuration (Device Subscription)
*Note: Subscribed and responded by the device. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/sensor/<dev_id>/tou_day_plan/set`

**Payload:**
```json
{
  "day_idx": 1,
  "day_plan": [
    {
      "mode": 1,
      "ts": 0,
      "te": 5,
      "sh": 55,
      "sl": 10,
      "pc": 1000,
      "pd": 1000
    },
    {
      "mode": 4,
      "ts": 5,
      "te": 96,
      "sh": 55,
      "sl": 10,
      "pc": 1000,
      "pd": 1000
    }
  ]
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
This function takes effect only after setting the mode to `tou_plan` via the `homeassistant/select/<dev_id>/ems_mode/command` topic.  
Only one daily plan can be delivered at a time; wait for the device to send an acknowledgment via the `homeassistant/sensor/<dev_id>/tou_day_plan/ack` topic before delivering the next daily plan.  
Different daily plans are distinguished by `day_idx`. Delivering a daily plan without a weekly plan will prevent the normal execution of TOU.  
`day_idx`: Current daily plan index. Different daily plans have different indices, with a maximum of 8 daily plans allowed (value range: [1, 8])  
`day_plan`: Detailed daily plan, supporting up to 12 time periods per day.  
`mode`: Working mode during the current time period (`1`: Forced charging, ignores `sl` and `pd` fields in this mode; `2`: PV charging, ignores `sl`, `pc`, and `pd` fields in this mode; `4`: Discharging, ignores `sh` and `pc` fields in this mode)  
`ts`: Start time of the current time period (minimum unit: 15 minutes, value range: [0, 96]). For example: `0` means `00:00:00`, `5` means `01:15:00`, `96` means `24:00:00`  
`te`: End time of the current time period (minimum unit: 15 minutes, value range: [0, 96]). For example: `0` means `00:00:00`, `5` means `01:15:00`, `96` means `24:00:00`  
`sh`: Charging cut-off SOC for the current time period (minimum unit: 1%, value range: [10, 100])  
`sl`: Discharging cut-off SOC for the current time period (minimum unit: 1%, value range: [10, 100])  
`pc`: Charging power limit for the current time period (minimum unit: 1W, value range: [100, number of micro energy storage devices in the system × 1000])  
`pd`: Discharging power limit for the current time period (minimum unit: 1W, value range: [100, number of micro energy storage devices in the system × 1000])  

### 11. TOU Daily Plan Configuration Acknowledgment (Device Publishing)

**Topic:**
`homeassistant/sensor/<dev_id>/tou_day_plan/ack`

**Payload:**
```json
{
  "status": 0,
  "err_msg": "success"
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
`status`: Configuration result of `homeassistant/sensor/<dev_id>/tou_day_plan/set`, with the following return values:  
&nbsp;&nbsp;`0`: Configuration successful  
&nbsp;&nbsp;`1`: General configuration error  
&nbsp;&nbsp;`2`: Exceeds 12 time periods  
&nbsp;&nbsp;`3`: Time periods overlap  
&nbsp;&nbsp;`4`: `mode` out of value range  
&nbsp;&nbsp;`5`: `ts`/`te` out of value range  
&nbsp;&nbsp;`6`: `sh`/`sl` out of value range  
&nbsp;&nbsp;`7`: `pc`/`pd` out of value range  
&nbsp;&nbsp;`8`: `day_idx` out of value range  
&nbsp;&nbsp;`9`: `ts` greater than `te`  
&nbsp;&nbsp;`10`: `tou_plan` not set  
`err_msg`: Error message prompt  

### 12. TOU Weekly Plan Configuration (Device Subscription)
*Note: Subscribed and responded by the device. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/sensor/<dev_id>/tou_week_plan/set`

**Payload:**
```json
{
  "week_plan": [
    {
      "week": ["Mon", "Tue", "Wed"],
      "day_idx": 1
    },
    {
      "week": ["Thu", "Fri", "Sat", "Sun"],
      "day_idx": 2
    }
  ]
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
This function takes effect only after setting the mode to `tou_plan` via the `homeassistant/select/<dev_id>/ems_mode/command` topic.  
Time periods not set in the daily plan and dates without a corresponding daily plan will operate in the default self-consumption mode. The device starts executing TOU normally after the weekly plan is delivered.  
`week`: Dates corresponding to the current daily plan, supporting one daily plan for multiple dates (`Mon`: Monday; `Tue`: Tuesday; `Wed`: Wednesday; `Thu`: Thursday; `Fri`: Friday; `Sat`: Saturday; `Sun`: Sunday)  
`day_idx`: Daily plan index, which must be delivered first via `homeassistant/sensor/<dev_id>/tou_day_plan/set` and kept consistent  

### 13. TOU Weekly Plan Configuration Acknowledgment (Device Publishing)

**Topic:**
`homeassistant/sensor/<dev_id>/tou_week_plan/ack`

**Payload:**
```json
{
  "status": 0,
  "err_msg": "success"
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
`status`: Configuration result of `homeassistant/sensor/<dev_id>/tou_week_plan/set`, with the following return values:  
&nbsp;&nbsp;`0`: Configuration successful  
&nbsp;&nbsp;`1`: General configuration error  
&nbsp;&nbsp;`2`: `week` out of value range  
&nbsp;&nbsp;`3`: `week` overlap  
&nbsp;&nbsp;`4`: `day_idx` out of value range  
&nbsp;&nbsp;`5`: `day_idx` not configured  
&nbsp;&nbsp;`6`: `tou_plan` not set  
`err_msg`: Error message prompt  

### 14. TOU Plan Retrieval (Device Subscription)
*Note: Subscribed and responded by the device. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/sensor/<dev_id>/tou_plan/get`

**Payload:**
```json
{
  "week": "Mon"
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
This function takes effect only after setting the mode to `tou_plan` via the `homeassistant/select/<dev_id>/ems_mode/command` topic.  
Only the daily plan for one date can be retrieved at a time; wait for the device to send a response via the `homeassistant/sensor/<dev_id>/tou_plan/status` topic before retrieving the daily plan for the next date.  
`week`: Date to retrieve (`Mon`: Monday; `Tue`: Tuesday; `Wed`: Wednesday; `Thu`: Thursday; `Fri`: Friday; `Sat`: Saturday; `Sun`: Sunday)  

### 15. TOU Plan Status (Device Publishing)

**Topic:**
`homeassistant/sensor/<dev_id>/tou_plan/status`

**Payload:**
```json
{
  "week": "Mon",
  "day_idx": 1,
  "day_plan": [
    {
      "mode": 1,
      "ts": 0,
      "te": 5,
      "sh": 55,
      "sl": 10,
      "pc": 1000,
      "pd": 1000
    },
    {
      "mode": 4,
      "ts": 5,
      "te": 96,
      "sh": 55,
      "sl": 10,
      "pc": 1000,
      "pd": 1000
    }
  ],
  "status": 0,
  "err_msg": "success"
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
`week`: Date queried via `homeassistant/sensor/<dev_id>/tou_plan/get`  
`day_idx`: Daily plan index for the current date  
`day_plan`: Detailed daily plan for the current date, with parameter definitions consistent with `homeassistant/sensor/<dev_id>/tou_day_plan/set`  
`status`: Retrieval result of `homeassistant/sensor/<dev_id>/tou_plan/get`, with the following return values:  
&nbsp;&nbsp;`0`: Retrieval successful  
&nbsp;&nbsp;`1`: General configuration error  
&nbsp;&nbsp;`2`: `week` out of value range  
When `status` is non-0, the message does not contain the `week`, `day_idx`, and `day_plan` fields  
`err_msg`: Error message prompt  

### 16. Second-Level Data (Device Publishing)
*Note: Published by the device every 1 second, including device and system data*

**Topic:**
`homeassistant/sensor/<dev_id>/quick/state`

**Payload:**
```json
{
  "grid_on_p": 0.1,
  "grid_off_p": 0.1,
  "bat_sts": "standby",
  "bat_p": 0.1,
  "soc": 0.01,
  "heat": true,
  "sys_pv_p": 0.1,
  "sys_plug_p": 0.1,
  "sys_bat_p": 0.1,
  "sys_grid_p": 0.1,
  "sys_load_p": 0.1,
  "sys_sp_p": 0.1,
  "sys_soc": 0.01,
  "sys_heat": true,
  "sys_pv2_p": 0.1,
  "sys_eps_p": 0.1
}
```

**QoS:**
`0`

**Retain:**
`false`

**Note:**  
`grid_on_p`: Active power of the device's grid-connected port (minimum unit: 0.1W)  
`grid_off_p`: Active power of the device's off-grid port (minimum unit: 0.1W)  
`bat_sts`: Device battery status (`standby`: Standby; `charge`: Charging; `discharge`: Discharging; `lock`: Locked)  
`bat_p`: Device battery power (minimum unit: 0.1W)  
`soc`: Device remaining capacity (minimum unit: 0.01%)  
`heat`: Device heating status (`true`: Heating; `false`: Not heating)  
`sys_pv_p`: System off-grid micro-inverter PV power (minimum unit: 0.1W)  
`sys_plug_p`: System socket power (minimum unit: 0.1W)  
`sys_bat_p`: System battery power (minimum unit: 0.1W)  
`sys_grid_p`: System grid power (minimum unit: 0.1W)  
`sys_load_p`: System load power (minimum unit: 0.1W)  
`sys_sp_p`: System smart socket power (minimum unit: 0.1W)  
`sys_soc`: System battery capacity (minimum unit: 0.01%)  
`sys_heat`: System heating status (`true`: Heating; `false`: Not heating)  
`sys_pv2_p`: System grid-connected micro-inverter PV power (minimum unit: 0.1W)  
`sys_eps_p`: Active power output from the system's off-grid port (minimum unit: 0.1W)  

### 17. Device Real-Time Data (Device Publishing)
*Note: Published by the device every 5 minutes*

**Topic:**
`homeassistant/sensor/<dev_id>/device/state`

**Payload:**
```json
{
  "grid": [
    {
      "type": "grid_on",
      "v": 0.1,
      "i": 0.01,
      "f": 0.01,
      "p": 0.1,
      "q": 0.1,
      "ein": 1,
      "eout": 1,
      "etin": 1,
      "etout": 1
    },
    {
      "type": "grid_off",
      "v": 0.1,
      "i": 0.01,
      "f": 0.01,
      "p": 0.1,
      "q": 0.1,
      "ein": 1,
      "eout": 1,
      "etin": 1,
      "etout": 1
    },
    {
      "type": "inv",
      "v": 0.1,
      "i": 0.01,
      "p": 0.1,
      "q": 0.1,
      "ein": 1,
      "eout": 1,
      "etin": 1,
      "etout": 1
    }
  ],
  "bat_sts": "standby",
  "bat_v": 0.01,
  "bat_i": 0.01,
  "bat_p": 0.1,
  "bat_temp": 0.1,
  "soc": 0.01,
  "rssi": -10
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
`type`: Device port type (`grid_on`: Grid-connected port; `grid_off`: Off-grid port; `inv`: Inverter port)  
`v`: Device port voltage (minimum unit: 0.1V)  
`i`: Device port current (minimum unit: 0.01A)  
`f`: Device port frequency (minimum unit: 0.01Hz)  
`p`: Device port active power (minimum unit: 0.1W)  
`q`: Device port reactive power (minimum unit: 0.1VAR)  
`ein`: Daily input energy of the device port (minimum unit: 1Wh)  
`eout`: Daily output energy of the device port (minimum unit: 1Wh)  
`etin`: Cumulative historical input energy of the device port (minimum unit: 1Wh)  
`etout`: Cumulative historical output energy of the device port (minimum unit: 1Wh)  
`bat_sts`: Device battery status (`standby`: Standby; `charge`: Charging; `discharge`: Discharging; `lock`: Locked)  
`bat_v`: Device battery voltage (minimum unit: 0.01V)  
`bat_i`: Device battery current (minimum unit: 0.01A)  
`bat_p`: Device battery power (minimum unit: 0.1W)  
`bat_temp`: Device battery temperature (minimum unit: 0.1℃)  
`soc`: Device remaining capacity (minimum unit: 0.01%)  
`rssi`: Device signal strength (minimum unit: 1dBm)  

### 18. System Real-Time Data (Device Publishing)
*Note: Published by the device every 5 minutes. This topic is only supported by the master unit and standalone units.*

**Topic:**
`homeassistant/sensor/<dev_id>/system/state`

**Payload:**
```json
{
  "pv_p": 0.1,
  "pv2_p": 0.1,
  "plug_p": 0.1,
  "bat_p": 0.1,
  "grid_p": 0.1,
  "load_p": 0.1,
  "sp_p": 0.1,
  "eps_p": 0.1,
  "soc": 0.01,
  "pv_e": 1,
  "pv2_e": 1,
  "dchg_e": 1,
  "chg_e": 1,
  "plug_out_e": 1,
  "plug_in_e": 1,
  "ems_mode": "general"
}
```

**QoS:**
`1`

**Retain:**
`false`

**Note:**  
`pv_p`: System off-grid micro-inverter PV power (minimum unit: 0.1W)  
`pv2_p`: System grid-connected micro-inverter PV power (minimum unit: 0.1W)  
`plug_p`: System socket power (minimum unit: 0.1W)  
`bat_p`: System battery power (minimum unit: 0.1W)  
`grid_p`: System grid power (minimum unit: 0.1W)  
`load_p`: System load power (minimum unit: 0.1W)  
`sp_p`: System smart socket power (minimum unit: 0.1W)  
`eps_p`: System off-grid port output power (minimum unit: 0.1W)  
`soc`: System battery capacity (minimum unit: 0.01%)  
`pv_e`: Daily off-grid micro-inverter PV generation of the system (minimum unit: 1Wh)  
`pv2_e`: Daily grid-connected micro-inverter PV generation of the system (minimum unit: 1Wh)  
`dchg_e`: Daily battery discharge energy of the system (minimum unit: 1Wh)  
`chg_e`: Daily battery charge energy of the system (minimum unit: 1Wh)  
`plug_out_e`: Daily grid-connected socket output energy of the system (minimum unit: 1Wh)  
`plug_in_e`: Daily grid-connected socket input energy of the system (minimum unit: 1Wh)  
`ems_mode`: Current EMS mode of the system (`general`: Device controls power by itself; `mqtt_ctrl`: Power controlled by MQTT commands; `tou_plan`: TOU plan)
