var admin = require('firebase-admin');
var serviceAccount = require('./ServiceAccountKey.json');
const { apiResponse } = require('./src/common/apiResponse.middleware')

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

app.get('/',(req,res)=>{
    return res.send("listening....");
});

  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 