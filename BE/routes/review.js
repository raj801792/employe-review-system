const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authenticat = require('../middleware/authenticat');

const reviewController = require('../controllers/review_controller');

router.post('/create/:id', authenticat, reviewController.create);
router.delete('/destroy/:id', authenticat, reviewController.destroy);
router.put('/update/:id', authenticat, reviewController.update);

module.exports = router;