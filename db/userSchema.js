import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
   name:{
      type:"string",
      require:"true"
   },
   email:{
      type:"string",
      require:"true"
   },
   consents:{
      type:"object",
      require:"true"
   }
})

export const MyModel =  new mongoose.model('dottask', userSchema);