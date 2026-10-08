import mongoose from "mongoose";

export function db_connection() {
  mongoose
    .connect("mongodb://localhost:27017/ecommerce_api")
    .then(() => {
      console.log("Mongo DB connected");
    })
    .catch((err) => {
      console.log("Mongo DB connection Failed", err);
    });
}
