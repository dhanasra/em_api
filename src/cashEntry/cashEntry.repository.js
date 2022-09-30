var admin = require('firebase-admin');

const db = admin.firestore();

class CashEntryRepository { 

    

    async create(cashbookId,data){

        var today = Date.now();
        var id = "CE-"+cashbookId.substring(0,5)+"-"+today.valueOf();
        data['id'] = id;
        data['activity'] = [
            {
                'action' : 'Created by',
                'by' : 'Dhana',
                'at' : today.valueOf()
            }
        ]

        var result = await db.collection('Cashbook').doc(cashbookId).collection('CashEntry').doc(id).set(data);
        return data;
    }

    async list(id){

        var cashEntries = [];
        var snapshot = await db.collection('Cashbook').doc(id).collection('CashEntry').get();
        snapshot.forEach(doc => {
            cashEntries.push(doc.data());
        });

        return cashEntries;
    }

    async details(id, cashEntryId){
        var doc = await db.collection('Cashbook').doc(id).collection('CashEntry').doc(cashEntryId).get();
        return doc.data();
    }

    async update(id,cashEntryId,data){
        var result = await db.collection('Cashbook').doc(id).collection('CashEntry').doc(cashEntryId).update(data);
        var data = await this.details(id, cashEntryId);
        return data;
    }

    async delete(id, cashEntryId){
        var result = await db.collection('Cashbook').doc(id).collection('CashEntry').doc(cashEntryId).delete();
        return cashEntryId;
    }

}

module.exports.cashEntryRepo = new CashEntryRepository()