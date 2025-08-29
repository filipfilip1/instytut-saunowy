import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './src/config/database.js';
import productRoutes from './src/routes/productRoutes.js';

dotenv.config();

connectDb();

const app = express();

//Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Api Instytut Saunowy',
    status: 'OK',
    timestamp: new Date(),
  });
});

// API Routes
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: 'connected',
    timestamp: new Date()
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Nie można znaleźć ${req.originalUrl} na tym serwerze`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`serwer działa na porcie ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`📊 Środowisko: ${process.env.NODE_ENV || 'development'}`);
})