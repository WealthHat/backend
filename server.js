require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// initiate express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
// ------ user
app.use('/v1', require('./routes/user/userRouter'));
app.use('/v1', require('./routes/user/profilingRouter'));
app.use('/v1', require('./routes/user/verificationRouter'));

// -------admin
app.use('/v1', require('./routes/admin/adminRouter'));
app.use('/v1', require('./routes/admin/networthRouter'));
app.use('/v1', require('./routes/admin/blogRouter'));
app.use('/v1', require('./routes/admin/budgetRouter'));

// -------upload router
app.use("/v1", require("./routes/upload"))

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to WealthHat Backend' });
});

// connect to mongo db
const URI = process.env.MONGO_URI;


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

// mongoose.set('strictQuery', true);

// port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Server running on port ', PORT);
});
