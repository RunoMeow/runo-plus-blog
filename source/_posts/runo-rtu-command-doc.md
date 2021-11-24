---
title: Azure HaaS RTU V1 command document
date: 2021-11-18 20:45:59
tags:
  - IOT
categories:
  - IOT
---

# 请求与响应

### 请求

```JavaScript
{
  command: 'ping', // 请求指令 (String)
  data: {}, // 请求数据 (根据 command(指令) 不同而不同)
}
```

### 响应

```JavaScript
{
  statusCode: 200, // 响应状态码 200 为成功 (200 成功 | 400 指令错误 | 404 指令不存在 | 408 超时 | 500 设备错误) (Number)
  message: '操作成功!', // 成功或失败信息 (String)
  data: {}, // 响应数据 (根据 command(指令) 不同而不同)
}
```

# 指令

### Ping

```JavaScript
{
  command: 'ping',
  data: {},
}
```

```JavaScript
{
  statusCode: 200,
  message: 'pong!',
  data: {},
}
```

### 获取设备信息

```JavaScript
{
  command: 'get-info',
  data: {},
}
```

```JavaScript
{
  statusCode: 200,
  message: '操作成功!',
  data: {
    id: 'haas531-123456123456', // 设备 ID (String)
    version: 1, // 固件版本 (Number)
    io: { // 硬件接口信息
      uart1: { // 串口1
        type: 'UART', // 接口类型 (String)
        port: 2, // 端口值 跟芯片 datasheet 上的端口对应 (Number)
        dataWidth: 8, // 串口数据宽度值 (Number)
        baudRate: 9600, // 串口波特率 (Number)
        stopBits: 1, // 串口停止位 (Number)
        flowControl: 'disable', // 流控设置 ('disable' | 'cts' | 'rts' | 'rtscts')
        parity: 'none', // 奇偶校验 ('none' | 'odd' | 'even')
      }
    },
    supportGB26875Names: ['default'], // 此设备支持的 GB26875 协议变种名称 (String[])
  },
}
```

### 获取配置

```JavaScript
{
  command: 'get-config',
  data: {},
}
```

```JavaScript
{
  statusCode: 200,
  message: '操作成功!',
  data: {
    server: [
      {
        host: '127.0.0.1', // 服务器域名或 IP (String)
        port: 233, // 服务器端口 (Number)
        username: '233', // 服务器用户名 (String)
        password: '233', // 服务器密码 (String)
      },
    ], // 可以多个服务器同时连接
    debugServer: {
      host: '127.0.0.1', // 调试服务器域名或 IP (String)
      port: 233, // 调试服务器端口 (Number)
      username: '233', // 调试服务器用户名 (String)
      password: '233', // 调试服务器密码 (String)
    },
    active: {
      realTimeData: { // 实时数据主动上报
        open: true, // 是否开启实时数据主动上报 (Boolean)
        uartCommandData: [1, 2, 3, 4, 5, 6], // 通过串口发送的指令 (Number[])
        uartCommandInterval: 500, // 通过串口发送指令的间隔 (Number)
      },
      alarm: { // 告警主动上报
        open: true, // 是否开启 (Boolean)
        threshold: [ // 阈值
          {
            key: '压力', // 字段名称 根据 protocol(协议) 解析后得到的 数据(parsed) 进行匹配的键名 (String)
            rawRanges: [ // 触发范围值 范围值是原始值 结束范围可空 ([开始(Number), 结束(Number)?])
              [0, 5],
              [20],
            ],
            filters: [ // 条件过滤器
              {
                key: '单位', // 条件字段名称 (String)
                rawRanges: [
                  // 达成条件范围值 范围值是原始值 结束范围可空 ([开始(Number), 结束(Number)?])
                  [4, 4],
                ],
              },
            ],
            message: '压力异常',
          },
        ]
      }
      fireAlarm: { // 火警主动上报
        open: true,
        threshold: [
          {
            key: '火警',
            rawRanges: [
              [1],
            ],
            filters: [],
            message: '设备报告火警',
          },
        ]
      }
      operation: { // 操作主动上报
        open: true,
        threshold: [
          {
            key: '复位',
            rawRanges: [
              [1],
            ],
            filters: [],
            message: '设备报告复位操作'
          },
        ]
      }
    },
    protocol: {
      type: 'modbus', // 协议类型 ('modbus' | 'gb26875')
      gb26875Config: {
        name: 'default',
      }, // GB26875 的协议类型 仅 protocol - type 等于 gb26875 时有效 可选值为此设备支持信息中的可选值为此设备信息 (get-info) 中的 supportGB26875Names (String)
      modbusConfig: { // Modbus 的协议配置 仅 protocol - type 等于 modbus 时有效
        id: 1, // modbus 协议 ID
        name: '源诚消防水源水压监测设备', // modbus 协议名称
        version: 1, // modbus 协议版本
        keys: [ // 解析的键
          {
            key: '单位', // 字段名称 (String)
            position: [4, 5], // 解析时 此字段在 MODBUS 数据中对应下标范围 ([开始(Number), 结束?(Number)])
            high: true, // 是否高字节在前
            unit: '' // 单位 (String)
            switch: [
              // 转换器 为空数组时 直接输出原始值
              {
                range: [0, 0], // 用数组表示范围 ([开始(Number), 结束?(Number)])
                value: 'Mpa', // 转换的值 (String || Number)
              },
            ],
          },
          {
            key: '小数点',
            position: [6, 7],
            high: true,
            unit: ''
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
            unit: 'Mpa'
            switch: [],
          },
        ],
      }
    },
  }
}
```

### 设置配置

```JavaScript
{
  command: 'set-config',
  data: {
    // 传入设备配置 参考 get-config
  },
}
```

```JavaScript
{
  statusCode: 200,
  message: '操作成功!',
  data: {}
}
```

### 主动获取实时数据 (需要设备支持且开启实时数据主动上报)

```JavaScript
{
  command: 'get-data',
  data: {},
}
```

```JavaScript
{
  statusCode: 200,
  message: '操作成功!',
  data: {
    raw: [0, 1, 2, 3, 4, 5, 6], // 原始数据 (Number[])
    parsed: { // 解析后的数据对象
      key: { // 参数名称 key
        value: 0, // 数据 (Number)
        unit: '单位' // 单位 (String)
      }
    },
  }
}
```

### 发送数据到设备串口

```JavaScript
{
  command: 'send-uart',
  data: {
    sendData: [1, 2, 3, 4, 5, 6, 7] // 需要发送的数据 (Number[])
  },
}
```

```JavaScript
{
  statusCode: 200,
  message: '操作成功!',
  data: {}
}
```

### 重启设备

```JavaScript
{
  command: 'reboot',
  data: {},
}
```

```JavaScript
{
  statusCode: 200,
  message: '操作成功!',
  data: {}
}
```
