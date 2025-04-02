// BUSCADOR PÁGINA PRINCIPAL
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
    //document.getElementById('categories').hidden = true;
    document.getElementById('mLibros').hidden = true;
    document.getElementById('mAutor').hidden = false;
}
function libros(){
    document.getElementById('featured-books').hidden = true;
    //document.getElementById('categories').hidden = true;
    document.getElementById('mAutor').hidden = true;
    document.getElementById('mLibros').hidden = false;
}

// FUNCIONES AUTORES
let autorEnEdicion = null; // Variable para saber si estamos editando un autor

document.addEventListener("DOMContentLoaded", leerAutores); // Cargar los autores al cargar la página

function filtrarAutores() {
    let query = document.getElementById('buscarA').value.toLowerCase();
    let books = document.querySelectorAll('.book-row');  // Cambié esto para que se refiera a las filas de la tabla
    books.forEach(book => {
        if (book.textContent.toLowerCase().includes(query)) {
            book.style.display = "table-row"; // Mostrar la fila si coincide
        } else {
            book.style.display = "none"; // Ocultar la fila si no coincide
        }
    });
}

// Mostrar el formulario modal para crear un autor
function mostrarFormularioA() {
    document.getElementById("crearAutor").style.display = "block";
}

// Mostrar el formulario modal para editar un autor
function mostrarFormularioEditarA() {
    document.getElementById("editarLibro").style.display = "block";
}

// Mostrar el modal de confirmación de eliminación
function mostrarConfirmacionA() {
    const modal = document.getElementById('confirmacionEliminarA');
    modal.style.display = "block"; // Mostrar el modal
}

// Cerrar el modal de confirmación
function cerrarConfirmacionA() {
    const modal = document.getElementById('confirmacionEliminarA');
    modal.style.display = "none"; // Ocultar el modal
}

// Confirmar la eliminación de los libros seleccionados
function confirmarEliminacionA() {
    let autores = JSON.parse(localStorage.getItem("autores")) || [];//CAMBIAR LOCALSTORAGE POR BD
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
        alert("Debe seleccionar al menos un autor para eliminar.");
        return;
    }

    // Obtener los índices seleccionados y convertirlos en números enteros
    let indicesA = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-index')));

    // Ordenar los índices de mayor a menor para evitar desajustes en el array
    indicesA.sort((a, b) => b - a);

    // Eliminar los libros seleccionados
    indicesA.forEach(index => {
        autores.splice(index, 1); // Elimina el libro en la posición `index`
    });

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("autores", JSON.stringify(autores));//CAMBIAR POR INFORMACIÓN BD

    // Recargar la tabla con los libros actualizados
    leerAutores();

    // Cerrar el modal de confirmación
    cerrarConfirmacionA();
}


// Cerrar el formulario modal
function cerrarFormularioA() {
    document.getElementById("crearAutor").style.display = "none";
    document.getElementById("editarAutor").style.display = "none";
    document.getElementById("autorForm").reset();
    autorEnEdicion = null;
}

// Guardar un libro
function guardarAutor() {
    let autores = JSON.parse(localStorage.getItem("autores")) || [];//CAMBIAR POR INFORMACIÓN BD

    if (autorEnEdicion !== null) {
        // Modo edición autor
        autores[autorEnEdicion] = {
            nombres: document.getElementById("nombresEditar").value,
            titulo: document.getElementById("apellidosEditar").value,
            autor: document.getElementById("fechPubEditar").value,
            fechaEdicion: document.getElementById("premiosEditar").value,
            numPaginas: document.getElementById("fecNacEditar").value,
            cantEjemplares: document.getElementById("fecFallEditar").value,
        };
    } else {
        // Modo creación autor
        const autor = {
            nombres: document.getElementById("Nombre").value,
            apellidos: document.getElementById("Apellidos").value,
            fechPub: document.getElementById("fechPub").value,
            premios: document.getElementById("Premios").value,
            fecNac: document.getElementById("fecNac").value,
            fecFall: document.getElementById("fecFall").value,
        };
        autores.push(autor);
    }

    localStorage.setItem("autores", JSON.stringify(autores));//CAMBIAR POR INFORMACIÓN BD
    leerAutores();
    cerrarFormularioA();
}

// Leer y mostrar los autores almacenados
function leerAutores() {
    let jsonAutores = llamarAPI();
    console.log(jsonAutores);
    const autores = JSON.parse(jsonAutores) || [];//CREAR FUNCIÓN PARA ORDENAR SOLO EL JSON DE AUTORES
    const tablaAutores = document.getElementById("tablaAutoresBody");
    tablaAutores.innerHTML = "";

    autores.forEach((autor, index) => {
        const fila = document.createElement("tr");
        fila.classList.add("book-row"); 
        fila.innerHTML = `
            <td><input type="checkbox" class="checkboxAutor" data-index="${index}"></td>
            <td>${autor.nombres}</td>
            <td>${autor.apellidos}</td>
            <td>${autor.fechPub}</td>
            <td>${autor.premios}</td>
            <td>${autor.fecNac}</td>
            <td>${autor.fecFall}</td>
            <td><button onclick="editarAutor(${index})">Editar</button></td>
        `;
        tablaAutores.appendChild(fila);
    });
}

// Seleccionar o deseleccionar todos los checkboxes
function seleccionarTodosA(checkbox) {
    const checkboxes = document.querySelectorAll(".checkboxAutor");
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
}

// Confirmar eliminación de libros seleccionados
function confirmarEliminacionA() {
    let autores = JSON.parse(localStorage.getItem("autores")) || [];//CAMBIAR POR INFORMACIÓN DE BD
    const checkboxes = document.querySelectorAll('input.checkboxAutor:checked');

    if (checkboxes.length === 0) {
        alert("Debe seleccionar al menos un autor para eliminar.");
        return;
    }

    // Obtener los índices seleccionados, convertirlos en números y ordenarlos de mayor a menor
    let indices = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-index'))).sort((a, b) => b - a);

    // Eliminar los libros empezando por los índices más altos para evitar desajustes en el array
    indices.forEach(index => {
        autores.splice(index, 1);
    });

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("autores", JSON.stringify(autores));//CAMBIAR POR INFORMACIÓN A LA BD

    // Recargar la tabla con los libros actualizados
    leerAutores();

    // Cerrar el modal de confirmación (si lo usas)
    cerrarConfirmacionA();
}


// Editar un autor
function editarAutor(index) {
    let autores = JSON.parse(localStorage.getItem("autores")) || [];//CAMBIAR POR INFORMACIÓN BD
    const autor = autores[index];
    
    if (!autor) return;
    
    document.getElementById("nombresEditar").value = autor.nombres;
    document.getElementById("apellidosEditar").value = autor.nombres;
    document.getElementById("fechPubEditar").value = autor.nombres;
    document.getElementById("premiosEditar").value = autor.nombres;
    document.getElementById("fecNacEditar").value = autor.nombres;
    document.getElementById("fecFallEditar").value = autor.nombres;
    
    autorEnEdicion = index;
    mostrarFormularioEditarA();
}

// Cargar eventos al inicio tabla lautores
document.addEventListener("DOMContentLoaded", () => {
    leerAutores();
    const seleccionarTodosACheckbox = document.getElementById("seleccionarTodosA");
    if (seleccionarTodosACheckbox) {
        seleccionarTodosACheckbox.addEventListener("click", function () {
            seleccionarTodosA(this);
        });
    }
});

function agregarPremio() {
    const infNombreAutor    = document.getElementById('Nombre').value ;
    const infPremios = localStorage.getItem("p"+infNombreAutor) ;

    const infPremiosn = document.getElementById("Premios").value ;

    localStorage.setItem("p"+infNombreAutor, infPremios+ ","+infPremiosn);
}

// FUNCIONES LIBROS

let libroEnEdicion = null; // Variable para saber si estamos editando un libro

document.addEventListener("DOMContentLoaded", leerLibros); // Cargar los libros al cargar la página

function filtrarLibros() {
    let query = document.getElementById('buscar').value.toLowerCase();
    let books = document.querySelectorAll('.book-row');  // Cambié esto para que se refiera a las filas de la tabla
    books.forEach(book => {
        if (book.textContent.toLowerCase().includes(query)) {
            book.style.display = "table-row"; // Mostrar la fila si coincide
        } else {
            book.style.display = "none"; // Ocultar la fila si no coincide
        }
    });
}

// Mostrar el formulario modal para crear un libro
function mostrarFormulario() {
    document.getElementById("crearLibro").style.display = "block";
}

// Mostrar el formulario modal para editar un libro
function mostrarFormularioEditar() {
    document.getElementById("editarLibro").style.display = "block";
}

// Mostrar el modal de confirmación de eliminación
function mostrarConfirmacion() {
    const modal = document.getElementById('confirmacionEliminar');
    modal.style.display = "block"; // Mostrar el modal
}

// Cerrar el modal de confirmación
function cerrarConfirmacion() {
    const modal = document.getElementById('confirmacionEliminar');
    modal.style.display = "none"; // Ocultar el modal
}

// Confirmar la eliminación de los libros seleccionados
function confirmarEliminacion() {
    let libros = JSON.parse(localStorage.getItem("libros")) || [];//CAMBIAR LOCALSTORAGE POR BD
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
        alert("Debe seleccionar al menos un libro para eliminar.");
        return;
    }

    // Obtener los índices seleccionados y convertirlos en números enteros
    let indices = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-index')));

    // Ordenar los índices de mayor a menor para evitar desajustes en el array
    indices.sort((a, b) => b - a);

    // Eliminar los libros seleccionados
    indices.forEach(index => {
        libros.splice(index, 1); // Elimina el libro en la posición `index`
    });

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("libros", JSON.stringify(libros));

    // Recargar la tabla con los libros actualizados
    leerLibros();

    // Cerrar el modal de confirmación
    cerrarConfirmacion();
}


// Cerrar el formulario modal
function cerrarFormulario() {
    document.getElementById("crearLibro").style.display = "none";
    document.getElementById("editarLibro").style.display = "none";
    document.getElementById("libroForm").reset();
    libroEnEdicion = null;
    //document.getElementById("guardarBtn").innerText = "Guardar Libro";
}

// Guardar un libro
function guardarLibro() {
    let libros = JSON.parse(localStorage.getItem("libros")) || [];

    if (libroEnEdicion !== null) {
        // Modo edición
        libros[libroEnEdicion] = {
            isbn: document.getElementById("isbnEditar").value,
            titulo: document.getElementById("tituloEditar").value,
            autor: document.getElementById("autorEditar").value,
            fechaEdicion: document.getElementById("fechaEdicionEditar").value,
            numPaginas: document.getElementById("numPaginasEditar").value,
            cantEjemplares: document.getElementById("cantEjemplaresEditar").value,
            cantEjemplaresDisponibles: document.getElementById("cantEjemplaresDisponiblesEditar").value,
            sinopsis: document.getElementById("sinopsisEditar").value,
            presentacion: document.getElementById("presentacionEditar").value,
            literatura: document.getElementById("literaturaEditar").value
        };
    } else {
        // Modo creación
        const libro = {
            isbn: document.getElementById("isbn").value,
            titulo: document.getElementById("titulo").value,
            autor: document.getElementById("autor").value,
            fechaEdicion: document.getElementById("fechaEdicion").value,
            numPaginas: document.getElementById("numPaginas").value,
            cantEjemplares: document.getElementById("cantEjemplares").value,
            cantEjemplaresDisponibles: document.getElementById("cantEjemplaresDisponibles").value,
            sinopsis: document.getElementById("sinopsis").value,
            presentacion: document.getElementById("presentacion").value,
            literatura: document.getElementById("literatura").value
        };
        libros.push(libro);
    }

    localStorage.setItem("libros", JSON.stringify(libros));
    leerLibros();
    cerrarFormulario();
}

// Leer y mostrar los libros almacenados
function leerLibros() {
    const libros = JSON.parse(localStorage.getItem("libros")) || [];
    const tablaLibros = document.getElementById("tablaLibrosBody");
    tablaLibros.innerHTML = "";

    libros.forEach((libro, index) => {
        const fila = document.createElement("tr");
        fila.classList.add("book-row"); 
        fila.innerHTML = `
            <td><input type="checkbox" class="checkboxLibro" data-index="${index}"></td>
            <td>${libro.isbn}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.fechaEdicion}</td>
            <td>${libro.numPaginas}</td>
            <td>${libro.cantEjemplares}</td>
            <td>${libro.cantEjemplaresDisponibles}</td>
            <td>${libro.sinopsis}</td>
            <td>${libro.presentacion}</td>
            <td>${libro.literatura}</td>
            <td><button onclick="editarLibro(${index})">Editar</button></td>
        `;
        tablaLibros.appendChild(fila);
    });
}

// Seleccionar o deseleccionar todos los checkboxes
function seleccionarTodos(checkbox) {
    const checkboxes = document.querySelectorAll(".checkboxLibro");
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
}

// Confirmar eliminación de libros seleccionados
function confirmarEliminacion() {
    let libros = JSON.parse(localStorage.getItem("libros")) || [];
    const checkboxes = document.querySelectorAll('input.checkboxLibro:checked');

    if (checkboxes.length === 0) {
        alert("Debe seleccionar al menos un libro para eliminar.");
        return;
    }

    // Obtener los índices seleccionados, convertirlos en números y ordenarlos de mayor a menor
    let indices = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-index'))).sort((a, b) => b - a);

    // Eliminar los libros empezando por los índices más altos para evitar desajustes en el array
    indices.forEach(index => {
        libros.splice(index, 1);
    });

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("libros", JSON.stringify(libros));

    // Recargar la tabla con los libros actualizados
    leerLibros();

    // Cerrar el modal de confirmación (si lo usas)
    cerrarConfirmacion();
}


// Editar un libro
function editarLibro(index) {
    let libros = JSON.parse(localStorage.getItem("libros")) || [];
    const libro = libros[index];
    
    if (!libro) return;
    
    document.getElementById("isbnEditar").value = libro.isbn;
    document.getElementById("tituloEditar").value = libro.titulo;
    document.getElementById("autorEditar").value = libro.autor;
    document.getElementById("fechaEdicionEditar").value = libro.fechaEdicion;
    document.getElementById("numPaginasEditar").value = libro.numPaginas;
    document.getElementById("cantEjemplaresEditar").value = libro.cantEjemplares;
    document.getElementById("cantEjemplaresDisponiblesEditar").value = libro.cantEjemplaresDisponibles;
    document.getElementById("sinopsisEditar").value = libro.sinopsis;
    document.getElementById("presentacionEditar").value = libro.presentacion;
    document.getElementById("literaturaEditar").value = libro.literatura;
    
    libroEnEdicion = index;
    mostrarFormularioEditar();
}

// Cargar eventos al inicio tabla libros
document.addEventListener("DOMContentLoaded", () => {
    leerLibros();
    const seleccionarTodosCheckbox = document.getElementById("seleccionarTodos");
    if (seleccionarTodosCheckbox) {
        seleccionarTodosCheckbox.addEventListener("click", function () {
            seleccionarTodos(this);
        });
    }
});


// LLAMADOS AL BACKEND

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
        .then( (res) => {
            console.log( "-->",res ) ;
            //document.getElementById("listaAutores").innerHTML = JSON.stringify(ret) ;
        } )
        .catch( (err) => {
        console.log( "ERR:" + err ) ;
        
    } ) ;
}

function getAutores() {

    let respuesta =llamarAPI() ;
    console.log( "TAREA FINALIZADA", respuesta ) ;
}
