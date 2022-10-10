var admin = require('firebase-admin');
const { utils } = require('../extension');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { cashbookRepo } = require('../cashbook/cashbook.repository')

const db = admin.firestore();

class MemberRepository { 

    async create(cashbookId,data){

        var id = data['mobile_number'].replace(/[^a-zA-Z]/g, "");

        var cashbookDetails = await cashbookRepo.details(cashbookId);
        var members = [];
        if(cashbookDetails.hasOwnProperty("members")){
            members = cashbookDetails.members;
        }

        if(members.some(e=>e['mobile_number']===data['mobile_number'])){
           return data; 
        }
        members.push(data);

        await cashbookRepo.update(cashbookId, {
            "is_private":false,
            "members":members
        });

        var docRef = db.collection('Member').doc(id);
        var doc = await docRef.get();

        var member = {
            "cashbook_id" : cashbookId,
            "role" : data['role']
        };
        
        if(doc.exists){
            await docRef.update({
                "cashbooks" : FieldValue.arrayUnion(member)
            });
        }else{
            var list = [member];
            await docRef.set({"cashbooks" : list});
        }

        return data;
    }

    async details(id){
        var data = await db.collection('Member').doc(id).get();
        return data.data();
    }

    async update(id,data){
        var memberId = data['mobile_number'];
        var cashbookDetails = await cashbookRepo.details(id);
        var memberDetails = await this.details(memberId);
        var members = cashbookDetails.members;
        var cashbooks = memberDetails.cashbooks;

        var member = members.filter(e=>e['mobile_number']===memberId);

        var cashbookRef = db.collection('Cashbook').doc(id);

        await cashbookRef.update({"members" : FieldValue.arrayRemove(member[0])});
        await cashbookRef.update({"members" : FieldValue.arrayUnion(data)});

        var cashbook = cashbooks.filter(e=>e['cashbook_id']===id);

        var memberRef = db.collection('Member').doc(memberId);

        var  rMember = {
            "cashbook_id" : id,
            "role" : data['role']
        };

        await memberRef.update({"cashbooks" : FieldValue.arrayRemove(cashbook[0])});
        await memberRef.update({"cashbooks" : FieldValue.arrayUnion(rMember)});

        return data;
    }

    async delete(id, memberId){

        var cashbookDetails = await cashbookRepo.details(id);
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

        return memberId;
    }

}

module.exports.memberRepo = new MemberRepository()