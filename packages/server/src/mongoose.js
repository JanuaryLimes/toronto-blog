import mongoose from 'mongoose';
import { env } from '@toronto-blog/utils';

mongoose.connect(env().MONGO_CS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
  console.log('db open');
});

export { mongoose as mConnection };
