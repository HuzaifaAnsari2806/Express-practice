const bcrypt = require('bcrypt');

const checkHashedPassword = async (password, hashedPassword) => {
    const isMatch = bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports = {
    checkHashedPassword
};