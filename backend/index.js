//Importar módulos
const express   = require("express") ; 
const http      = require('http') ; 
const path      = require("path") ;
const morgan    = require("morgan") ;
const bp        = require("body-parser") ;
const cors      = require("cors") ;

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