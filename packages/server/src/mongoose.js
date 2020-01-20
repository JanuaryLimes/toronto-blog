import mongoose from 'mongoose';
import { loadDevEnv } from '@toronto-blog/utils';

loadDevEnv();
mongoose.connect(process.env.MONGO_CS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
  console.log('db open');
});

export { mongoose as mConnection };
