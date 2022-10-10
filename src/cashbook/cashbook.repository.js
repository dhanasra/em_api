var admin = require('firebase-admin');
const { utils } = require('../extension');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { userRepo } = require('../user/user.repository')

const db = admin.firestore();

class CashbookRepository {

    async create(user, data){
        var uid = user.uid;
        var id = `CB-${uid}-${Date.now().valueOf()}`;

        data['id'] = id;
        data['categories'] = [];
        data['payment_modes'] = [];
        data['cash_balance'] = {
                'net_balance' : "0",
                'total_in' : "0",
                'total_out' : "0"
            };
        data['activity'] = [
                {
                    'action' : 'Created by',
                    'by' : user.email,
                    'at' : Date.now().valueOf()
                } 
            ]

        await db.collection('Cashbook').doc(id).set(data);
        await db.collection('User').doc(uid).update({"cashbooks" : FieldValue.arrayUnion(id)});

        return data;
    }

    async list(user){
        var uid = user.uid;
        var cashbooks = [];
        
        var userDetails = await userRepo.details(user);
        var oldCashbooks = userDetails.cashbooks;

        var snapshot = await db.collection('Cashbook').where("id", "in", oldCashbooks).get();

        snapshot.forEach(doc => {
            cashbooks.push(doc.data());
        });

        return cashbooks;
    }

    async details(id){
        var doc = await db.collection('Cashbook').doc(id).get();
        return doc.data();
    }

    async update(id,data){
        var result = await db.collection('Cashbook').doc(id).update(data);
        var data = await this.details(id);
        return data;
    }

    async delete(id){
        var result = await db.collection('Cashbook').doc(id).delete();
        return id;
    }

}

module.exports.cashbookRepo = new CashbookRepository()