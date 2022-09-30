class Utils {

    nullCheck(data){
        return (data==undefined || data==null) ? null : data;
    }
}

module.exports.utils = new Utils();