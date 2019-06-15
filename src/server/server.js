import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { join } from 'path';
import { Server } from 'http';
import blogRoute from './routes/blog';
import authRoute from './auth/auth.route';
import https from './https';
import './auth/passportSetup';
import { loadDevEnv } from 'toronto-utils';

loadDevEnv();
const PORT = process.env.PORT || 5000;
const app = express();
const http = Server(app);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(https);

app.use(blogRoute);
app.use(authRoute);

app.use(express.static(join(__dirname, '../build'))); // Serve the static files from the React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname + '../build/index.html')); // Handles any requests that don't match the ones above
});

http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});
