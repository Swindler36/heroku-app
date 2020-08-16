const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nickname : {
        type: String,
        required : [true,"please provide a nickname"]
    },
    email : {
        type: String,
        required : [true,"please provide a email"],
        unique :  true,
        match : [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "please provide a valid email"
        ]
    },
    role : {
        type: String,
        default: "user",
        enum : ["user","admin"]
    },
    password : {
        type : String,
        minlength : [6,"please provide a pasword with min length 6"],
        required: [true,"please provide a password"],
        select : false
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    website : {
        type:String,
        required : [true,"Please enter your website url."]
    },
    blocked : {
        type: Boolean,
        default: false
    }
});

// pre hook
UserSchema.pre("save",function (next){
    // parola değişmemişse
    if(!this.isModified("password")){
        next();
    }

    bcrypt.genSalt(10, (err,salt) => {
        if(err) next(err);
        bcrypt.hash(this.password, salt,(err,hash) => {
            if(err) next(err);
            this.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model("User",UserSchema);