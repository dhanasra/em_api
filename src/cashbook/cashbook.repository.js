var admin = require('firebase-admin');
const { utils } = require('../extension');
const { userRepo } = require('../user/user.repository')

const db = admin.firestore();

class CashbookRepository {

    async create(userId, data){

        var id = `CB-${userId}-${Date.now().valueOf()}`;

        var user = await userRepo.details(userId);
        var author = `${user.first_name} ${user.last_name}`;
        
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
                    'by' : author,
                    'at' : Date.now().valueOf()
                } 
            ]

        await db.collection('Cashbook').doc(id).set(data);

        var cashbooks = user.cashbooks;
        cashbooks.push(id);
        await userRepo.update(userId,{"cashbooks":cashbooks});

        return data;
    }

    async list(id){
        var cashbooks = [];
        
        var userDetails = await userRepo.details(id);
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