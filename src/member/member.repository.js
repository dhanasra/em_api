var admin = require('firebase-admin');
const { utils } = require('../extension');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { cashbookRepo } = require('../cashbook/cashbook.repository')

const db = admin.firestore();

class MemberRepository { 

    create(cashbookId,data){

        return new Promise((resolve, reject)=>{
            var id = data['mobile_number'];

            cashbookRepo.details(cashbookId)
            .then((cashbookDetails)=>{
                var members = [];
                if(cashbookDetails.hasOwnProperty("members")){
                    members = cashbookDetails.members;
                }
        
                if(members.some(e=>e['mobile_number']===data['mobile_number'])){
                   return data; 
                }
                members.push(data);

                cashbookRepo.update(cashbookId, {
                    "is_private":false,
                    "members":members
                }).then(async ()=>{
                    var docRef = db.collection('Member').doc(id);
                    var doc = await docRef.get();
            
                    var member = {
                        "cashbook_id" : cashbookId,
                        "role" : data['role']
                    };
            
                    if(doc.exists){
                        docRef.update({
                            "cashbooks" : FieldValue.arrayUnion(member)
                        }).then(()=> resolve(data));
                    }else{
                        var list = [member];
                        docRef.set({"cashbooks" : list})
                        .then(()=>resolve(data));
                    }
                })
            })
            .catch((e)=>{
                reject(e.code);
            });
        })
    }

    async details(id){
        return new Promise((resolve, reject)=>{
            db.collection('Member').doc(id).get()
                .then((doc)=>resolve(doc.data()))
                .catch((e)=>reject(e.code))
        })
    }

    async update(id,data){

        return new Promise((resolve, reject)=>{
            var memberId = data['mobile_number'];
            cashbookRepo.details(id)
                .then(async (cashbookDetails)=>{
                    var memberDetails = await this.details(memberId);
                    var members = cashbookDetails.members;
                    var cashbooks = memberDetails.cashbooks;
            
                    var member = members.filter(e=>e['mobile_number']===memberId);
            
                    var cashbookRef = db.collection('Cashbook').doc(id);
            
                    cashbookRef.update({"members" : FieldValue.arrayRemove(member[0])})
                        .then(()=>{
                            cashbookRef.update({"members" : FieldValue.arrayUnion(data)})
                                .then(async ()=>{
                                    var cashbook = cashbooks.filter(e=>e['cashbook_id']===id);
            
                                    var memberRef = db.collection('Member').doc(memberId);
                            
                                    var  rMember = {
                                        "cashbook_id" : id,
                                        "role" : data['role']
                                    };
                            
                                    await memberRef.update({"cashbooks" : FieldValue.arrayRemove(cashbook[0])});
                                    await memberRef.update({"cashbooks" : FieldValue.arrayUnion(rMember)});
                                    resolve(data);
                                })
                        })
                })
                .catch((e)=>reject(e.code));
        })
    }

    async delete(id, memberId){

        cashbookRepo.details(id)
            .then(async (cashbookDetails)=>{
                var memberDetails = await this.details(memberId);
                var members = cashbookDetails.members;
                var cashbooks = memberDetails.cashbooks;
        
                var member = members.filter(e=>e['mobile_number']===memberId);
        
                await db.collection('Cashbook').doc(id).update({
                    "members" : FieldValue.arrayRemove(member[0])
                })
        
                var cashbook = cashbooks.filter(e=>e['cashbook_id']===id);
        
                await db.collection('Member').doc(memberId).update({
                    "cashbooks" : FieldValue.arrayRemove(cashbook[0])
                });
                resolve(memberId);
            })
            .catch((e)=>reject(e.code));
    }

}

module.exports.memberRepo = new MemberRepository()