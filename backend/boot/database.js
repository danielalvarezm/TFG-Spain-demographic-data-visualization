import mongoose from 'mongoose';

mongoose.connect( 'mongodb://localhost:27017/Demografia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then( (db) => console.log('DB is connected'))
  .catch( (err) => console.error(err));

export {mongoose};
