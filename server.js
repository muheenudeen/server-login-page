import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import { userRouter } from './routers/userRouter.js'
import dotenv from 'dotenv'


dotenv.config();


const app = express()
const PORT=3000

app.use(express.json())
app.use('/api/user',userRouter)

app.listen(PORT,()=>{
    console.log('server running');
    
})


main().catch(err=>console.log(err))

async function main() {
    await mongoose.connect('mongodb+srv://muheenudeen313:xf0rIWkzdFRULU1z@cluster0.swcqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    
}