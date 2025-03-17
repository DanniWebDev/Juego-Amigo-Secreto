const amigos = [];
const amigosElegibles = [];

const inputNombreAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

// Función para agregar amigos
const agregarAmigo = () => {
  const nombreAmigo = inputNombreAmigo.value.trim();
  if (!nombreAmigo) return alert('Por favor, inserte un nombre');
  if (amigos.includes(nombreAmigo)) return alert(`Ya existe un amigo llamado ${nombreAmigo}`);

  amigos.push(nombreAmigo);
  amigosElegibles.push({ nombre: nombreAmigo, elegido: false });
  inputNombreAmigo.value = '';
  actualizarListaAmigos();
};

// Función para actualizar la lista de amigos
const actualizarListaAmigos = () => {
  listaAmigos.innerHTML = amigosElegibles
    .map(({ nombre }) => `<li>${nombre} ${createDeleteButton(nombre)}</li>`)
    .join('');
  resultado.textContent = '';
};

// Función para sortear amigos
const sortearAmigo = () => {
  const noElegidos = amigosElegibles.filter(amigo => !amigo.elegido);
  if (!noElegidos.length) return mostrarResultado(amigosElegibles.length ? 'Todos los amigos ya han sido elegidos' : 'No hay amigos para sortear');

  startConfetti();
  const elegido = noElegidos[Math.floor(Math.random() * noElegidos.length)];
  elegido.elegido = true;
  amigos.splice(amigos.indexOf(elegido.nombre), 1);
  mostrarResultado(`El amigo elegido es ${elegido.nombre}`);
};

// Función para reiniciar el sorteo
const reiniciarSorteo = () => {
  if (!amigosElegibles.length || amigosElegibles.every(amigo => !amigo.elegido)) return;

  if (confirm('¿Está seguro de que desea reiniciar el sorteo?')) {
    amigosElegibles.forEach(amigo => amigo.elegido = false);
    amigos.length = 0;
    amigos.push(...amigosElegibles.map(amigo => amigo.nombre));
    mostrarResultado('Todos los amigos son elegibles nuevamente');
  }
};

// Función para mostrar el resultado del sorteo
const mostrarResultado = (mensaje) => {
  resultado.textContent = mensaje;
  setTimeout(() => resultado.textContent = '', 3000);
};

// Función para eliminar un amigo
const eliminarAmigo = (nombre) => {
  const index = amigosElegibles.findIndex(amigo => amigo.nombre === nombre);
  if (index === -1) return confirm(`No se puede eliminar a ${nombre} porque ya se ha sorteado, ¿Desea reiniciar el sorteo?`) && reiniciarSorteo();

  if (confirm(`¿Está seguro de que desea remover a ${nombre} del sorteo?`)) {
    amigosElegibles.splice(index, 1);
    amigos.splice(amigos.indexOf(nombre), 1);
    actualizarListaAmigos();
    mostrarResultado(`${nombre} se ha eliminado del sorteo`);
  }
};

// Función para crear botón de eliminación
const createDeleteButton = (nombre) => `
  <button class="button-eliminar" onclick="eliminarAmigo('${nombre}')">
    <img src="assets/delete.svg" alt="Eliminar">
  </button>`;

// Función para iniciar confeti
const startConfetti = () => confetti({
  particleCount: 500,
  spread: 75,
  origin: { y: 0.8 },
  colors: ['#b2aa8e', '#0c1b33', '#7a306c', '#03b5aa', '#dbfe87'],
});
