
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kalaykhanuser:HooriaA12120@kalaykhan.zoxcdbn.mongodb.net/")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
