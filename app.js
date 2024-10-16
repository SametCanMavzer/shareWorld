const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const upload = require('./config/multerConfig');
const multerErrorHandler = require('./middleware/multerErrorHandler');
const corsMiddleware = require('./middleware/corsMiddleware');

dotenv.config();

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();


app.use(bodyParser.json()); // application/json
app.use(upload.single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(corsMiddleware);

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

// Multer hata yönetimi
app.use(multerErrorHandler);

app.use(errorHandler);



mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app;
