const { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signInWithCustomToken } = require("firebase/auth");
var admin = require('firebase-admin');

const auth = getAuth();

class AuthRepository {

    async registerWithEmailAndPasword(data){
        var userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        
        var idToken =await getAuth().currentUser.getIdToken(true);
        var refreshToken = userCredential.user.refreshToken;
        var tokenResult = await getAuth().currentUser.getIdTokenResult()

        var id_token = {
            "token": idToken,
            "refresh_token": refreshToken,
            "result":tokenResult
        };

        return id_token;
    }

    async loginWithEmailAndPasword(data){

        var value = await signInWithEmailAndPassword(auth, data.email, data.password)

        var idToken = await getAuth().currentUser.getIdToken(true);

        var id_token = {"token": idToken};

        return id_token;
    }

    // async verifyIdToken(token){
    //     const user = auth.currentUser;
    //     if(user){
    //         var decodedToken = await getAuth().verifyIdToken(token);
    //         const uid = decodedToken.uid;
    //         var isTokenExists = { "is_token_exists" : user.uid==uid };
    //         return isTokenExists;
    //     }else{
    //         var isValid = await this.signInWithCustomtoken(token);

    //         if(isValid){
    //             var decodedToken = await getAuth().verifyIdToken(token);
    //             const uid = decodedToken.uid;
    //             var isTokenExists = { "is_token_exists" : user.uid==uid };
    //         }else{
    //             var isTokenExists = { "is_token_exists" : false };
    //         }
    //     }
    // }

    // async signInWithCustomtoken(token){

    //     var userCredential = await signInWithCustomToken(auth, token);

    //     if(userCredential){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }



}

module.exports.authRepo = new AuthRepository();