import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "ecommerceStore",
    };
    const connection = await mongoose.connect(
      "mongodb+srv://sanyogsr:sanyog@cluster0.fautp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      DB_OPTIONS
    );
    console.log(
      `db Connected successfully : ${connection.connection.host} and ${connection.connection.name} `
    );
  } catch (e) {
    console.log(`Internal error occured ${e}`);
  }
};

export default connectDb;
