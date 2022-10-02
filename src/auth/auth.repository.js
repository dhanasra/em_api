const { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signInWithPopup } = require("firebase/auth");
const requestP = require('request-promise');
const { apiKey } = require("../firebase.config");

const auth = getAuth();

class AuthRepository {

    registerWithEmailAndPasword(data){
        return new Promise((resolve, reject)=>{
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(async (userCredential)=>{
                    var access_token = userCredential.user.accessToken;
                    var refresh_token = userCredential.user.refreshToken;
                    var uid = userCredential.user.uid;
                    resolve({
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "uid":uid
                    });
                })
                .catch((e)=>{
                    reject(e.code);
                })
        })
    }

    loginWithEmailAndPasword(data){
        return new Promise((resolve, reject)=>{
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then(async (userCredential)=>{
                    var access_token = userCredential.user.accessToken;
                    var refresh_token = userCredential.user.refreshToken;
                    var uid = userCredential.user.uid;
                    resolve({
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "uid":uid
                    });
                })
                .catch((e)=>{
                    reject(e.code);
                })
        })
    }

    getAccessToken(data){

        const refreshToken = data.refresh_token;
        const headers = {'content-type': 'application/x-www-form-urlencoded'};
        const refreshTokenUrl = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;
        const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;

        return new Promise((resolve, reject)=>{
            requestP.post({
                headers: headers,
                url: refreshTokenUrl,
                body: body,
                json: true    
            }).then((data)=>{
                resolve({
                    "access_token": data.access_token,
                    "refresh_token": data.refresh_token,
                    "uid":data.user_id
                });
            }).catch(e=>{
                reject(e.error);
            });
        })
    }

}

module.exports.authRepo = new AuthRepository();