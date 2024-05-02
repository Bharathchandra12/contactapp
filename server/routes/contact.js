// const express = require("express");
// const Contact = require("../model/contact.js");
// const route = express.Router();
// const {parse}=require('json2csv');
// const fs=require("fs");
// const { log } = require("console");
// route.get("/",async (req, res) => {
//     try{
//         const allContacts = await Contact.find({});
//         res.status(200).json({status:"SUCCESS",allContacts});
//     } catch(err){
//         res.status(500).json({status:"ERROR",err});
//     }
// })
// route.post("/create", async (req,res)=>{
//     try{
//         const newContact= await Contact.create(req.body);
//         res.status(200).json({status: "SUCCESS",newContact});
//     } catch(err){
//         res.status(500).json({status:"ERROR",err});
//     }
// })
// route.post('/export',async(req,res)=>{
//     console.log(Contact);
// Contact.find({},{_id:0,createAt:0,updatedAt:0,__v:0})
//    const fields=['name','phonenumber','email'];
//    const opts=[fields];
//    try {
//     const csv=parse(Contact,opts);
//     fs.writeFile("bbc.csv",csv,function(err){
//         if(err) throw err;
//         console.log("Write Successfully");
//     });
//    } catch (error) {
//     console.log(error);
//    }
// })
// route.delete("delete/:id",async(req,res)=>{
//     const id=req.params.id;
//     try{
//         const removedUser=await Contact.findByIdAndRemove(id);
//         res.status(200).json({status: "SUCCESS",removedUser});
//     } catch(err){
//         console.log(err);
//     }
// })
// module.exports = route;
const express = require("express");
const Contact = require("../model/contact.js");
const route = express.Router();
const { parse } = require('json2csv');
const fs = require("fs");

route.get("/", async (req, res) => {
  try {
    const allContacts = await Contact.find({});
    res.status(200).json({ status: "SUCCESS", allContacts });
  } catch (err) {
    res.status(500).json({ status: "ERROR", err });
  }
});

route.post("/create", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(200).json({ status: "SUCCESS", newContact });
  } catch (err) {
    res.status(500).json({ status: "ERROR", err });
  }
});

route.get('/export', async (req, res) => {
  try {
    const contacts = await Contact.find({}, { _id: 0, createAt: 0, updatedAt: 0, __v: 0 });
    console.log(contacts);
    const fields = ['name', 'phonenumber', 'email'];
    const opts = { fields };
    const csv = parse(contacts, opts);

    res.setHeader('Content-Disposition', 'attachment; filename="contacts.csv"');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "ERROR", error });
  }
});

route.delete("delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const removedUser = await Contact.findByIdAndRemove(id);
    res.status(200).json({ status: "SUCCESS", removedUser });
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;