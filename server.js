const express = require("express")
const app = express()

//route
app.get("/", (req,res) =>{
    res.send("hello node api")
})

app.listen(3000, ()=> {
    console.log("node API app is running on port 3000")
})