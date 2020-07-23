const express = require('express');
const app = express();
const nodeCmd = require('node-cmd');
const crypto = require('crypto')
require('dotenv').config();

app.post('/apis/update', (req, res) => {
  console.log('post', req.body);
  const sign = req.headers['X-Hub-Signature']
  const sha1 = 'sha1=' + crypto.createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET).update(req.body).digest().toString('hex')
  if (!sign && sign !== sha1) res.send('secret error');
  nodeCmd.get('git pull', (err, data, stderr) => {
    if (!err) {
      console.log(data);
      nodeCmd.get('npx hexo generate', (err, data, stderr) => {
        if (err) console.error(err);
        else console.log(data);
      });
    } else console.error(err);
  });
  res.send('success');
});

app.listen(process.env.GITHUB_WEBHOOK_PORT, () =>
  console.log('listening ' + process.env.GITHUB_WEBHOOK_PORT)
);
