const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {
    deleteUser : async (req, res) => {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch(err) {
            res.status(500).json("error in deleting user" + err);
        }
    },
    getUser : async (req, res) => {
        try{
            const user = await User.findById(req.params.id);
            
            if(!user) {
                res.status(404).json("User not found");
            }
            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;
            res.status(200).json(userData);
        } catch(err) {
            res.status(500).json("error in getting user" + err);
        }
    }
}