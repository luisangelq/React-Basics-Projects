const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
// Set the port of our application
const PORT = process.env.PORT || 8080; // default port 8080

//Enable body parser
app.use(express.json({ extended: false }));

//app routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/files", require("./routes/files"));

// Launch our application
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
