import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local' });
}

mongoose.connect(process.env.MONGO_CS, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
  console.log('db open');
});

export default mongoose;
