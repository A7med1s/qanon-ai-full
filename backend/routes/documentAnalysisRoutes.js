const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
    summarizeText,
    extractInformation,
    rephraseText
} = require('../controllers/documentAnalysisController');

const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

router.post('/summarize', protect('basic'), upload.single('file'), summarizeText); 
router.post('/extract-info', protect('basic'), upload.single('file'), extractInformation);
router.post('/rephrase-text', protect('basic'), upload.single('file'), rephraseText);

module.exports = router;