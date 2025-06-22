const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { analyzeRisks } = require('../controllers/riskAnalysisController');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze-risks', protect('basic'), upload.single('file'), analyzeRisks);

module.exports = router;