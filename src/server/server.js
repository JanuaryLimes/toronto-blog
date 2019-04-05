import express from 'express';
import cors from 'cors';
import { join } from 'path';
import { Server } from 'http';
import blogRoute from './routes/blog';
import https from './https';

const PORT = process.env.PORT || 5000;
const app = express();
const http = Server(app);

app.use(cors());
app.use(https);
app.use(blogRoute);

// Serve the static files from the React app
app.use(express.static(join(__dirname, '../build')));
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(join(__dirname + '../build/index.html'));
});

http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});
