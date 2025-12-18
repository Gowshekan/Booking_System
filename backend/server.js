const app = require("./index");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({path: "./config.env"});
app.use(cors());

// Disable mongoose buffering
mongoose.set('bufferCommands', false);

console.log("Starting server on port:", process.env.PORT_NO);

// Connect to database with timeout handling
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ Database connected successfully to Atlas");
    } catch (err) {
        console.log("❌ Database connection failed:", err.message);
        console.log("📝 Note: App will use fallback mode for authentication");
    }
};

connectDB();

app.listen(process.env.PORT_NO, () => {
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT_NO}`);
    console.log(`📡 API endpoints available at http://localhost:${process.env.PORT_NO}/api/v1`);
    console.log(`🔍 Health check: http://localhost:${process.env.PORT_NO}/`);
});