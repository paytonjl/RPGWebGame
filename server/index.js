//import app from "./server.js" THIS IS GONE WHILE SERVER FILE IS GONE
import mongodb, { Collection } from "mongodb"
import dotenv from "dotenv"
import AccountsDAO from "./dao/accountsDAO.js"
import session from "express-session" 
import MongoStore from "connect-mongo" 
import express from "express"
import accounts from "./api/accounts.route.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 8000

const app = express()
app.use(express.json())
app.use(express.static(__dirname + "/public"))

const MongoClient = mongodb.MongoClient
const uri = process.env["MongoDB_API_KEY"]

const mongoStore = new MongoStore({
    mongoUrl: process.env.MongoDB_API_KEY,
    //Collection: "Sessions", // thought one of these would work for setting my session folder name in the data base
    //collection: "Sessions",
})

// configure session's middleware here
try {
    app.use(
        session({
            secret: 'your_secret_key_here',
            resave: false,
            saveUninitialized: true,
            cookie: { 
                maxAge: (7 * 24 *60 * 60 * 1000),
                //secure: true,
                //expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // atempt to get cookies working on frontend
                //httpOnly: true, //add later for security 
                //name: "token",
                //sameSite: "none",
            },
            store: mongoStore,
        })
    );
} catch (error) {
    console.error("Failed to initialize MongoStore:", error);
}

//routes
app.use("/api/v1/accounts", accounts)
app.use(express.static(__dirname))
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/public/views/index.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(join(__dirname, "/public/views/login.html"));
});
app.get("/create_account", (req, res) => {
    res.sendFile(join(__dirname, "/public/views/create_account.html"));
});
app.use("*", (req, res) => res.status(400).json({error: "Page not found"}))


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

        await AccountsDAO.injectDB(client)

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })