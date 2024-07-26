const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {

    createUser : async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            location: req.body.location,
        });
        try{
            await newUser.save();
            res.status(201).json({message: "User created successfully"});
        } catch(err) {
            res.status(500).json("error is creating user" + err);
        }
    },
    loginUser : async (req, res) => {
        try{
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(401).json("wrong credentials provide a valid email");
            }
            
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET).toString(CryptoJS.enc.Utf8);
            
            if(decryptedPassword !== req.body.password){
                res.status(401).json("wrong credentials enter valid password");
            }

            const userToken = jwt.sign(
                {
                    id: user.id,
                }, process.env.JWT_SEC, {expiresIn: "3d"}
            );

            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;

            res.status(200).json({...userData, token: userToken})

        } catch (err) {
            res.status(500).json("error in login" + err);
        }
    }
}
