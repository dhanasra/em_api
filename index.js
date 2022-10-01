var admin = require('firebase-admin');
var serviceAccount = require('./ServiceAccountKey.json');
const firebase = require('firebase/app');
const { apiResponse } = require('./src/common/apiResponse.middleware')

firebase.initializeApp({
    apiKey: 'AIzaSyA4mHTurOAIlUq8SQElygAAKL5VMuP2M2M',
    projectId: 'expense-manager-85104',
    storageBucket: 'gs://expense-manager-85104.appspot.com',
    messagingSenderId: '320129346407',
    databaseURL:'https://expense-manager-85104-default-rtdb.firebaseio.com/',
    credential: admin.credential.cert(serviceAccount)
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var express = require('express');

const { userApp } = require('./src/user/user.app')
const { cashbookApp } = require('./src/cashbook/cashbook.app')
const { paymentModeApp } = require('./src/paymentMode/paymentMode.app')
const { categoryApp } = require('./src/category/category.app')
const { partyApp } = require('./src/party/party.app')
const { cashEntryApp } = require('./src/cashEntry/cashEntry.app')
const { memberApp } = require('./src/member/member.app')
const { authApp } = require('./src/auth/auth.app')

const bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(apiResponse);

userApp(app);
cashbookApp(app);
partyApp(app);
paymentModeApp(app);
categoryApp(app);
cashEntryApp(app);
memberApp(app);
authApp(app);


app.get('/',(req,res)=>{
    return res.send("listening....");
});

  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 