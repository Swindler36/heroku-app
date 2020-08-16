const User = require("../../models/user");
const CustomError = require("../../helpers/error/customError");
const asyncErrorWrapper = require("express-async-handler");
const { checkInputs,checkUser } = require("../../helpers/auth/input");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const signIn = asyncErrorWrapper( async (req,res,next) => {
    const {nickname,email,password,website} = req.body;
    
    if(!checkInputs(req.body)) return next(new CustomError("Check Your Inputs",400));
    req.session.email = email;
    req.session.nickname = nickname;

    const user = await User.create({
        nickname, 
        email,
        password,
        website
    });
    res
    .status(200)
    .json({
        success: true,
        data:{
            name:user.nickname,
            email:user.email
        }
    });
});

const deleteAccount = asyncErrorWrapper( async (req,res,next) => {
    if( !(checkInputs(req.body) === undefined) ){
        const {email} = req.body; 
        const user = await User.findOne({email});
        const isUser = checkUser(user,req.body);
        if( (!isUser) ){
            return next(new CustomError("You are not authorized to delete account.",401));
        }
    }else{
        return next(new CustomError("Check Your Inputs",400));
    }

    const email = req.body.email; 
    await User.deleteOne({email});
    res
    .status(200)
    .json({
        success : true,
        message:"The account is deleted successfully"
    })
});
 
const login = asyncErrorWrapper( async (req,res,next) => {
    const email = req.session.email;
    const nickname = req.session.nickname;
    const user = await User.findOne({email,nickname});

    if(!user){
        return next(new CustomError("You are not authorized to login.",401));
    }
    res.json({
        success : true,
        message:"Login is successful"
    });

});

module.exports = {
    signIn,
    deleteAccount,
    login
}