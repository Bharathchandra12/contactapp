const express = require("express");
const multer=require("multer");
const csv=require("csvtojson");
var contacts=require("../model/contact.js");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{cb(null,file.originalname)}
})
const router = express.Router();
const upload=multer({
    storage,
});
router.route("/uploadAll").post(upload.single("csvFile"),async (req,res)=>{
    const jsonArray=await csv().fromFile(req.file.path);
    contacts.insertMany(jsonArray);
    console.log("Added");
    res.status(200).json("Added to DB");
})
module.exports = router;

