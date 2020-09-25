const express = require('express');
const router = express.Router();

/**
 * @route   POST 
 * @desc    Register a user
 * @access  Public
 */
router.post('/', (req, res) => {
    res.send('User created')
});

module.exports = router;