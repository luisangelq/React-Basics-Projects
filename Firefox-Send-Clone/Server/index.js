const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

connectDB();
// Set the port of our application
const PORT = process.env.PORT || 8080; // default port 8080

//Enable CORS for all routes
const corsOptions = {
    //taking from environment variable
    origin: process.env.FRONTEND_URL, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//Enable body parser
app.use(express.json({ extended: false }));

//Enable public folder
app.use(express.static("uploads"));

//app routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/files", require("./routes/files"));

// Launch our application
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
