const express = require('express');
const router = express.Router();

/**
 * @route   GET
 * @desc    Get logged in user
 * @access  Private
 */
router.get('/', (req, res) => {
    res.send('User details');
});

/**
 * @route   POST
 * @desc    Auth User
 * @access  PUBLIC
 */
router.post('/', (req, res) => {
    res.send('Auth User');
});


module.exports = router;