import express from "express"
import cors from "cors"
import accounts from "./api/accounts.route.js"

const app = express()

app.use(cors())
app.use(express.json())

//route
app.use("/api/v1/accounts", accounts)
app.use("*", (req, res) =>
res.status(400).json({error: "not found"}))

export default app