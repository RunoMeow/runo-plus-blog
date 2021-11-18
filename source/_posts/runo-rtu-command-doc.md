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
  data: {}, // 响应数据
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

### 获取配置

```JavaScript
{
  command: 'config-get',
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
            rawRanges: [ // 触发范围值 范围值是原始值 结束范围可空 ([开始, 结束?])
              [0, 5],
              [20],
            ],
            filters: [ // 条件过滤器
              {
                key: '单位', // 条件字段名称 (String)
                rawRanges: [
                  // 达成条件范围值 范围值是原始值 结束范围可空 ([开始, 结束?])
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
      gb26875Subtype: 'default', // GB26875 的子协议子类型 仅 protocol - type 等于 gb26875 时有效 (String)
      modbusConfig: { // Modbus 的协议子类型 仅 protocol - type 等于 modbus 时有效
        // ...TODO
      }
    },
  }
}
```
