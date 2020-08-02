---
title: 利用GitHub的Webhooks搭建hexo博客的自动部署
date: 2020-7-23 13:21:24
tags:
  - JavaScript
  - Express
  - Hexo
  - NodeJs
categories:
  - Back-End
  - NodeJs
---

> 每次更新文章都要生成一次就太麻烦啦!
> 于是利用 GitHub 的 Webhooks 做一个自动化部署
> 大概说一下搭建的经过~

[Runo+ Blog](https://github.com/RunoMeow/runo-plus-blog)  
[GitHub Webhooks](https://developer.github.com/webhooks/)

## 安装以下几个包

- **express** 服务端
- **node-cmd** 用于执行命令
- **crypto** 校验 sha1(可选)
- **dotenv** 加载.env(可选)

```bash
npm install express node-cmd crypto dotenv --save
```

## 在 hexo 项目下新建一个 webhooks.js

*hmmm 萌新代码写的不好 见谅*

```javascript
const express = require('express');
const app = express();
const nodeCmd = require('node-cmd');
const crypto = require('crypto');
require('dotenv').config();

// JSON支持
app.use(express.json());

// 监听POST请求
app.post('/apis/update', (req, res) => {
  // github通过秘钥+请求体算出来的sha1(如果不需要校验的话 下面的校验过程可不要)
  const sign = req.headers['x-hub-signature'];
  const sha1 =
    'sha1=' +
    crypto
      .createHmac('sha1', process.env.GITHUB_WEBHOOKS_SECRET)
      .update(JSON.stringify(req.body))
      .digest()
      .toString('hex');
  if (!sign || sign !== sha1) return res.send('secret error');
  // 使用 node-cmd 执行 git pull 拉取仓库
  nodeCmd.get('git pull', (err, data) => {
    if (!err) {
      console.log(data);
      // 使用 node-cmd 执行 npx hexo generate 生成页面
      nodeCmd.get('npx hexo generate', (err, data) => {
        if (err) console.error(err);
        else console.log(data);
      });
    } else console.error(err);
  });
  res.send('success');
});

// 监听端口
app.listen(process.env.GITHUB_WEBHOOKS_PORT, () =>
  console.log('listening ' + process.env.GITHUB_WEBHOOKS_PORT)
);
```

## 进行服务器的部署

1. 将代码提交后, 在服务器 ```git clone```

2. 执行 ```npm run build``` 会在 public 文件夹生成静态网页, 再使用 nginx 等web服务器, 把域名指向 public 文件夹

3. 使用 ```pm2 start``` 启动 webhooks.js, 服务端就算是部署好啦!

## 为仓库添加 Webhook

1. 打开 [GitHub](https://github.com/) 仓库

2. 依次点击 Setting → Webhooks → Add webhook

## 设置 Webhook

1. **Payload URL**: 需要响应的地址 (例如 <https://runo.plus/xxx>)

2. **Content type**: 请求的内容类型 (选择 application/json)

3. **Secret**: 秘钥 (需要与服务器上的一样! GITHUB_WEBHOOKS_SECRET, 如果不需要校验则省略)

4. 选择 **Just the push event.** (仓库接到推送后触发)

5. 勾选 **Active**

6. 点击 **Add webhook** 完成添加

### 提交一次仓库试试效果owo~
