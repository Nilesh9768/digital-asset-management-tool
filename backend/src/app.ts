import express from 'express'
import { connect } from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import image from './routers/image'

dotenv.config()

try {

    connect(process.env.DB_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('db connected')
    })
} catch (e) {
    console.log(e)
}
const app = express()

app.use(cors())
app.use(express.json())
app.use(image)

app.listen(5000, () => {
    console.log('server listening on 5000')
})
