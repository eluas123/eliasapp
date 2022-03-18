const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

exports.authToken = (req, res, next) => {
    let token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ msg: "you must send token" });
    }
    try {
        let decodeToken = jwt.verify(token, `${config.tokenSecret}`);
        req.tokenData = decodeToken;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "token invalid or expired" });
    }
}