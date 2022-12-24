const express = require("express")
const route = require("./routes/route")
const app = express()

const mongoose = require("mongoose")
const multer=require("multer")
app.use(express.json())
app.use(multer().any())


mongoose.connect("mongodb+srv://NikitaRoy23:Z3jVv5PFclEHjgDs@cluster0.pmjudc4.mongodb.net/shoppingcart",
    { useNewUrlParser: true })
    .then(() => console.log(("Mongoose is connected")))
    .catch(err => console.log(err.message))

app.use("/", route)

app.listen( 3000, function () {
    console.log("Express is running on port 3000"  )
})
