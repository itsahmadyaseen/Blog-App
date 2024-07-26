import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true});
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database', error);
  }
};
