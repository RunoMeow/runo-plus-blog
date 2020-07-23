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
