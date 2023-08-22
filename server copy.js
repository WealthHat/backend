require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")


// initiate express
const app = express() 

// middlewares
app.use(express.json())
app.use(cors())


// routes
app.use('/v1', require('./routes/userRouter'));

app.get("/", (req, res) => {
    res.json({msg : "Welcome to WealthHat Backend"})
})


// connect to mongo db
const URI = process.env.MONGO_URI;
// mongoose.connect(
//   URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("connected to database");
//   }
// );

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });

  mongoose.set('strictQuery', true);


// port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Server running on port ", PORT)
})