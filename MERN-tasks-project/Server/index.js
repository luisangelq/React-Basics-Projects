//add express
const express = require("express");
const connectDB = require("./config/db");

//create express app
const app = express();

//connect to database
connectDB();

//enable body parser
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

//Import routes
app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
