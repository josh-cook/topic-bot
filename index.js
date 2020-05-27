const reviewers = require("./reviewers.json");

const date = new Date();
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const todaysDate = `${date.getFullYear()}-${month}-${date.getDate()}`;

console.log(todaysDate);
