var admin = require('firebase-admin');
const { utils } = require('../extension');
const { cashbookRepo } = require('../cashbook/cashbook.repository')

const db = admin.firestore();

class CategoryRepository { 

    async create(data){

        var cashbookId = data.cashbook.id;
        delete data.cashbook

        var today = Date.now();
        var id = cashbookId.substring(0,5)+"-"+today.valueOf();
        data['id'] = id;

        var cashbookDetails = await cashbookRepo.details(cashbookId);
        var categories = cashbookDetails.categories;
        if(categories.some(e=>e['category']===data['category'])){
           return data; 
        }

        categories.push(data);
        await cashbookRepo.update(cashbookId,{"categories":categories});

        return data;
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