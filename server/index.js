import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()


const MongoClient = mongodb.MongoClient
const uri = process.env["MongoDB_API_KEY"]

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        //useNewUrlParser: true (mongodb drivers say this is not needed because of updates)
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client =>{
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })