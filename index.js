const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const documentRoutes = require('./routes/documentRoutes');
const newsRoutes = require('./routes/newsRoutes');
const MandatoryRoute = require('./routes/MandatoryRoute');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: "Server is running fine!" });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/mandatory', MandatoryRoute);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error("MongoDB connection failed:", err));
