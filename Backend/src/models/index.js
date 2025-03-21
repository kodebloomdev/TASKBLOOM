import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Kodebloom:Kodebloom123@taskmanager.mydrb.mongodb.net/Task-management`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};

// Call connectDB() immediately
connectDB();

export default mongoose;
