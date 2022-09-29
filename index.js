var express = require('express');

var app = express();
var PORT = process.env.PORT;
  
app.get('/', (req, res) => {
  res.send("GET Request Called")
})
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 