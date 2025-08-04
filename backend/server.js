const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// configuration 
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// routes
const authRoutes = require('./routes/auth');
const qrRoutes = require('./routes/qr');
const feedbackRoutes = require('./routes/feedback');
const businessRoutes = require('./routes/business');
const accessRoutes = require('./routes/feedbackAccess');
const reportRoutes = require('./routes/reports');
const insightRoutes = require('./routes/insights');

app.use('/api/auth', authRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/access/feedback', accessRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/insights', insightRoutes);

app.get('/', (req, res)=> res.status(200).json({message: 'we are here'}));

// connecting mongoose and serve

mongoose.connect(process.env.MONGO_URI,).then(() => {
    console.log("connected to mongo db");
    const PORT = process.env.PORT || 5340;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}.`);
    });
}).catch((err)=>{
    console.error('Mongodb connection error', err);
})





