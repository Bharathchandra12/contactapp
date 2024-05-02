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
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())
// app.get("/", (req, res)=>{
//     res.status(200).json("This is the main page of the api");
// });
//routes


app.use(cors());
app.use("/api/contact",contactRouter);
app.use("/importcontact",userRoutes);
app.listen(process.env.PORT , ()=>{
    connectDB();
    console.log("Server is rocketing at port "+ process.env.PORT);
})
