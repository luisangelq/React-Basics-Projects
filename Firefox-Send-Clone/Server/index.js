const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
// Set the port of our application
const PORT = process.env.PORT || 8080; // default port 8080

//app routes
app.use("api/users", require("./routes/users"));

// Launch our application
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
