const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const sample = async (req, res) => {
    try {
        return res.status(200).json({message: 'Tired'})
    } catch (error) {
        console.log('Error', error.message)
    }
}

const userSignUp = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        if(!firstName || !lastName || !email || !password){
            return res.json({
                message: "All fields 'firstName, lastName, email, password' are required."
            })
        }

        const userExists = await User.findByEmail(email);
        if(userExists){
            return res.json({message: "User with this email already exists"})
        }

        const user = await User.create(firstName, lastName, email, password);

        const accessToken = jwt.sign(
            {user},
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '72h'
            }
        )

        return res.json({
            message: 'Account creation successful',
            user: user,
            accessToken
        })
    } catch (error) {
        console.log('Error during account creation', error.message)
    }
}

const userSignIn = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({
                message: 'All fields"email, password" are required.'
            })
        }

        const user = await User.findByEmail(email)
        if(!user){
            return res.json({
                message: "No user found with this email."
            })
        }

        const passwordMatch = bcrypt.compare(password, user.password_hash)
        if(!passwordMatch){
            return res.json({
                message: "Invalid Password"
            })
        }

        const accessToken = jwt.sign({user}, process.env.JWT_SECRET_KEY, {
            expiresIn: '72h'
        })

        return res.json({
            message: 'Login Successful.',
            user: user,
            accessToken
        })
    } catch (error) {
        console.log('Error during account creation', error.message)
    }
}

const changePassword = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    sample,
    userSignUp,
    userSignIn,
    getUser
}