import mongoose from "mongoose";

const option = {
   useNewUrlParser:true,
   useUnifiedTopology: true
};

mongoose
  .connect("mongodb://localhost:27017/crud", option)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });