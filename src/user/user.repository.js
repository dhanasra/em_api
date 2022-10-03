var admin = require('firebase-admin');
const { getAuth, updateProfile } = require("firebase/auth");

const auth = getAuth();
const db = admin.firestore();

class UserRepository {

    create(user, data){
        return new Promise((resolve, reject)=>{
            var uid = user.uid;
            var name = `${data['first_name']} ${data['last_name']}`;
            data['picture'] = null;
            data['cashbooks'] = [];
            data['parties'] = [];
            data['activity'] = [
                {
                    'action' : 'Created by',
                    'by' : name,
                    'at' : Date.now().valueOf()
                } 
            ]

            db.collection('User').doc(uid).set(data)
                .then(async ()=>{
                    await admin.auth().updateUser(uid, {displayName : name});
                    resolve(data);
                })
                .catch((e)=>{
                    reject(e.code);
                })
        })
    }

    details(user){
        var uid = user.uid;
        return new Promise((resolve, reject)=>{
            db.collection('User').doc(uid).get()
                .then((doc)=>resolve(doc.data()))
                .catch((e)=>reject(e.code))
        })
    }

    update(user,data){
        var uid = user.uid;
        return new Promise((resolve, reject)=>{
            db.collection('User').doc(uid).update(data)
                .then(async (val)=>{
                    if("first_name" in data || "last_name" in data){
                        var user = await  admin.auth().getUser(uid);
                        var first_name = "first_name" in data ? data["first_name"] : user.displayName.split(" ").pop(); 
                        var last_name = "last_name" in data ? data["last_name"] : user.displayName.split(" ")[1]; 
                        var name = `${first_name} ${last_name}`;
                        await admin.auth().updateUser(uid, {displayName : name});
                    }
                    resolve(val);
                })
                .catch((e)=>reject(
                    e.code
                ))
        })
    }

    delete(user){
        var uid = user.uid;
        return new Promise((resolve, reject)=>{
            db.collection('User').doc(uid).delete()
                .then((val)=>resolve(val))
                .catch((e)=>reject(e.code))
        })
    }

}

module.exports.userRepo = new UserRepository()