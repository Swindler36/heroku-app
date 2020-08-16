const CustomError = require("../../helpers/error/customError");

const errorHandler = (err,req,res,next) => {
    console.log("Custom Error Handler");
    let customError = err;

    if(customError.name === "SyntaxError"){
        customError = new CustomError("Unexpected Syntax",400);
    }
    if(err.name === "ValidationError"){
        customError = new CustomError(err.message,400);
    }
    if(err.code === 11000 ){
        customError = new CustomError("Duplicate Key Found : Check Your Input");
    }
    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message || "Internal Server Error!" 
    });
}

module.exports = errorHandler;