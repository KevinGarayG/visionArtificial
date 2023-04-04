const fs = require("fs");
const path = require("path");
const express = require('express');
//requiero express para poder usarlo
const app = express()

//Requiero las rutas
const indexRouter = require("./routes/indexRouter");


//Configuro ejs como motor de plantilla
app.set("view engine", "ejs");

//uso expres para enviar a la ruta
app.use("/",indexRouter);




app.use(express.static(path.join(__dirname,'/public')));

app.listen(8000, ()=>{
    console.log('Servidor corriendo');
});