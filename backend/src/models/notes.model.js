const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:String,
    msg:String,
    age:Number
})

const notemodel = mongoose.model("chacha",noteSchema)
module.exports=notemodel