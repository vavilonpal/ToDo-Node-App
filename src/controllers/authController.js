'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

// секрет лучше хранить в .env
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRES_IN = '1h';

module.exports = {

    // POST /register
    register: async (req, res) => {
        try {
            const {username, email, password, role} = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({message: 'All fields are required'});
            }

            const existingUser = await User.findOne({
                where: {email}
            });
            if (existingUser) {
                return res.status(409).json({message: 'Email already in use'});
            }

            const existingUsername = await User.findOne({
                where: {username}
            });
            if (existingUsername) {
                return res.status(409).json({message: 'Username already taken'});
            }

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

            if (!email || !password) {
                return res.status(400).json({message: 'Email and password required'});
            }

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
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({message: 'Token required'});
            }

            const token = authHeader.split(' ')[1];

            // Проверка токена
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({message: 'Invalid or expired token'});
                }

                const user = await User.findByPk(decoded.userId, {
                    attributes: ['id', 'username', 'email', 'role', 'created_at']
                });

                if (!user) {
                    return res.status(404).json({message: 'User not found'});
                }

                res.status(200).json({user});
            });
        } catch (error) {
            console.error('Profile error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
};
