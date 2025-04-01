module.exports = function(app){
    var libAut = require("../controlador/cautores") ;

    app.route('/aut/getAutores')
        .get(libAut.getAutores) ;

}