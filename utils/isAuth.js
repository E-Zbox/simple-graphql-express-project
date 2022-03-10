const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    let {
        headers: { "x-access-token": token },
    } = req;
    let user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
};
