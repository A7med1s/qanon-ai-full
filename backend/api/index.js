// backend/api/index.js

const express = require('express');
const dotenv = require('dotenv');
// const cors = require('cors'); // **احذف استيراد cors لو موجود هنا**
const connectDB = require('../config/db');
const { createWeaviateSchema } = require('../config/weaviateClient');

// استيراد المسارات
const userRoutes = require('../routes/userRoutes');
const documentAnalysisRoutes = require('../routes/documentAnalysisRoutes');
const contractManagementRoutes = require('../routes/contractManagementRoutes');
const riskAnalysisRoutes = require('../routes/riskAnalysisRoutes');
const caseAnalysisRoutes = require('../routes/caseAnalysisRoutes');
const legalQnRoutes = require('../routes/legalQnARoutes')
dotenv.config();

const app = express();

const cors = require('cors'); 

const allowedOrigins = [
  'http://localhost:5173', 
  'https://qanon-ai.vercel.app', 
  /^https:\/\/qanon-ai-.+\.vercel\.app$/, 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(pattern => typeof pattern === 'string' ? pattern === origin : pattern.test(origin))) {
      callback(null, true); 
    } else {
      console.log(`CORS Error: Origin ${origin} not allowed.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true, 
  optionsSuccessStatus: 204 
}));



app.use((req, res, next) => {
    next();
});
app.get('/', (req, res) => {
    res.send('Qanon.ai Backend is running!');
});

app.use('/api/tools/document-analysis', documentAnalysisRoutes);
app.use('/api/contract-management', contractManagementRoutes);
app.use('/api/risk-analysis', riskAnalysisRoutes);
app.use('/api/case-analysis', caseAnalysisRoutes);
app.use('/api/legal-qna', legalQnRoutes);
app.use('/api/users', express.json(), express.urlencoded({ extended: false }), userRoutes); 


app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

if (!global.isDbConnected) {
    connectDB();
    createWeaviateSchema();
    global.isDbConnected = true;
}

module.exports = app;