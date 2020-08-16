const bcrypt = require("bcryptjs");

const checkInputs = (body) => {
    const {nickname,email,website,password} = body;
    return nickname || email || website || password;
}

const comparePasswords = (password,password_db) => {
    return bcrypt.compareSync(password,password_db);
};

const checkUser = (user,body) => {
    const {email,password} = body;
    return email === user.email || comparePasswords(password,user.password);
};  


 module.exports = {
     checkInputs,
     checkUser,
     comparePasswords
 };