// 📁 autores.js

const tablaAutores = document.querySelector("#tablaAutores tbody");
const btnCrearAutor = document.getElementById("crearAutorBtn");
const modalAutor = document.getElementById("modalAutor");
const modalConfirmarEliminar = document.getElementById("modalConfirmarEliminarAutor");
const formAutor = document.getElementById("formAutor");
const closeModalBtns = document.querySelectorAll(".close-modal-autor");
const btnEliminarAutores = document.getElementById("btnEliminarAutores");
const confirmarEliminar = document.getElementById("confirmarEliminarAutor");

let autores = [];

// 🔄 Mostrar modal
function abrirModal(modal) {
  modal.classList.remove("hidden");
}

// ❌ Cerrar modal
function cerrarModal(modal) {
  modal.classList.add("hidden");
}

document.addEventListener('DOMContentLoaded', () => {
  const crearBtn = document.getElementById('crearAutorBtn');
  const modal = document.getElementById('modalAutor');
  const cancelarBtn = document.getElementById('cancelarAutorBtn');

  crearBtn.addEventListener('click', () => {
    modal.classList.remove('oculto');
  });

  cancelarBtn.addEventListener('click', () => {
    modal.classList.add('oculto');
  });
});


// 🔧 Renderizar tabla de autores
function renderizarAutores() {
  tablaAutores.innerHTML = "";
  autores.forEach((autor) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td><input type="checkbox" data-id="${autor._id}" /></td>
      <td>${autor.nombre}</td>
      <td>${autor.apellidos}</td>
      <td>${new Date(autor.fechaNacimiento).toLocaleDateString()}</td>
      <td>${autor.premios}</td>
      <td>${autor.fechaFallecimiento ? new Date(autor.fechaFallecimiento).toLocaleDateString() : "-"}</td>
      <td><button onclick="editarAutor('${autor._id}')">✏️</button></td>
    `;

    tablaAutores.appendChild(fila);
  });
}

// 📥 Cargar autores desde backend
async function cargarAutores() {
  const res = await fetch("http://localhost:3000/autores");
  autores = await res.json();
  renderizarAutores();
}

// 🧾 Crear o actualizar autor
formAutor.addEventListener("submit", async (e) => {
  e.preventDefault();

  const modo = document.getElementById("modoAutor").value;

  const datosAutor = {
    nombre: document.getElementById("nombreAutor").value,
    apellidos: document.getElementById("apellidosAutor").value,
    fechaNacimiento: document.getElementById("fechaNacimientoAutor").value,
    premios: document.getElementById("premiosAutor").value,
    fechaFallecimiento: document.getElementById("fechaFallecimientoAutor").value
  };

  if (modo === "crear") {
    await fetch("http://localhost:3000/autores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosAutor)
    });
  } else {
    await fetch(`http://localhost:3000/autores/${modo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosAutor)
    });
  }

  cerrarModal(modalAutor);
  await cargarAutores();
});

// 🖋️ Editar autor
window.editarAutor = function (id) {
  const autor = autores.find((a) => a._id === id);
  if (!autor) return;

  document.getElementById("modalTituloAutor").textContent = "Editar Autor";
  document.getElementById("modoAutor").value = autor._id;
  document.getElementById("nombreAutor").value = autor.nombre;
  document.getElementById("apellidosAutor").value = autor.apellidos;
  document.getElementById("fechaNacimientoAutor").value = autor.fechaNacimiento.split("T")[0];
  document.getElementById("premiosAutor").value = autor.premios;
  document.getElementById("fechaFallecimientoAutor").value = autor.fechaFallecimiento ? autor.fechaFallecimiento.split("T")[0] : "";

  abrirModal(modalAutor);
};

// 🗑️ Eliminar autores seleccionados
btnEliminarAutores.addEventListener("click", () => {
  abrirModal(modalConfirmarEliminar);
});

confirmarEliminar.addEventListener("click", async () => {
  const seleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .filter((cb) => cb.dataset.id)
    .map((cb) => cb.dataset.id);

  if (seleccionados.length > 0) {
    await fetch("http://localhost:3000/autores", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: seleccionados })
    });

    await cargarAutores();
  }

  cerrarModal(modalConfirmarEliminar);
});

// 🔘 Abrir modal de creación
document.getElementById("btnCrearAutor").addEventListener("click", () => {
  document.getElementById("formAutor").reset();
  document.getElementById("modoAutor").value = "crear";
  document.getElementById("modalTituloAutor").textContent = "Crear Autor";
  abrirModal(modalAutor);
});

// ❌ Botones cerrar modal
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cerrarModal(modalAutor);
    cerrarModal(modalConfirmarEliminar);
  });
});

// 🔎 Búsqueda
document.getElementById("busquedaAutor").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filas = tablaAutores.querySelectorAll("tr");

  filas.forEach((fila) => {
    const contenido = fila.textContent.toLowerCase();
    fila.style.display = contenido.includes(texto) ? "" : "none";
  });
});

// 🟢 Iniciar
window.addEventListener("DOMContentLoaded", cargarAutores);
