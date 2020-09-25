const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const User = require('../models/Users');
const Contact = require('../models/Contact');

/**
 * @route   GET 
 * @desc    Get all contacts
 * @access  Private
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        return res.send(contacts);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/**
 * @route   POST
 * @desc    create contact
 * @access  Private
 */
router.post('/', [authMiddleware, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, phone, type } = req.body;
        // add contact to db
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        return res.json(contact);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/**
 * @route   POST
 * @desc    create contact
 * @access  Private
 */
router.put('/:id', [authMiddleware, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail()
]], async (req, res) => {
    const { name, email, phone, type } = req.body;

    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        // first find the contact in database by id 
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found' });

        // make sur euser owns the contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        // update the contact
        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactFields }, 
            { new: true });

        res.json(contact);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/**
 * @route   POST
 * @desc    create contact
 * @access  Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    
    try {
        // first find the contact in database by id 
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found' });

        // make sur euser owns the contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        // update the contact
        await Contact.findByIdAndRemove(req.params.id);

        res.json({msg: 'Contact Removed'});

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }

});


module.exports = router;