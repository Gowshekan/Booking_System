const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

exports.signup = async (req, res) => {
    try {
        console.log('Signup request:', req.body);
        
        // Set timeout for database operation
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database timeout')), 10000)
        );
        
        const createUserPromise = User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || "customer",
            phone: req.body.phone,
            address: req.body.address
        });
        
        const newUser = await Promise.race([createUserPromise, timeoutPromise]);
        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        

        
        res.status(400).json({
            status: "fail",
            message: error.message || 'Registration failed'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide email and password"
            });
        }

        // Set timeout for database operation
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database timeout')), 10000)
        );
        
        const findUserPromise = User.findOne({email}).select("+password");
        const user = await Promise.race([findUserPromise, timeoutPromise]);

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect email or password"
            });
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: "success",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (error) {

        
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            results: users.length,
            users
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};