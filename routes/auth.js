const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middleware/auth');
const User = require('../models/Users');
/**
 * @route   GET
 * @desc    Get logged in user
 * @access  Private
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password, -__v');
        return res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

/**
 * @route   POST
 * @desc    Auth User
 * @access  PUBLIC
 */
router.post('/', [
    check('email', 'Please enter a valid email').isEmail().not().isEmpty(),
    check('password', 'Please enter a valid password').exists()
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        
        // check user if already exists
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials ' });
        }

        // now check password 
        const isMatch = bcrypt.compareSync(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials ' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get("JWTSECRET"),
            {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({token});
            }
        );

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;