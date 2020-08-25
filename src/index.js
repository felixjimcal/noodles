const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash"); // send message between multiple views

// Initializations
const app = express();
require("./database");

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
// Middlewares 
// (Funciones que seran ejecutadas antes de llegar al servidor, Hooks al fin y al cabo
app.use(express.urlencoded({ extended: false })); // recivir info de los forumarios, extended false = sin imagenes
app.use(methodOverride("_method")); // para poder mandar PUT, DELETE en los forms
app.use(session({ // para autenticar usuario y almacenar temporalmente
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// ---------------------------------------------------------------
// Global varaibles
app.use((req, res, next) => {
    // almacena mensajes que sean succes_msg a traves de las vistas
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');


    // nodejs es de un solo thread, asi que indicamos next para 
    // continuar con la lista de tareas 
    next();
});

// ---------------------------------------------------------------
// Routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

// ---------------------------------------------------------------
// Static Files
app.use(express.static(path.join(__dirname, "public"))); // path public

// ---------------------------------------------------------------
// Server listenning
app.listen(app.get("port"), () => {
    console.log("Server on port: ", app.get("port"))
});
