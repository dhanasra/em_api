var admin = require('firebase-admin');
const { utils } = require('../extension');

const db = admin.firestore();

class CashEntryRepository { 

    create(cashbookId,data){

        return new Promise((resolve, reject)=>{
            data['id'] = utils.formId(cashbookId)
            data['activity'] = [
                {
                    'action' : 'Created',
                    'by' : 'Dhana',
                    'at' : Date.now()
                }
            ]
            db.collection('Cashbook').doc(cashbookId).collection('CashEntry').doc(data['id']).set(data)
                .then(()=>resolve(data))
                .catch((e)=>reject(e));
        })
    }

    list(id){
        var cashEntries = [];
        return new Promise((resolve, reject)=>{
            db.collection('Cashbook').doc(id).collection('CashEntry').get()
            .then((snapshot)=>{
                snapshot.forEach(doc => {
                    cashEntries.push(doc.data());
                });
                resolve(cashEntries);
            })
            .catch((e)=>reject(e));
        })
    }

    details(id, cashEntryId){
        return new Promise((resolve, reject)=>{
            db.collection('Cashbook').doc(id).collection('CashEntry').doc(cashEntryId).get()
                .then((doc)=>{
                    resolve(doc.data());
                })
                .catch((e)=>reject(e));
        }) 
    }

    update(id,cashEntryId,data){
        return new Promise((resolve, reject)=>{
            db.collection('Cashbook').doc(id).collection('CashEntry').doc(cashEntryId).update(data)
            .then(async()=>{
                var data = await this.details(id, cashEntryId);
                resolve(data);
            })
            .catch((e)=>reject(e));
        })   
    }

    delete(id, cashEntryId){
        return new Promise((resolve, reject)=>{
            db.collection('Cashbook').doc(id).collection('CashEntry').doc(cashEntryId).delete()
            .then(()=>{
                resolve(cashEntryId);
            })
            .catch((e)=>reject(e));
        })
    }

}

module.exports.cashEntryRepo = new CashEntryRepository()