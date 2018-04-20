var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            // can't find user; drop to catch
            return Promise.reject();
        }

        // store user and token on the req for further processing
        req.user = user;
        req.token = token;

        // execute next route handler
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};