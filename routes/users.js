const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/Users');

/**
 * @route   POST 
 * @desc    Register a user
 * @access  Public
 */
router.post('/', 
    [
        check('name', 'Please add name')
        .not()
        .isEmpty(),
        check('email', 'Please add a valid email')
        .isEmail(),
        check('password', 'Please enter a password 6 or more characters')
        .isLength({ min:6 })
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        // check user if already exists
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

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