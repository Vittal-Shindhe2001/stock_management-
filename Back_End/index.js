const express=require('express')
const cors=require('cors')
const port=3090
const app=express()
const config=require('./config/database')
const router=require('./config/routes')


app.use(express.json())
app.use(cors())
config()
app.use(router)

app.listen(port,()=>{
    console.log('server running on port',port);
})