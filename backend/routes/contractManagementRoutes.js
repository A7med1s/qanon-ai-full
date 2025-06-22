const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
    createContract,
    rephraseContract
} = require('../controllers/contractManagementController');

const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

router.post('/create-contract', protect('basic'), upload.single('file'), createContract);
router.post('/rephrase-contract', protect('basic'), upload.single('file'), rephraseContract);

module.exports = router;