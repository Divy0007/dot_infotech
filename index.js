import express from "express"
import  "./db/conn.js"
import { MyModel } from "./db/userSchema.js"

const app = express()
const port = 4000


app.use(express.json());

app.post('/add', async(req, res) => {
  const {name,email,consents} = req.body
try{
  const preUser = await MyModel.findOne({ email: email });
  if(!name || !email || !consents){
    res.status(404).send('require fill all data')
  }else if(preUser){
    res.status(404).send('register already exist')
  }else{
    const addUser = await new MyModel({ name, email, consents })
    await addUser.save()
    res.status(201).json(addUser)
  }
}catch(err){
  console.log(err.message);
}
})


app.get('/show',async(req,res)=>{
  const showUSer = await MyModel.find({})
  res.status(201).json(showUSer)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})