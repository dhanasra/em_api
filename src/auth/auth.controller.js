const { authRepo } = require("./auth.repository");

module.exports.register = async function (req, res) {
    const data = req.body
    const r_token = req.headers['authorization'];
    var user = await authRepo.registerWithEmailAndPasword(data);
    return res.api(
        200,
        'auth.created',
        {
            user
        }
    );
}

module.exports.login = async function (req, res) {
    const data = req.body
    var user = await authRepo.loginWithEmailAndPasword(data);
    return res.api(
        200,
        'login.success',
        {
            user
        }
    );
}

module.exports.verifyToken = async function (req, res) {
    const data = req.body.token;
    var isTokenExists = await authRepo.verifyIdToken(data);
    return res.api(
        200,
        'token.verified',
        {
            isTokenExists
        }
    );
}