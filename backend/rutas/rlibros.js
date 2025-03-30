module.exports = function(app){
    var libCtr = require("../controlador/clibros") ;

    app.route('/lib/getLibrosSP')
        .get(libCtr.getLibrosSP) ;

}