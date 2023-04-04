var express = require('express');
var app = express();

app.get('/', function (req, res) {

    console.log("Solicitud.." + req.query.movimiento);
    res.send("Este es el servidor..");

});

app.use(express.static('public'));

app.listen(8000, function(){
    console.log("servidor en funcionamiento xd");
});