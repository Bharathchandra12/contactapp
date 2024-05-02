const mongoose = require("mongoose");
const contactSchema=mongoose.Schema({
    name:{
        type: String,
        // required: true,
    },
    email:{
        type: String,
    },
    phonenumber:{
        type: String,
        // required: true,
    },
    tags:{
        type: String,
    },
},
{timeStamps:true,collection:"contacts"}
);
const Contact =mongoose.model("contact",contactSchema);
module.exports = Contact;