const checkQuestion = (question,state) => {
    return question != "" || state === undefined;
}

module.exports = {
    checkQuestion
}