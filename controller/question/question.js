const Question = require("../../models/question");
const CustomError = require("../../helpers/error/customError");
const asyncErrorWrapper = require("express-async-handler");
const { checkQuestion } = require("../../helpers/api/check");

const setQuestion = asyncErrorWrapper( async (req,res,next) => {
    const { question,priority} = req.body;
    
});


const sendQuestion = asyncErrorWrapper ( async (req,res,next) => {
    const { question,state } = req.query;
    let pac = {};
    let q;
    const isInput = checkQuestion(question,state);
    if(!isInput){ return next(new CustomError("Check Your Inputs",400)); }
    if( question != "" ){
        q = await Question.find({question: {$regex : '.*' + question + '.*'}}).limit(5).sort('priority')[0];
    }else{
        switch (state) {
            case "ERROR":
                // error 404 page
                break;
        
            default:
                break;
        }
    }

    res.send(q);
    //await asyn

    // http://localhost:5000/v1/api/send/question?question=abc&state=
});

module.exports = {
    setQuestion,
    sendQuestion
}