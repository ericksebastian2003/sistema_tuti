import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'


const app = express()
dotenv.config()


app.set('port',process.env.port || 3000)
app.use(cors())


app.use(express.json())



// RUTA 

app.get('/', (req,res)=>{
    res.send('El servidor se encuentra a disposición')
} )


export default app

