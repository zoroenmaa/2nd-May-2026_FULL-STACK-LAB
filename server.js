const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

//.then(() => console.log("MongoDB Connected"))
//.catch(err => console.log(err));

// Routes
app.use("/", require("./routes/url"));

// Start server
const PORT = process.env.PORT || 5000;

// Models
// app.use("/", require("./models/url"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//MONGO_URI=mongodb://localhost:27017/urlshortener