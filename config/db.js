const mongoose = require("mongoose");

async function connectMongoDb(url) {
    mongoose.connect(url)
        .then(() => console.log("MongoDB Conected"))
        .catch(err => console.log(err));
}

module.exports = connectMongoDb;