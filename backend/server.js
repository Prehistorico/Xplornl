import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json()); //middleware allowing us to accept JSON data in the req.body

app.post("/api/users", async (req, res) => {
    const user = req.body; //user will send this data

    if(!user.username || !user.password || !user.insignia || !user.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newUser = new User(user)

    try {
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    } catch (error) {
        console.error("Error in create user:", error.message);
        res.status(500).json({success: false, message: "Server Error"});   
    }
});

app.listen(5000, () =>{
    connectDB();
    console.log("Server started at http://localhost:5000");
});
