const express = require('express');
const app = express();
const nodeCmd = require('node-cmd');
require('dotenv').config();

app.get('/apis/update', (req, res) => {
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
  res.send(process.env.SECRET);
});

app.listen(4001, () => console.log('listening 4001'));
