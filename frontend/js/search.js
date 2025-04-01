function searchBooks() {
    let query = document.getElementById('search').value.toLowerCase();
    let books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        if (book.textContent.toLowerCase().includes(query)) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    });
}

function autores(){
    document.getElementById('featured-books').hidden = true;
    document.getElementById('categories').hidden = true;
    document.getElementById('autor').hidden = false;
}

function crearAutor(){
    const infNombreAutor    = document.getElementById('Nombre').value ;
    const infApellidosAutor = document.getElementById("Apellidos").value ;
    const infFechPub        = document.getElementById("fechPub").value ;
    const infPremios        = document.getElementById("Premios").value ;
    const infFecNac         = document.getElementById("fecNac").value ;
    const infFecFall        = document.getElementById("fecFall").value ; 

    localStorage.setItem(infNombreAutor, infNombreAutor)
    localStorage.setItem("a"+infNombreAutor, infApellidosAutor)
    localStorage.setItem("fp"+infNombreAutor, infFechPub)
    localStorage.setItem("p"+infNombreAutor, infPremios)
    localStorage.setItem("fn"+infNombreAutor, infFecNac)
    localStorage.setItem("ff"+infNombreAutor, infFecFall)

    getAutores()
}

function consultarAutor(){
    const infNombreAutor    = document.getElementById('Nombre').value ;
    const infApellidosAutor = localStorage.getItem("a"+infNombreAutor) ;
    const infFechPub        = localStorage.getItem("fp"+infNombreAutor) ;
    const infPremios        = localStorage.getItem("p"+infNombreAutor) ;
    const infFecNac         = localStorage.getItem("fn"+infNombreAutor) ;
    const infFecFall        = localStorage.getItem("ff"+infNombreAutor) ; 

    document.getElementById("Apellidos").value = infApellidosAutor;
    document.getElementById("fechPub").value = infFechPub;
    document.getElementById("Premios").value = infPremios;
    document.getElementById("fecNac").value = infFecNac;
    document.getElementById("fecFall").value = infFecFall;

    getAutores()
}

function modificarAutor() {
    const infNombreAutor    = document.getElementById('Nombre').value ;
    const infApellidosAutor = document.getElementById("Apellidos").value ;
    const infFechPub        = document.getElementById("fechPub").value ;
    const infPremios        = document.getElementById("Premios").value ;
    const infFecNac         = document.getElementById("fecNac").value ;
    const infFecFall        = document.getElementById("fecFall").value ;

    localStorage.setItem(infNombreAutor, infNombreAutor)
    localStorage.setItem("a"+infNombreAutor, infApellidosAutor)
    localStorage.setItem("fp"+infNombreAutor, infFechPub)
    localStorage.setItem("p"+infNombreAutor, infPremios)
    localStorage.setItem("fn"+infNombreAutor, infFecNac)
    localStorage.setItem("ff"+infNombreAutor, infFecFall)

    getAutores()
}

function eliminarAutor() {
    const infNombreAutor    = document.getElementById('Nombre').value ;

    localStorage.removeItem(infNombreAutor)
    localStorage.removeItem("a"+infNombreAutor)
    localStorage.removeItem("fp"+infNombreAutor)
    localStorage.removeItem("p"+infNombreAutor)
    localStorage.removeItem("fn"+infNombreAutor)
    localStorage.removeItem("ff"+infNombreAutor)

    getAutores()
}

/*function listarAutores() {
    const listaAutores = document.getElementById('listaAutores');
    listaAutores.innerHTML = 'prueba 1';
    autores = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i)+i)
        const nombreAutor = localStorage.key(i);
        const apellidosAutor = localStorage.getItem("a"+nombreAutor);
        const fpAutor = localStorage.getItem("fp"+nombreAutor);
        const pAutor = localStorage.getItem("p"+nombreAutor);
        const fnAutor = localStorage.getItem("fn"+nombreAutor);
        const ffAutor = localStorage.getItem("ff"+nombreAutor);
        if(localStorage.key(i)==localStorage.getItem(nombreAutor)){
            autores.push(nombreAutor,apellidosAutor,fpAutor,{pAutor},fnAutor,ffAutor);
        }
        
        }
        console.log(autores) ;
        for(let i=0 ; i<autores.length ;i++){
            
            listaAutores.innerHTML += `<table>${autores[i]}</table>`
    };
}*/
    
function agregarPremio() {
    const infNombreAutor    = document.getElementById('Nombre').value ;
    const infPremios = localStorage.getItem("p"+infNombreAutor) ;

    const infPremiosn = document.getElementById("Premios").value ;

    localStorage.setItem("p"+infNombreAutor, infPremios+ ","+infPremiosn);
}

function llamarAPI() {
    fetch( "http://localhost:3000/aut/getAutores",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )   
        .then( (rta) => { return( rta.json() )} )
        .then( (ret) => {
            console.log( "-->",ret ) ;
            document.getElementById("listaAutores").innerHTML = JSON.stringify(ret) ;
        } )
        .catch( (err) => {
        console.log( "ERR:" + err ) ;
        
    } ) ;
}

function getAutores() {
    llamarAPI() ;
    console.log( "TAREA FINALIZADA" ) ;
}
