const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
  const environments = ['production'];
  const status = 302;

  if (environments.indexOf(process.env.NODE_ENV) >= 0) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(status, 'https://' + req.hostname + req.originalUrl);
    } else {
      next();
    }
  } else {
    next();
  }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../build/index.html'));
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});
