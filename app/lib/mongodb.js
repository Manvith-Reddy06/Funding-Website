import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://localhost:27017/myDatabase";

async function connectMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
export default connectMongo;