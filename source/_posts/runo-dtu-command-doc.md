---
title: Runo 的 DTU 指令文档
date: 2020-09-27 08:51:42
tags:
  - IOT
categories:
  - IOT
---

# 读取/上报类指令

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
    uuid: '1aa169628add4c1e965f5bc69e2e9dbb', // 设备唯一UUID (String)
    name: '测试的设备', // 设备名称 (String)
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
    dataInterval: 3600, // 数据上报间隔 (Number)
    heartbeatInterval: 3600, // 心跳上报间隔 (Number)
    alarmInterval: 3600, // 告警/火警上报间隔 (Number)
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

### 读取设备告警阈值 (请求/响应)

```JavaScript
{
  cmd: '读取设备告警阈值',
  data: {},
}
```

```JavaScript
{
  cmd: '读取设备告警阈值',
  data: {
    alarmValues: [
      // 告警阈值, 为空数组时代表不会产生告警 ({}[])
      {
        key: '水压', // 字段名称 (String)
        max: 999, // 正常最大值, 注意此数值是原始值, 没有加上小数点 (Number)
        min: 5, // 正常最小值, 注意此数值是原始值, 没有加上小数点 (Number)
        maxMessage: '设备告警, 水压过高!', // 大于正常值时, 告警/火警消息内容 (String)
        minMessage: '设备告警, 水压过低!', // 小于正常值时, 告警/火警消息内容 (String)
      },
    ],
  },
}
```

### 获取设备版本信息 (请求/响应)

```JavaScript
{
  cmd: '获取设备版本信息',
  data: {},
}
```

```JavaScript
{
  cmd: '获取设备版本信息',
  data: {
    version: 1, // 固件版本 (Number)
    systemVersion: '?', // 轻应用版本号 (String)
    moduleVersion: '?', // 硬件模组版本号 (String?)
    systemPlatform: '?', // 硬件平台名称 (String)
  },
}
```

### 上报告警/火警信息 (响应)

```JavaScript
{
  cmd: '上报告警/火警信息',
  data: {
    message: '设备告警, 水压过低!', // 告警/火警消息内容 (String)
    values: [
      // 设备数据 ({}[])
      {
        key: '单位', // 字段名称 (String)
        value: 'Mbar', // 字段值 (String || Number)
      },
      {
        key: '小数点',
        value: 0.01,
      },
      {
        key: '压力',
        value: 0,
      },
    ],
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
    status: '成功', // 指令操作 '成功' 或 '失败'
  },
}
```

### 写入设备信息 (请求/响应)

```JavaScript
{
  cmd: '写入设备信息',
  data: {
    name: '消防水源水压测试设备', // 设备名称 (String)
  },
}
```

```JavaScript
{
  cmd: '写入设备信息',
  data: {
    status: '成功',
  },
}
```

### 写入设备上报间隔 (请求/响应)

```JavaScript
{
  cmd: '写入设备上报间隔',
  data: {
    dataInterval: 3600, // 数据上报间隔 (Number)
    heartbeatInterval: 3600, // 心跳上报间隔 (Number)
    alarmInterval: 3600, // 告警/火警上报间隔 (Number)
  },
}
```

```JavaScript
{
  cmd: '写入设备上报间隔',
  data: {
    status: '成功',
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
    status: '成功',
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
        key: '水压', // 字段名称 (String)
        max: 999, // 正常最大值, -1 时关闭告警, 注意此数值是原始值, 没有加上小数点 (Number)
        min: 5, // 正常最小值, -1 时关闭告警, 注意此数值是原始值, 没有加上小数点 (Number)
        maxMessage: '设备告警, 水压过高!', // 大于正常值时, 告警/火警消息内容 (String)
        minMessage: '设备告警, 水压过低!', // 小于正常值时, 告警/火警消息内容 (String)
      },
    ],
  },
}
```

```JavaScript
{
  cmd: '写入设备告警阈值',
  data: {
    status: '成功',
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
          // 协议指令
          {
            name: '获取数据', // 指令名称 (String)
            data: [1, 3, 0, 0, 2, 4, 233, 233], // 指令内容 (Number[])
          },
        ],
        getDataCommand: '获取数据', // 用于获取数据的指令, 空字符串则不启用自 动数据上报功能 (String)
        keys: [
          // 解析 ({}[])
          {
            key: '单位', // 字段名称 (String)
            index: 0, // 解析时, 此字段在 modbus 数据中的下标, 从0开始  (Number)
            default: '', // 转换器默认值, 为 -1 时直接返回原数值 (String |  | Number)
            switch: [
              // 转换器 ({}[])
              {
                case: [0, 0], // 用数组表示范围 [开始, 结束] ([Number,  Number])
                value: 'Mpa', // 转换的值 (String || Number)
              },
              {
                case: [1, 1],
                value: 'Kpa',
              },
              {
                case: [2, 2],
                value: 'Pa',
              },
              {
                case: [3, 3],
                value: 'Bar',
              },
              {
                case: [4, 4],
                value: 'Mbar',
              },
              {
                case: [5, 5],
                value: 'kg/cm²',
              },
              {
                case: [6, 6],
                value: 'psi',
              },
              {
                case: [7, 7],
                value: 'mh²o',
              },
              {
                case: [8, 8],
                value: 'mmh²o',
              },
            ],
          },
          {
            key: '小数点',
            index: 1,
            default: 1,
            switch: [
              {
                case: [1, 1],
                value: 0.1,
              },
              {
                case: [2, 2],
                value: 0.01,
              },
              {
                case: [3, 3],
                value: 0.001,
              },
            ],
          },
          {
            key: '压力',
            index: 2,
            default: -1,
            switch: [],
          },
        ],
      },
    ]
  }
}
```

```JavaScript
{
  cmd: '写入modbus子类型',
  data: {
    status: '成功',
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

### 开启监听设备数据 (请求/响应)

```JavaScript
{
  cmd: '开启监听设备数据',
  data: {},
}
```

```JavaScript
{
  cmd: '开启监听设备数据',
  data: {
    status: '成功',
  },
}
```

### 关闭监听设备数据 (响应)

```JavaScript
{
  cmd: '关闭监听设备数据',
  data: {},
}
```

```JavaScript
{
  cmd: '关闭监听设备数据',
  data: {
    status: '成功',
  },
}
```

### 设备数据日志 (响应)

```JavaScript
{
  cmd: '设备数据日志',
  data: {
    time: 233, // 设备本地时间戳
    bytes: [1, 3, 0, 0, 0, 0, 0, 0], // 设备实时回传数据
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
    status: '成功',
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
