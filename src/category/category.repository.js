var admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { utils } = require('../extension');
const { cashbookRepo } = require('../cashbook/cashbook.repository')

const db = admin.firestore();

class CategoryRepository { 

    create(id, data){
        return new Promise((resolve, reject)=>{
            data['id'] = utils.formId(id);
            db.collection('Cashbook').doc(id).update({"categories" : FieldValue.arrayUnion(data)})
                .then(()=>resolve(data))
                .catch((e)=>reject(e));
        });
    }

    async list(id){

        var cashbookDetails = await cashbookRepo.details(id);
        return cashbookDetails.categories;
    }

    async details(id,categoryId){

        var cashbookDetails = await cashbookRepo.details(id);
        var categories = cashbookDetails.categories;
        var category = categories.filter(e=>e['id']===categoryId);

        return category;
    }

    async update(id,data){

        var cashbookDetails = await cashbookRepo.details(id);
        var categories = cashbookDetails.categories;
        var fCategories = categories.filter(e=>e['id']!==data['id']);
        fCategories.push(data);
        await cashbookRepo.update(id, {"categories":fCategories});

        return data;
    }

    async delete(id, categoryId){
        
        var cashbookDetails = await cashbookRepo.details(id);
        var categories = cashbookDetails.categories;
        var fCategories = categories.filter(e=>e['id']!==categoryId);
        await cashbookRepo.update(id, {"categories":fCategories});

        return id;
    }

}

module.exports.categoryRepo = new CategoryRepository()