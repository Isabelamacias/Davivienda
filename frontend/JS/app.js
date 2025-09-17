const API_URL = "http://localhost:4000";


// ---------- Registro ----------
async function register() {
  const nombreUsuario = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombreUsuario, apellidos, email, password })
  });

  const data = await res.json();
  alert(data.msg || "Registro completado");
  if (res.ok) window.location.href = "index.html";
}

// ---------- Login ----------
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "tareas.html";
  } else {
    alert(data.msg || "Error al iniciar sesión");
  }
}

// ---------- CRUD TAREAS ----------
async function crearTarea() {
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const prioridad = document.getElementById("prioridad").value;

  const res = await fetch(`${API_URL}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ titulo, descripcion, prioridad })
  });

  const data = await res.json();
  alert(data.msg);
  obtenerTareas();
}

async function obtenerTareas() {
  const res = await fetch(`${API_URL}/tareas`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
  });
  const tareas = await res.json();

  const lista = document.getElementById("listaTareas");
  lista.innerHTML = "";
  tareas.forEach(t => {
    lista.innerHTML += `
      <li>
        <b>${t.titulo}</b> - ${t.descripcion} [${t.prioridad}] - ${t.estado}
        <button onclick="eliminarTarea(${t.id_tarea})">❌</button>
      </li>
    `;
  });
}

async function eliminarTarea(id) {
  const res = await fetch(`${API_URL}/tareas/${id}`, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
  });
  const data = await res.json();
  alert(data.msg);
  obtenerTareas();
}

// ---------- Logout ----------
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// Si está en tareas.html → cargar tareas
if (window.location.pathname.includes("tareas.html")) {
  obtenerTareas();
}
