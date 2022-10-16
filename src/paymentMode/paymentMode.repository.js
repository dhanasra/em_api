var admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { utils } = require('../extension');
const { cashbookRepo } = require('../cashbook/cashbook.repository')

const db = admin.firestore();

class PaymentModeRepository { 

    create(id, data){
        return new Promise((resolve, reject)=>{
            data['id'] = utils.formId(id);
            db.collection('Cashbook').doc(id).update({"payment_modes" : FieldValue.arrayUnion(data)})
                .then(()=>resolve(data))
                .catch((e)=>reject(e));
        });
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