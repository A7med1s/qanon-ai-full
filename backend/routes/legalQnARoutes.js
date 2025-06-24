const express = require('express');
const multer = require('multer'); 
const { protect } = require('../middleware/authMiddleware');
const { askLegalQuestion } = require('../controllers/legalQnAController');

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }); 

router.post('/ask', protect('basic'), upload.none(), askLegalQuestion); 

module.exports = router;
