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
const chatRoutes = require('../routes/chatRoutes');

dotenv.config();

const app = express();

// --- تهيئة CORS الحاسمة ---
const cors = require('cors'); // **تأكد من استيراد cors هنا لو مكنش موجود فوق**

// تعريف النطاقات المسموح بها لـ CORS
// Vercel بينشر على نطاقات فرعية كتير لـ Preview و Production.
// محتاجين نسمح بكل النطاقات اللي Vercel بيولدها لمشروعك.
const allowedOrigins = [
  'http://localhost:5173', // عشان التطوير المحلي
  'https://qanon-ai-full.vercel.app', // ده النطاق الرئيسي بتاع Production (هتغيره لنطاقك لو اتغير)
  /^https:\/\/qanon-ai-full-.+\.vercel\.app$/, // ده Regex عشان يطابق كل نطاقات الـ Preview زي اللي في الـ error
];

app.use(cors({
  origin: function (origin, callback) {
    // السماح للطلبات اللي مفيش ليها origin (زي تطبيقات الموبايل أو طلبات الـ curl)
    if (!origin) return callback(null, true);
    // التحقق إذا كان الـ origin الحالي موجود في الـ allowedOrigins أو يطابق الـ Regex
    if (allowedOrigins.some(pattern => typeof pattern === 'string' ? pattern === origin : pattern.test(origin))) {
      callback(null, true); // السماح بالطلب
    } else {
      // لو الـ origin مش مسموح بيه، نسجل الخطأ ونرفض الطلب
      console.log(`CORS Error: Origin ${origin} not allowed.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // السماح بالـ HTTP methods الشائعة
  credentials: true, // السماح بإرسال الـ cookies (لو هتستخدمها في المستقبل)
  optionsSuccessStatus: 204 // عشان طلبات الـ preflight (OPTIONS) ترجع status 204
}));

// --- نهاية تهيئة CORS الحاسمة ---


// Middleware للـ Debugging (اختياري، فعّله لو محتاجه)
app.use((req, res, next) => {
    // console.log(`DEBUG (Serverless): Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

// مسار اختباري (للتحقق إن الـ Backend شغال)
app.get('/', (req, res) => {
    res.send('Qanon.ai Backend is running!');
});

// ربط المسارات (Router Binding)
app.use('/api/tools/document-analysis', documentAnalysisRoutes);
app.use('/api/contract-management', contractManagementRoutes);
app.use('/api/risk-analysis', riskAnalysisRoutes);
app.use('/api/case-analysis', caseAnalysisRoutes);
app.use('/api/chat', chatRoutes); // مسارات المحادثة الجديدة
app.use('/api/users', express.json(), express.urlencoded({ extended: false }), userRoutes); // مسارات المستخدمين


// Middleware للتعامل مع الأخطاء (404 Not Found والأخطاء العامة)
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

// اتصال قاعدة البيانات (مرة واحدة عالمياً لدوال Serverless)
if (!global.isDbConnected) {
    connectDB();
    createWeaviateSchema();
    global.isDbConnected = true;
}

module.exports = app;