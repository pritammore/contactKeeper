const express = require('express');
const router = express.Router();

/**
 * @route   GET 
 * @desc    Get all contacts
 * @access  Private
 */
router.get('/', (req, res) => {
    res.send('get contacts')
});

/**
 * @route   POST
 * @desc    create contact
 * @access  Private
 */
router.post('/', (req, res) => {
    res.send('add contacts')
});

/**
 * @route   POST
 * @desc    create contact
 * @access  Private
 */
router.put('/:id', (req, res) => {
    res.send('update contact')
});

/**
 * @route   POST
 * @desc    create contact
 * @access  Private
 */
router.delete('/:id', (req, res) => {
    res.send('delete contact')
});


module.exports = router;