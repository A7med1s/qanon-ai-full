const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { analyzeCase } = require('../controllers/caseAnalysisController');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze-case', protect('basic'), upload.single('file'), analyzeCase);

module.exports = router;