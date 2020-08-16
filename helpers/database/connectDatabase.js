const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connection succesful.");
    })
    .catch(err => console.log(err));

};

module.exports = connectDatabase;