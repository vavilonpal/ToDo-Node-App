'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

module.exports = {

    // POST /register
    register: async (req, res) => {
        try {
            const {username, email, password, role} = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                role: role || 'user'
            });

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },

    // POST /login
    login: async (req, res) => {
        try {
            const {email, password} = req.body;


            const user = await User.findOne({where: {email}});
            if (!user) {
                return res.status(401).json({message: 'Invalid email or password'});
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({message: 'Invalid email or password'});
            }

            // Генерация JWT
            const token = jwt.sign(
                {
                    userId: user.id,
                    username: user.username,
                    role: user.role
                },
                JWT_SECRET,
                {expiresIn: JWT_EXPIRES_IN}
            );

            res.status(200).json({
                message: 'Login successful',
                token
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },

    // GET /profile
    profile: async (req, res) => {
        try {
            res.json({
                message: 'User profile loaded successfully',
                user: req.user
            });
        } catch (error) {
            console.error('Profile error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
};
