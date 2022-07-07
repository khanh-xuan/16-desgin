const express = require('express')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/auth')


const User = require('../models/User')

const router = express.Router()

// @route GET api/auth
// @desc Check user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user)
            return res.status(400).json({ success: false, message: 'User not found' })

        res.json({ success: true, user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/auth/register
// @desc Register User
// @access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    //Simple validation 
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' })
    }

    try {
        //check for existing user
        const user = await User.findOne({ username })
        if (user)
            return res.status(400).json({ success: false, message: 'Username already taken' })

        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()

        //Return token 
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'User created sucesss', accessToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// @route POST api/auth/login
// @desc Login User
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //Simple validation 
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' })
    }
    try {
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        //Return token 
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Loggin sucesss', accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router