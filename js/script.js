//Elementos del DOM
const fectchJokeBtn = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');

//Cargar chistes guardados en localStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadJokes);

//Evento para obtener chiste al hacer click en el botón
fectchJokeBtn.addEventListener('click', fetchJoke);

//Función para obtener un chiste de la API
function fetchJoke() {
    console.log('Obteniendo un chiste de la API...');
    fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(data => {
        const joke = data.value;
        console.log('Chiste recibido', joke);
        addJoke(joke);
        saveJokeToLocalStorage(joke);
      })
      .catch(error => console.error('Error al obtener chiste:', error));
}

// Función para añadir un chiste al DOM
function addJoke(joke) {
    console.log('Añadiendo chiste al DOM:', joke);
    
    const jokeContainer = document.createElement('div'); // Crea un contenedor para el chiste
    jokeContainer.classList.add('joke-container'); // Añade la clase 'joke-container'

    const jokeText = document.createElement('p'); // Crea un párrafo para el chiste
    jokeText.textContent = joke; // Añade el texto del chiste

    const deleteBtn = document.createElement('button'); // Crea el botón de eliminar
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.style.marginLeft = '10px'; // Un poco de espacio entre el chiste y el botón

    deleteBtn.addEventListener('click', () => {
        console.log('Eliminando chiste:', joke);
        jokeContainer.remove(); // Elimina el contenedor con el chiste
        removeJokeFromLocalStorage(joke); // Elimina el chiste del localStorage
    });

    jokeContainer.appendChild(jokeText); // Añade el texto del chiste al contenedor
    jokeContainer.appendChild(deleteBtn); // Añade el botón al contenedor
    jokeList.appendChild(jokeContainer); // Añade el contenedor al <ul>
}

//Función para guardar chiste en localStorage
function saveJokeToLocalStorage(joke) {
    let jokes = getJokesFromLocalStorage();
    jokes.push(joke);
    console.log('Guardando chiste desde localStorage:', jokes);
    localStorage.setItem('jokes', JSON.stringify(jokes));
}

//Función para cargar los chistes del localStorage al cargar la página
function loadJokes() {
    console.log('Cargando chistes desde el localStorage...');
    let jokes = getJokesFromLocalStorage();
    jokes.forEach(joke => {
        console.log('Renderizando chiste desde localStorage:', joke);
        addJoke(joke);
    });
}

//Función para obtener chistes del localStorage
function getJokesFromLocalStorage() {
    const jokes = localStorage.getItem('jokes');
    console.log('Chistes almacenados em el localStorage:', jokes ? JSON.parse(jokes) : []);
    return jokes ? JSON.parse(jokes) : [];
}

//Función para eliminar un chiste del localStorage
function removeJokeFromLocalStorage(jokeToRemove) {
    let jokes = getJokesFromLocalStorage();
    jokes = jokes.filter(joke => joke !== jokeToRemove);
    console.log('Actualizando localStorage después de eliminar:', jokes);
    localStorage.setItem('jokes', JSON.stringify(jokes));
}