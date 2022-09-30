var admin = require('firebase-admin');
const { utils } = require('../extension');

const db = admin.firestore();

class UserRepository {

    async create(data){
        
        data['created_at'] = Date.now().valueOf().toString();
        data['updated_at'] = Date.now().valueOf().toString();
        data['picture'] = null;
        data['cashbooks'] = [];
        data['parties'] = [];

        var result = await db.collection('User').doc(data.id).set(data);
        return data;
    }

    async details(id){
        var doc = await db.collection('User').doc(id).get();
        return doc.data();
    }

    async update(id,data){
        var result = await db.collection('User').doc(id).update(data);
        var user = await this.details(id);
        return user;
    }

    async delete(id){
        var result = await db.collection('User').doc(id).delete();
        return id;
    }

}

module.exports.userRepo = new UserRepository()