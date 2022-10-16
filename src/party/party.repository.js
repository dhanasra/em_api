var admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { utils } = require('../extension');
const { userRepo } = require('../user/user.repository')

const db = admin.firestore();

class PartyRepository { 

    create(user, data){
        return new Promise((resolve, reject)=>{
            data['id'] = utils.formId(user.uid);
            db.collection('User').doc(user.uid).update({"parties" : FieldValue.arrayUnion(data)})
                .then(()=>resolve(data))
                .catch((e)=>reject(e));
        });
    }

    async list(id){

        var userDetails = await userRepo.details(id);
        return userDetails.parties;
    }

    async details(id,partyId){

        var userDetails = await userRepo.details(id);
        var parties = userDetails.parties;
        var party = parties.filter(e=>e['id']===partyId);

        return party;
    }

    async update(id,data){

        var userDetails = await userRepo.details(id);
        var parties = userDetails.parties;
        var fParties = parties.filter(e=>e['id']!==data['id']);
        fParties.push(data);
        await userRepo.update(id, {"parties":fParties});

        return data;
    }

    async delete(id, partyId){

        var userDetails = await userRepo.details(id);
        var parties = userDetails.parties;
        var fParties = parties.filter(e=>e['id']!==partyId);
        await userRepo.update(id, {"parties":fParties});

        return id;
    }

}

module.exports.partyRepo = new PartyRepository()