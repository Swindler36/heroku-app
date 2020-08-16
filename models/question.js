const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question : {
        type: String,
        required : [true,"please provide a question"]
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    q_id : {
        type:Number,
        unique : true
    },
    priority : {
        type: Number,
        default: 3,
        enum: [1,2,3,4,5] 
    }
});

module.exports = mongoose.model("Question",QuestionSchema);