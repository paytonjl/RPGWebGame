//import app from "./server.js" THIS IS GONE WHILE SERVER FILE IS GONE
import mongodb from "mongodb"
import dotenv from "dotenv"
import AccountsDAO from "./dao/accountsDAO.js"
import session from "express-session" 
import MongoStore from "connect-mongo" 
import express from "express"
import cors from "cors"
import accounts from "./api/accounts.route.js"

dotenv.config()

const app = express()

app.use(cors({
    //credentials: true,
    //origin: "http://127.0.0.1:5500/"
}))
app.use(express.json())

const MongoClient = mongodb.MongoClient
const uri = process.env["MongoDB_API_KEY"]

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client =>{

        const mongoStore = new MongoStore({
            mongoUrl: process.env.MongoDB_API_KEY
        })

        // configure session's middleware here
        try {
            app.use(
                session({
                    secret: 'your_secret_key_here',
                    resave: false,
                    saveUninitialized: true,
                    cookie: { 
                        secure: false,
                        //httpOnly: true, //add later for security 
                        name: "mySession",
                    },
                    store: mongoStore,
                })
            );
        } catch (error) {
            console.error("Failed to initialize MongoStore:", error);
        }

        //routes
        app.use("/api/v1/accounts", accounts)
        app.use("*", (req, res) =>
        res.status(400).json({error: "not found"}))

        await AccountsDAO.injectDB(client)

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
