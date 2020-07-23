const express = require('express');
const app = express();
const nodeCmd = require('node-cmd');
const crypto = require('crypto');
require('dotenv').config();

app.use(express.json());
app.post('/apis/update', (req, res) => {
  const sign = req.headers['x-hub-signature'];
  const sha1 =
    'sha1=' +
    crypto
      .createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest()
      .toString('hex');
  if (!sign || sign !== sha1) return res.send('secret error');
  nodeCmd.get('git pull', (err, data) => {
    if (!err) {
      console.log(data);
      nodeCmd.get('npx hexo generate', (err, data) => {
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
