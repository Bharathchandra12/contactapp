const express=require("express");
const dotenv=require("dotenv");
const connectDB = require("./database/database");
const cors = require('cors');
const contactRouter=require("./routes/contact.js");
const userRoutes=require("./routes/userRoute.js");
const app =express();
app.use(express.json());
dotenv.config();
app.use(cors(
    {
        origin: ["https://contactapp-ten-plum.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use("/api/contact",contactRouter);
app.use("/importcontact",userRoutes);
app.listen(process.env.PORT , ()=>{
    connectDB();
    console.log("Server is rocketing at port "+ process.env.PORT);
})
