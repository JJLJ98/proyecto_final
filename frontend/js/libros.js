// 📁 libros.js

const tablaLibros = document.querySelector("#tablaLibros tbody");
const btnCrearLibro = document.getElementById("btnCrearLibro");
const modalLibro = document.getElementById("modalLibro");
const modalConfirmarEliminar = document.getElementById("modalConfirmarEliminar");
const formLibro = document.getElementById("formLibro");
const closeModalBtns = document.querySelectorAll(".close-modal");
const btnEliminarLibros = document.getElementById("btnEliminarLibros");
const confirmarEliminar = document.getElementById("confirmarEliminar");
const datalistAutores = document.getElementById("autoresList");

let libros = [];
let autores = [];

// 🔄 Mostrar modal
function abrirModal(modal) {
  modal.classList.remove("hidden");
}

// ❌ Cerrar modal
function cerrarModal(modal) {
  modal.classList.add("hidden");
}

// 🔧 Llenar tabla de libros
function renderizarLibros() {
  tablaLibros.innerHTML = "";

  libros.forEach((libro) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td><input type="checkbox" data-id="${libro._id}" /></td>
      <td>${libro.isbn}</td>
      <td>${libro.titulo}</td>
      <td>${new Date(libro.fechaEdicion).toLocaleDateString()}</td>
      <td>${libro.numPaginas}</td>
      <td>${libro.cantEjemplares}</td>
      <td>${libro.cantEjemplaresDisponibles}</td>
      <td>${libro.sinopsis}</td>
      <td>${libro.tipoPresentacion}</td>
      <td>${libro.tipoLiteratura}</td>
      <td>${libro.autor?.nombre || ""} ${libro.autor?.apellidos || ""}</td>
      <td><button onclick="editarLibro('${libro._id}')">✏️</button></td>
    `;

    tablaLibros.appendChild(fila);
  });
}

// 📥 Cargar libros desde backend
async function cargarLibros() {
  const res = await fetch("http://localhost:3000/libros");
  libros = await res.json();
  renderizarLibros();
}

// 📥 Cargar autores para el datalist
async function cargarAutores() {
  const res = await fetch("http://localhost:3000/autores");
  autores = await res.json();

  datalistAutores.innerHTML = "";
  autores.forEach((autor) => {
    const option = document.createElement("option");
    option.value = `${autor.nombre} ${autor.apellidos}`;
    datalistAutores.appendChild(option);
  });
}

// 🧾 Crear o actualizar libro
formLibro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const modo = document.getElementById("modoLibro").value;
  const autorTexto = document.getElementById("autorNombre").value.trim();
  const [nombre, ...apellidosArr] = autorTexto.split(" ");
  const apellidos = apellidosArr.join(" ");
  const autorEncontrado = autores.find(
    (a) => a.nombre === nombre && a.apellidos === apellidos
  );

  const datosLibro = {
    isbn: document.getElementById("isbn").value,
    titulo: document.getElementById("titulo").value,
    fechaEdicion: document.getElementById("fechaEdicion").value,
    numPaginas: +document.getElementById("numPaginas").value,
    cantEjemplares: +document.getElementById("cantEjemplares").value,
    cantEjemplaresDisponibles: +document.getElementById("cantEjemplaresDisponibles").value,
    sinopsis: document.getElementById("sinopsis").value,
    tipoPresentacion: document.getElementById("tipoPresentacion").value,
    tipoLiteratura: document.getElementById("tipoLiteratura").value,
    autor: autorEncontrado ? autorEncontrado : { nombre, apellidos }
  };

  if (modo === "crear") {
    await fetch("http://localhost:3000/libros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosLibro)
    });
  } else {
    await fetch(`http://localhost:3000/libros/${modo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosLibro)
    });
  }

  cerrarModal(modalLibro);
  await cargarLibros();
});

// 🖋️ Editar libro
window.editarLibro = function (id) {
  const libro = libros.find((l) => l._id === id);
  if (!libro) return;

  document.getElementById("modalTitulo").textContent = "Editar Libro";
  document.getElementById("modoLibro").value = libro._id;
  document.getElementById("isbn").value = libro.isbn;
  document.getElementById("titulo").value = libro.titulo;
  document.getElementById("fechaEdicion").value = libro.fechaEdicion.split("T")[0];
  document.getElementById("numPaginas").value = libro.numPaginas;
  document.getElementById("cantEjemplares").value = libro.cantEjemplares;
  document.getElementById("cantEjemplaresDisponibles").value = libro.cantEjemplaresDisponibles;
  document.getElementById("sinopsis").value = libro.sinopsis;
  document.getElementById("tipoPresentacion").value = libro.tipoPresentacion;
  document.getElementById("tipoLiteratura").value = libro.tipoLiteratura;
  document.getElementById("autorNombre").value = `${libro.autor.nombre} ${libro.autor.apellidos}`;

  abrirModal(modalLibro);
};

// 🗑️ Eliminar libros seleccionados
btnEliminarLibros.addEventListener("click", () => {
  abrirModal(modalConfirmarEliminar);
});

confirmarEliminar.addEventListener("click", async () => {
  const seleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .filter((cb) => cb.dataset.id)
    .map((cb) => cb.dataset.id);

  if (seleccionados.length > 0) {
    await fetch("http://localhost:3000/libros", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: seleccionados })
    });

    await cargarLibros();
  }

  cerrarModal(modalConfirmarEliminar);
});

// 🔘 Abrir modal de creación
btnCrearLibro.addEventListener("click", () => {
  document.getElementById("formLibro").reset();
  document.getElementById("modoLibro").value = "crear";
  document.getElementById("modalTitulo").textContent = "Crear Libro";
  abrirModal(modalLibro);
});

// ❌ Botones cerrar modal
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cerrarModal(modalLibro);
    cerrarModal(modalConfirmarEliminar);
  });
});

// 🔎 Búsqueda
document.getElementById("busquedaLibro").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filas = tablaLibros.querySelectorAll("tr");

  filas.forEach((fila) => {
    const contenido = fila.textContent.toLowerCase();
    fila.style.display = contenido.includes(texto) ? "" : "none";
  });
});

// 🟢 Cargar datos al iniciar
window.addEventListener("DOMContentLoaded", async () => {
  await cargarAutores();
  await cargarLibros();
});
