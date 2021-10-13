---
title: Runo 的 DTU 指令文档
date: 2021-10-12 16:54:52
tags:
  - IOT
categories:
  - IOT
---

# 获取/上报类指令

### 获取服务器地址 (请求/响应)

```JavaScript
{
  cmd: '获取服务器地址', // 指令 (String)
  data: {}, // 数据
}
```

```JavaScript
{
  cmd: '获取服务器地址', // 指令 (String)
  data: {
    host: 'localhost', // 服务器域名或IP
    port: 23333, // 服务器端口
  },
}
```

### 获取设备信息 (请求/响应)

```JavaScript
{
  cmd: '获取设备信息', // 指令 (String)
  data: {}, // 数据
}
```

```JavaScript
{
  cmd: '获取设备信息', // 指令 (String)
  data: {
    // 指令数据
    id: '1aa169628add4c1e965f5bc69e2e9dbb', // 设备唯一ID (String)
    version: 1, // 固件版本 (Number)
  },
}
```

### 获取设备上报间隔 (请求/响应)

```JavaScript
{
  cmd: '获取设备上报间隔',
  data: {},
}
```

```JavaScript
{
  cmd: '获取设备上报间隔',
  data: {
    // 上报间隔 ({})
    heartbeatInterval: 5000, // 心跳上报间隔 (Number)
    dataInterval: 10000, // 数据上报间隔 (Number)
    uartInterval: 1000, // 串口发送指令间隔 (Number)
    alarmInterval: 0, // 告警/火警上报间隔 (Number)
  },
}
```

### 获取设备协议配置 (请求/响应)

```JavaScript
{
  cmd: '获取设备协议配置',
  data: {},
}
```

```JavaScript
{
  cmd: '获取设备协议配置',
  data: {
    type: 'modbus', // 协议类型 ('modbus' || 'gb26875')
    subtype: '源诚消防水源水压监测设备', // 协议子类型 (String)
  },
}
```

### 获取设备告警阈值 (请求/响应)

```JavaScript
{
  cmd: '获取设备告警阈值',
  data: {},
}
```

```JavaScript
{
  cmd: '获取设备告警阈值',
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

### 获取设备数据 (请求/响应)

```JavaScript
{
  cmd: '获取设备数据',
  data: {},
}
```

```JavaScript
{
  cmd: '获取设备数据',
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

### 上报设备数据 (响应)

```JavaScript
{
  cmd: '上报设备数据',
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

### 获取 modbus 协议子类型 (请求/响应)

```JavaScript
{
  cmd: '获取modbus协议子类型',
  data: {},
}
```

```JavaScript
{
  cmd: '获取modbus协议子类型',
  data: {
    modbusSubtypes: [
      // modbus 协议的子类型列表 ({}[])
      {
        name: '源诚消防水源水压监测设备', // 子协议名称
        version: 1, // 子协议版本
      },
    ],
  },
}
```

### 获取 gb26875 协议子类型 (请求/响应)

```JavaScript
{
  cmd: '获取gb26875协议子类型',
  data: {},
}
```

```JavaScript
{
  cmd: '获取gb26875协议子类型',
  data: {
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

# 写入/删除类指令

### 写入服务器地址 (请求/响应)

```JavaScript
{
  cmd: '写入服务器地址', // 指令 (String)
  data: {
    host: 'localhost', // 服务器域名或IP
    port: 23333, // 服务器端口
  },
}
```

```JavaScript
{
  cmd: '写入服务器地址', // 指令 (String)
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入设备信息 (请求/响应)

```JavaScript
{
  cmd: '写入设备信息',
  data: {
    version: 1, // 固件版本 (Number)
  },
}
```

```JavaScript
{
  cmd: '写入设备信息',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入设备上报间隔 (请求/响应)

```JavaScript
{
  cmd: '写入设备上报间隔',
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
  cmd: '写入设备上报间隔',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入设备协议设置 (请求/响应)

```JavaScript
{
  cmd: '写入设备协议设置',
  data: {
    type: 'modbus', // 协议类型 ('modbus' || 'gb26875')
    subtype: '源诚消防水源水压监测设备', // 协议子类型 (String)
  },
}
```

```JavaScript
{
  cmd: '写入设备协议配置',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入设备告警阈值 (请求/响应)

```JavaScript
{
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
  cmd: '写入设备告警阈值',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入 modbus 协议子类型 (请求/响应)

```JavaScript
{
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
              {
                range: [1, 1],
                value: 'Kpa',
              },
              {
                range: [2, 2],
                value: 'Pa',
              },
              {
                range: [3, 3],
                value: 'Bar',
              },
              {
                range: [4, 4],
                value: 'Mbar',
              },
              {
                range: [5, 5],
                value: 'kg/cm²',
              },
              {
                range: [6, 6],
                value: 'psi',
              },
              {
                range: [7, 7],
                value: 'mh²o',
              },
              {
                range: [8, 8],
                value: 'mmh²o',
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
              {
                range: [2, 2],
                value: 0.01,
              },
              {
                range: [3, 3],
                value: 0.001,
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
  cmd: '写入modbus子类型',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 写入监听设备数据日志状态 (请求/响应)

```JavaScript
{
  cmd: '写入监听设备数据日志状态',
  data: {
    listening: true, // 是否监听设备数据日志 (Boolean)
  },
}
```

```JavaScript
{
  cmd: '写入监听设备数据日志状态',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

# 系统类指令

### 心跳 (响应)

```JavaScript
{
  cmd: '心跳',
  data: {},
}
```

### 答应 (请求)

```JavaScript
{
  cmd: '答应',
  data: {
    serialNumber: 0 // 流水编号 (Number)
  },
}
```

### 发送数据到设备 (请求/响应)

```JavaScript
{
  cmd: '发送数据到设备',
  data: {
    bytes: [1, 3, 0, 0, 0, 0, 0, 0], // 发送给设备的数据
  },
}
```

```JavaScript
{
  cmd: '发送数据到设备',
  data: {
    result: 1, // 指令执行结果 (1 = 成功 || 0 = 失败 || 其他)
  },
}
```

### 设备数据日志 (响应)

```JavaScript
{
  cmd: '设备数据日志',
  data: {
    time: 233, // 设备本地时间戳
    bytes: [1, 3, 0, 0, 0, 0, 0, 0], // 设备实时回传原始数据
  },
}
```

# 错误类指令

### 指令错误 (响应)

```JavaScript
{
  cmd: '指令错误',
  data: {
    message: '指令错误' // 错误消息
  },
}
```
