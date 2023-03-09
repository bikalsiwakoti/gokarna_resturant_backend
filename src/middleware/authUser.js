const jwt = require("jsonwebtoken");
const User = require("../models/user");


module.exports.verifyUser = async function (req, res, next) {
    try {
        const token = req.cookies.loginToken;
        if (!token) {
            return res.status(404).json({ status: false, message: "Fail to authenticate Member" });
        }
        jwt.verify(token, "secretkey", async (err, data) => {
            if (err) {
                return res.status(404).json({ status: false, message: "Token not valid" });
            }
            User.findOne({ _id: data._id })
                .then(function (userData) {
                    req.user = userData;
                    next();
                })
                .catch(function (userData) {
                    return res.status(403).json({ success: false, error: "Auth failed." });
                });
        });
    } catch (e) {
        return res.status(403).json({ status: false, message: e.message });
    }
};



module.exports.verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split("=")[1];
        if (!token) {
            return res.status(404).json({ status: false, message: "Fail to authenticate admin" });
        }
        jwt.verify(token, "secretkey", async (err, data) => {
            if (err) {
                return res.status(404).json({ status: false, message: "Token not valid" });
            }
            User.findOne({ _id: data.id })
                .then(function (userData) {
                    req.user = userData;
                    if(userData.isAdmin){
                        next();
                    }else{
                    return res.status(403).json({ success: false, error: "Only Admin can authorized" });
                    }
                })
                .catch(function (userData) {
                    return res.status(403).json({ success: false, error: "Auth failed." });
                });
        });
    } catch (e) {
        return res.status(403).json({ status: false, message: e.message });
    }
};