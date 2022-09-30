var admin = require('firebase-admin');
const { utils } = require('../extension');
const { userRepo } = require('../user/user.repository')

const db = admin.firestore();

class PartyRepository { 

    async create(data){

        var userId = data.user.id;
        delete data.user

        var today = Date.now();
        var id = userId.substring(0,5)+"-"+today.valueOf();
        data['id'] = id;

        var userDetails = await userRepo.details(userId);
        var parties = userDetails.parties;
        if(parties.some(e=>e['mobile_number']===data['mobile_number'])){
           return data; 
        }

        parties.push(data);
        await userRepo.update(userId,{"parties":parties});

        return data;
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