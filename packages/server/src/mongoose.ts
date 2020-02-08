import mongoose from 'mongoose';
import { ENV } from '@toronto-blog/utils';

const connectionString = `mongodb+srv://${ENV.MONGO_URL}/${ENV.MONGO_DB}?retryWrites=true`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
  console.log('db open: ', ENV.MONGO_DB);
});

export { mongoose as mConnection };
