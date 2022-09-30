var admin = require('firebase-admin');
const { utils } = require('../extension');
const { cashbookRepo } = require('../cashbook/cashbook.repository')

const db = admin.firestore();

class PaymentModeRepository { 

    async create(data){

        var cashbookId = data.cashbook.id;
        delete data.cashbook

        var today = Date.now();
        var id = cashbookId.substring(0,5)+"-"+today.valueOf();
        data['id'] = id;

        var cashbookDetails = await cashbookRepo.details(cashbookId);
        var paymentModes = cashbookDetails["payment_modes"];
        if(paymentModes.some(e=>e['payment_mode']===data['payment_mode'])){
           return data; 
        }

        paymentModes.push(data);
        await cashbookRepo.update(cashbookId,{"payment_modes":paymentModes});

        return data;
    }

    async list(id){

        var cashbookDetails = await cashbookRepo.details(id);
        return cashbookDetails["payment_modes"];
    }

    async details(id,paymentModeId){

        var cashbookDetails = await cashbookRepo.details(id);
        var paymentModes = cashbookDetails["payment_modes"];
        var paymentMode = paymentModes.filter(e=>e['id']===paymentModeId);

        return paymentMode;
    }

    async update(id,data){

        var cashbookDetails = await cashbookRepo.details(id);
        var paymentModes = cashbookDetails["payment_modes"];
        var fPaymentModes = paymentModes.filter(e=>e['id']!==data['id']);
        fPaymentModes.push(data);
        await cashbookRepo.update(id, {"payment_modes":fPaymentModes});

        return data;
    }

    async delete(id, paymentModeId){
        
        var cashbookDetails = await cashbookRepo.details(id);
        var paymentModes = cashbookDetails["payment_modes"];
        var fPaymentModes = paymentModes.filter(e=>e['id']!==paymentModeId);
        await cashbookRepo.update(id, {"payment_modes":fPaymentModes});

        return id;
    }

}

module.exports.paymentModeRepo = new PaymentModeRepository()