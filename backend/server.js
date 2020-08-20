const express = require("express")
const mongoose = require("mongoose")

require('dotenv').config();

const app = express() 

const cors = require('cors');
app.use(cors())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection

db.on("error", (err)=>console.log("Error: "+err))
db.once("open", ()=> console.log("DB created"))

app.use(express.json())

const playerRouter = require("./routes/players")
app.use('/players',playerRouter) 

const port = process.env.PORT || 5000
app.listen(port, ()=>console.log(`Server listening at ${port}`))
