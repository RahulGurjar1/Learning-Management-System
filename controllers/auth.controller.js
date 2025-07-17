const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req,res)=>{
    const {email,password,firstname,lastname}=req.body;
    // console.log(email, password, firstname, lastname);

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already registered with this email"});
        }
        const hashedPwd = await bcrypt.hash(password, 13);
        const newUser = new User({email,password:hashedPwd,firstname,lastname});
        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
    } catch(err){
        console.error("Registration error: ", err);
        res.status(500).json({message: "Error registering user"});
    }
}

const login =async(req,res)=>{
    const {email,password}=req.body;
    // console.log(email, password);
    try{
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({message: "User not Registed"});
        }
        else{
            const pwdValid= await bcrypt.compare(password, user.password);
            if(!pwdValid){
                return res.status(400).json({message: "Invalid password"});
            }
            // console.log("Password matched");
            const token = jwt.sign(
                { id: user._id,email:user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            // console.log("Login successful, token generated", token);
            res.json({token});
        }
    } catch(err){
        res.status(500).json({message: "Error logging in user"});
    }
}

module.exports = {register,login};