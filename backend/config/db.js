import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "ecommerceStore",
    };
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/",
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
