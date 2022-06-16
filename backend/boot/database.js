import mongoose from 'mongoose';

const uri =
  'mongodb+srv://demographyAdmin:UMwYp0Hw1CO9jdeJ@demography.bgmkp.mongodb.net/Demography?retryWrites=true&w=majority';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error(err));

export {mongoose};
