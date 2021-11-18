---
title: Runo 的 DTU 指令文档
date: 2021-10-12 16:54:52
tags:
  - IOT
categories:
  - IOT
---

# 获取/上报类指令

### 获取配置 (请求/响应)

```JavaScript
{
  serialNumber: 1, // 流水号
  cmd: '获取配置', // 指令 (String)
  data: {}, // 数据
}
```

```JavaScript
{
  requestNumber: 1, // 请求流水号
  cmd: '获取配置', // 指令 (String)
  data: {
    id: '1aa169628add4c1e965f5bc69e2e9dbb', // 设备唯一ID (String)
    version: 1, // 固件版本 (Number)
    server: [
      {
        host: 'localhost', // 服务器域名或IP
        port: 23333, // 服务器端口
      }
    ],
    interval: {
      heartbeatInterval: 5000, // 心跳上报间隔 (Number)
      dataInterval: 10000, // 数据上报间隔 (Number)
      uartInterval: 1000, // 串口发送指令间隔 (Number) 子协议类型中的 getDataCommand 为空字符串时此项无效
      alarmInterval: 0, // 告警/火警上报间隔 (Number)
    },
    protocol: {
      type: 'modbus', // 协议类型 ('modbus' || 'gb26875')
      subtype: '源诚消防水源水压监测设备', // 协议子类型 (String)
    },
    alarmValues: [
      // 告警阈值, 为空数组时代表不会产生告警 ({}[])
      {
        key: '压力', // 字段名称 (String)
        alarmType: 'alarm', // 告警类型 ('fireAlarm' | 'alarm' | 'operate')
        alarmRawRanges: [
          // 触发告警范围值, 范围值是原始值, 结束范围可空 ([开始, 结束?])
          [0, 5],
          [20],
        ],
        filters: [
          // 条件过滤器 ({}[])
          {
            key: '单位', // 条件字段名称 (String)
            rawRanges: [
              // 达成条件范围值, 范围值是原始值, 结束范围可空 ([开始, 结束?])
              [4, 4],
            ],
          },
        ],
      },
    ],
    modbusSubtypes: [
      // modbus 协议的子类型列表 ({}[])
      {
        name: '源诚消防水源水压监测设备', // 子协议名称
        version: 1, // 子协议版本
      },
    ],
    gb26875Subtypes: [
      // gb26875 协议的子类型列表 ({}[])
      {
        name: '默认', // 子协议名称
        version: 1, // 子协议版本
      },
    ],
  },
}
```

### 获取 modbus 协议子类型 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '获取modbus协议子类型',
  data: {
    name: '源诚消防水源水压监测设备', // 子协议名称
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '获取modbus协议子类型',
  data: {
    name: '源诚消防水源水压监测设备', // 子协议名称
    version: 1, // 子协议版本
    commands: [
      // 子协议指令
      {
        name: '获取数据', // 指令名称 (String)
        data: [1, 3, 0, 0, 0, 5, 133, 201], // 指令内容 (Number[])
      },
    ],
    getDataCommand: '获取数据', // 用于获取数据的指令, 空字符串则不主动发送指令 (String)
    keys: [
      // 解析 ({}[])
      {
        key: '单位', // 字段名称 (String)
        position: [4, 5], // 解析时, 此字段在 MODBUS 数据中的下标, 从0开始 (Number)
        high: true, // 是否高字节在前
        switch: [
          // 转换器 ({}[])
          {
            range: [0, 0], // 用数组表示范围 [开始, 结束] ([Number, Number])
            value: 'Mpa', // 转换的值 (String || Number)
          },
        ],
      },
      {
        key: '小数点',
        position: [6, 7],
        high: true,
        switch: [
          {
            range: [1, 1],
            value: 0.1,
          },
        ],
      },
      {
        key: '压力',
        position: [8, 9],
        high: true,
        switch: [],
      },
    ],
  },
}
```

### 获取 gb26875 协议子类型 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '获取gb26875协议子类型',
  data: {
    name: '默认', // 子协议名称
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '获取gb26875协议子类型',
  data: {
    // GB26875协议的子类型, 此协议解析较为复杂, 只能通过更新固件的方式添加新子类型 (String[])
    name: '默认', // 子协议名称
    version: 1, // 子协议版本
    commands: [
      // 子协议指令
      {
        name: '获取数据', // 指令名称 (String)
        data: [233, 332], // 指令内容 (Number[])
      },
    ],
    getDataCommand: '获取数据', // 用于获取数据的指令, 空字符串则不主动发送指令 (String)
  },
}
```

### 获取数据 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '获取数据',
  data: {},
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '获取数据',
  data: {
    raw: [0, 1, 2, 3], // 原始数据 (Number[])
    parsed: {
      // 解析数据 ({})
      数据单元类型: '上传建筑消防设施系统配置情况',
      系统类型: '火灾报警系统',
      系统地址: 0,
      系统说明长度: 0,
      系统配置说明: '系统配置说明',
      时间: '2021-10-12 15:43:00',
    }
  },
}
```

### 上报数据 (响应)

```JavaScript
{
  cmd: '上报数据',
  data: {
    raw: [0, 1, 2, 3], // 原始数据 (Number[])
    parsed: {
      // 解析数据 ({})
      数据单元类型: '上传建筑消防设施系统配置情况',
      系统类型: '火灾报警系统',
      系统地址: 0,
      系统说明长度: 0,
      系统配置说明: '系统配置说明',
      时间: '2021-10-12 15:43:00',
    }
  },
}
```

### 上报告警/火警数据 (响应)

```JavaScript
{
  cmd: '上报告警/火警数据',
  data: {
    raw: [0, 1, 2, 3], // 原始数据
    parsed: {
      // 解析数据 ({})
      数据单元类型: '上传建筑消防设施系统配置情况',
      系统类型: '火灾报警系统',
      系统地址: 0,
      系统说明长度: 0,
      系统配置说明: '系统配置说明',
      时间: '2021-10-12 15:43:00',
    },
    alarms: [
      // 告警数组 ({}[])
      {
        key: '压力', // 字段名称 (String)
        alarmType: 'alarm', // 告警类型 ('fireAlarm' | 'alarm' | 'operate')
        alarmRawRanges: [
          // 触发告警范围值, 范围值是原始值, 结束范围可空 ([开始, 结束?])
          [0, 5],
          [20],
        ],
        filters: [
          // 条件过滤器 ({}[])
          {
            key: '单位', // 条件字段名称 (String)
            rawRanges: [
              // 达成条件范围值, 范围值是原始值, 结束范围可空 ([开始, 结束?])
              [4, 4],
            ],
          },
        ],
      },
    ]
  },
}
```

# 写入/删除类指令

### 写入服务器地址 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '写入服务器地址', // 指令 (String)
  data: {
    host: 'localhost', // 服务器域名或IP
    port: 23333, // 服务器端口
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '写入服务器地址', // 指令 (String)
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入上报间隔 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '写入上报间隔',
  data: {
    heartbeatInterval: 5000, // 心跳上报间隔 (Number)
    dataInterval: 10000, // 数据上报间隔 (Number)
    uartInterval: 1000, // 串口发送指令间隔 (Number)
    alarmInterval: 0, // 告警/火警上报间隔 (Number)
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '写入上报间隔',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入协议设置 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '写入协议设置',
  data: {
    type: 'modbus', // 协议类型 ('modbus' || 'gb26875')
    subtype: '源诚消防水源水压监测设备', // 协议子类型 (String)
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '写入协议配置',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入设备告警阈值 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '写入设备告警阈值',
  data: {
    alarmValues: [
      // 告警阈值, 为空数组时代表不会产生告警 ({}[])
      {
        key: '压力', // 字段名称 (String)
        alarmType: 'alarm', // 告警类型 ('fireAlarm' | 'alarm' | 'operate')
        alarmRawRanges: [
          // 触发告警范围值, 范围值是原始值, 结束范围可空 ([开始, 结束?])
          [0, 5],
          [20],
        ],
        filters: [
          // 条件过滤器 ({}[])
          {
            key: '单位', // 条件字段名称 (String)
            rawRanges: [
              // 达成条件范围值, 范围值是原始值, 结束范围可空 ([开始, 结束?])
              [4, 4],
            ],
          },
        ],
      },
    ],
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '写入设备告警阈值',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入 modbus 协议子类型 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '写入modbus协议子类型',
  data: {
    subtypes: [
      // 需要写入的 modbus 协议子类型 ({}[])
      {
        name: '源诚消防水源水压监测设备', // 子协议名称
        version: 1, // 子协议版本
        commands: [
          // 子协议指令
          {
            name: '获取数据', // 指令名称 (String)
            data: [1, 3, 0, 0, 0, 5, 133, 201], // 指令内容 (Number[])
          },
        ],
        getDataCommand: '获取数据', // 用于获取数据的指令, 空字符串则不启用自动数据上报功能 (String)
        keys: [
          // 解析 ({}[])
          {
            key: '单位', // 字段名称 (String)
            position: [4, 5], // 解析时, 此字段在 MODBUS 数据中的下标, 从0开始 (Number)
            high: true,
            switch: [
              // 转换器 ({}[])
              {
                range: [0, 0], // 用数组表示范围 [开始, 结束] ([Number, Number])
                value: 'Mpa', // 转换的值 (String || Number)
              },
            ],
          },
          {
            key: '小数点',
            position: [6, 7],
            high: true,
            switch: [
              {
                range: [1, 1],
                value: 0.1,
              },
            ],
          },
          {
            key: '压力',
            position: [8, 9],
            high: true,
            switch: [],
          },
        ],
      }
    ]
  }
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '写入modbus子类型',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入监听设备数据日志状态 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '写入监听设备数据日志状态',
  data: {
    listening: true, // 是否监听设备数据日志 (Boolean)
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '写入监听设备数据日志状态',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

# 系统类指令

### 确认 (请求)

```JavaScript
{
  cmd: '确认',
  data: {
    serialNumber: 0 // 流水编号 (Number)
  },
}
```

### 发送数据到串口 (请求/响应)

```JavaScript
{
  serialNumber: 1,
  cmd: '发送数据到串口',
  data: {
    bytes: [1, 3, 0, 0, 0, 0, 0, 0], // 发送给设备串口的数据
  },
}
```

```JavaScript
{
  requestNumber: 1,
  cmd: '发送数据到串口',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 设备串口数据上报 (响应)

```JavaScript
{
  cmd: '设备串口数据上报',
  data: {
    bytes: [1, 3, 0, 0, 0, 0, 0, 0], // 设备实时回传原始数据
  },
}
```

# 错误类指令

### 指令错误 (响应)

```JavaScript
{
  requestNumber: 1,
  cmd: '指令错误',
  data: {
    message: '指令错误' // 错误消息
  },
}
```
