const express = require("express");
const notemodel = require("./models/notes.model.js");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());
app.post("/", async (req, res) => {
  const { title, msg, age } = req.body;
  await notemodel.create({ title, msg, age });
  res.status(200).json({ msg: "note created" });
});
app.get("/", async (req, res) => {
  const notes = await notemodel.find();
  res.status(201).json({ msg: "all note fetched", notes });
});
app.delete("/:id",async(req,res)=>{
const id = req.params.id
await notemodel.findByIdAndDelete(id)
res.status(200).json({msg:"note deleteed"})
})
app.patch("/:id",async(req,res)=>{
    const id = req.params.id
    const {msg} = req.body
await notemodel.findByIdAndUpdate(id,{msg})
res.status(201).json({msg:"msg Updateted"})
})

module.exports = app;
