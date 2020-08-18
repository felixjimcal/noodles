const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

// Initializations
const app = express();

// ---------------------------------------------------------------
// Settings 
// Si existe un puerto, usalo, sino usa el 3000
app.set("port", process.env.PORT || 3000);

// indicamos donde estan las vistas
app.set("views", path.join(__dirname, "views"));

// preapramos handlebars
app.engine(".hbs", exphbs({
    defaultLayour: "main", // plantilla html principal
    layoutsDir: path.join(app.get("views"), "layouts"), // path layouts
    partialsDir: path.join(app.get("views"), "partials"), // partes de views a reaprobechar, como formularios
    extname: ".hbs" // que extension tendran estos archivos
}));

// aplicar la configuracion superior
app.set("view engine", "hbs");
// ---------------------------------------------------------------
// Middlewares (Funciones que seran ejecutadas antes de llegar al servidor, Hooks al fin y al cabo

// ---------------------------------------------------------------
// Global varaibles


// ---------------------------------------------------------------
// Routes


// ---------------------------------------------------------------
// Static Files


// ---------------------------------------------------------------
// Server listenning
app.listen(app.get("port"), () =>{
    console.log("Server on port: ", app.get("port"))
});
