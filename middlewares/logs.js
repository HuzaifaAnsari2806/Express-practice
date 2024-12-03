const fs = require('fs');

const logs = (fileName) => {
    return (req, res, next) => {
        fs.appendFile(
            fileName,
            `${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
            (err, data) => next()
        );
    };
};

module.exports = logs;