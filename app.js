const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/generate', (req, res) => {
  const { machineCode, secretKey } = req.body;

  if (!machineCode || !machineCode.trim()) {
    return res.json({ error: 'Machine Code 不可為空白！' });
  }
  if (!secretKey || !secretKey.trim()) {
    return res.json({ error: 'Secret Key 不可為空白！' });
  }

  const input = `${machineCode}-${secretKey}`;
  const hash = crypto.createHash('sha256').update(input, 'utf8').digest('hex').toUpperCase();
  const regCode = hash.substring(0, 32);

  res.json({ regCode });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
