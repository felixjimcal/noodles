const express = require("express");
const path = require("path");
// Initializations
const app = express();

// Settings 
// Si existe un puerto, usalo, sino usa el 3000
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// Middlewares (Funciones que seran ejecutadas antes de llegar al servidor, Hooks al fin y al cabo

// Global varaibles


// Routes


// Static Files


// Server listenning
app.listen(app.get("port"), () =>{
    console.log("Server on port: ", app.get("port"))
});