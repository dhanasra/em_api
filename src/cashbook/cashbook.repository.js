var admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { userRepo } = require('../user/user.repository')

const db = admin.firestore();

class CashbookRepository {

    create(user, data){
        return new Promise((resolve, reject)=>{
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
                        'action' : 'Created',
                        'by' : user.email,
                        'at' : Date.now().valueOf()
                    } 
                ]
    
            db.collection('Cashbook').doc(id).set(data)
                .then(async ()=>{
                    await db.collection('User').doc(uid).update({"cashbooks" : FieldValue.arrayUnion(id)});
                    resolve(data);
                })
                .catch((e)=>{
                    reject(e.code);
                });
        })
    }

    async list(user){
        return new Promise((resolve, reject)=>{
            var cashbooks = [];
        
            userRepo.details(user).then((userDetails)=>{
                var oldCashbooks = userDetails.cashbooks;
    
                if(oldCashbooks.length==0){
                    return [];
                }
        
                db.collection('Cashbook').where("id", "in", oldCashbooks).get()
                    .then((snapshot)=>{
                        snapshot.forEach(doc => {
                            cashbooks.push(doc.data());
                        });
                        resolve(cashbooks);
                    });
            })
            .catch((e)=>{
                reject(e.code);
            });

        })
    }

    async details(id){
        return new Promise((resolve, reject)=>{
            db.collection('Cashbook').doc(id).get()
                .then((doc)=>resolve(doc.data()))
                .catch((e)=>reject(e.code))
        })
    }

    async update(id,data){
        return new Promise((resolve, reject)=>{
            db.collection('Cashbook').doc(id).update(data)
                .then(async (val)=>{
                    var data = await this.details(id);
                    resolve(data);
                })
                .catch((e)=>reject(
                    e.code
                ))
        })
    }

    async delete(id){
        return new Promise((resolve, reject)=>{
            db.collection('Cashbook').doc(id).delete()
                .then((val)=>resolve(val))
                .catch((e)=>reject(e.code))
        })
    }

}

module.exports.cashbookRepo = new CashbookRepository()