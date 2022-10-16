class Utils {

    nullCheck(data){
        return (data==undefined || data==null) ? null : data;
    }

    formId(id){
        var today = Date.now();
        var id = id.substring(0,5)+"-"+today.valueOf();
        return id;
    }
}

module.exports.utils = new Utils();