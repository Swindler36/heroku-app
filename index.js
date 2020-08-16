const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const error_handler = require("./middlewares/error/custom-error-handler");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

dotenv.config({
    path: "./config/env/config.env"
});

connectDatabase();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000; 

app.use(session({
    secret : "cikitamuz",
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl : 30*24*60*60
    }),
}));


// Routers
app.use(routers);

// Custom Error Handler
app.use(error_handler);

app.listen(PORT,() => {
    console.log("Server starting.",PORT);
});