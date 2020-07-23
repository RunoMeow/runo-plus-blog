const express = require('express');
const app = express();
const nodeCmd = require('node-cmd');
require('dotenv').config();

app.get('/', (req, res) => {
  console.log('post', req.body);
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
