const { getAuth } = require("firebase/auth");
var admin = require('firebase-admin');
const { AuthError } = require("./auth.error");
const { ctx } = require("../common/ctx.singleton");

class Authenticator {
    generateToken(){
        
    }

    verifyToken (token) {
        return new Promise((resolve, reject)=>{
            admin.auth().verifyIdToken(token)
                .then(async (decodedToken) => {
                    var uid = decodedToken.uid;
                    var user = await  admin.auth().getUser(uid);
                    resolve(user);
                })
                .catch((error) => {
                    reject(new AuthError());
                })
        })
    }
}

module.exports.authenticator = new Authenticator()