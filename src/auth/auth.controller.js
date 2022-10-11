const { ctx } = require("../common/ctx.singleton");
const { AuthError } = require("./auth.error");
const { authenticator } = require("./auth.library");
const { authRepo } = require("./auth.repository");

module.exports.getLoginType = async function (req, res) {
    const data = req.body;
    try {
        const payload = await authRepo.fetchSignInMethodForEmail(data);
        return res.api(
            200,
            'auth.checked',
            {
                payload
            }
        );
    } catch (e) {
        new AuthError().authErrorHandler(e,req,res);
    }
}

module.exports.register = async function (req, res) {
    const data = req.body;
    try {
        const payload = await authRepo.registerWithEmailAndPasword(data);
        return res.api(
            200,
            'auth.created',
            {
                payload
            }
        );
    } catch (e) {
        new AuthError().authErrorHandler(e,req,res);
    }
}

module.exports.login = async function (req, res) {
    const data = req.body;
    try {
        const payload = await authRepo.loginWithEmailAndPasword(data);
        return res.api(
            200,
            'user.authentication.succes',
            {
                payload
            }
        );
    } catch (e) {
        new AuthError().authErrorHandler(e,req,res);
    }
}

module.exports.getAccessToken = async function (req, res) {
    const data = req.body;
    try {
        const payload = await authRepo.getAccessToken(data);
        return res.api(
            200,
            'access-token.success',
            {
                payload
            }
        );
    } catch (e) {
        new AuthError().authErrorHandler(e,req,res);
    }
}

module.exports.verifyToken = async function (req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ').pop()
    try {
        const user = await authenticator.verifyToken(token);
        if (!user) {
            next(new AuthError());
        }
        req.user = user;
        ctx.user = user;
        next();
    } catch (e) {
        new AuthError().handler(401, req, res, next);
    }
}