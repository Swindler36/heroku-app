const User = require("../../models/user");
const CustomError = require("../../helpers/error/customError");

const checkAuth = async (req,res,next) => {
    const website = req.get("host");
    const user = await User.findOne({website});
    if(!user){
        return next(new CustomError("You are not a member.",401));
    }
    next();
};

module.exports = {
    checkAuth
}