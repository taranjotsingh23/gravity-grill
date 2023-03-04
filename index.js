const express = require('express');
const app= express();
const dotenv=require('dotenv');
const port = process.env.PORT || 3000;
const mongoose=require('mongoose');

//IMPORT ROUTES
const authRoute=require('./routes/auth');
const getMenuRoute=require('./routes/getMenu');
const reservationRoute=require('./routes/reservation');
const orderedFoodRoute=require('./routes/orderedFood');
const giveFeedbackRoute=require('./routes/giveFeedback');
const cors = require("cors");
dotenv.config();

//Connect to DB
try {
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log('Connected to Database'));
}
catch (error) {
    handleError(error);
    console.log(error);
  }

//MIDDLEWARES
app.use(express.json());

// var corsOptions = {
//   origin: ["https://khana-khazana-nine.vercel.app","https://khana-khazana.ayushtyagi14.repl.co"],
// };

// app.use(cors(corsOptions));

// ROUTE MIDDLESWARES
app.use('/api/user',authRoute);
app.use('/api',getMenuRoute);
app.use('/api',reservationRoute);
app.use('/api',orderedFoodRoute);
app.use('/api',giveFeedbackRoute);

app.listen(port,() => {
    console.log(`Server is running at Port Number ${port}`);
});