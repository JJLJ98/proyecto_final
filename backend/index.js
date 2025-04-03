//Importar módulos
const express   = require("express") ; 
const http      = require('http') ; 
const path      = require("path") ;
const morgan    = require("morgan") ;
const bp        = require("body-parser") ;
const cors      = require("cors") ;
const mongoose = require("mongoose");

const hostname = "localhost" ;
const port = 3000 ;

const app = express() ;

//Inicializar variables
app.use(morgan('dev'));
app.use(bp.json()) ;
app.use(cors()) ;

//Llamado servicios
require('./rutas/rlibros')(app) ;
//
require('./rutas/rautores')(app) ;

app.use( express.static( path.join(__dirname,'../frontend/paginas'))) ;

app.use((req,res) =>{
    res.statusCode = 200 ;
    res.setHeader('Content-Type', 'text/html') ;
    res.end('<html><head><title>Servisor_express</title></head><body><h1>Servidor con express</h1></body></html>')
}) ;

const server = http.createServer(app) ;

server.listen(port, hostname, () => {
    console.log(`Servidorenejecucionenhttp://${hostname}:${port}/`)
}) ;

//Configuracion de conexión bd



const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/libros", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    console.log("Conectado a MongoDB correctamente");
    } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Detiene la ejecución si hay un error
    }
};

module.exports = connectDB;

//const connectDB = require("./config/db"); // Importamos la conexión a MongoDB

// Conectar a MongoDB
connectDB();

app.use(express.json()); // Middleware para parsear JSON

app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
