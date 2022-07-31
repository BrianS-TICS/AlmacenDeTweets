// Variables 
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets')
let tweets = [];
// Event listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        // intenta buscar en localstorage los tweets y conviete los a parse
        // Si marca null se asigna como arreglo vacio
        tweets = JSON.parse(localStorage.getItem('tweets') || []);
        crearHtml();
    });
}

// Funciones
function agregarTweet(e){
    e.preventDefault();
    // text area
    const tweet = document.querySelector('#tweet').value;
    // validacion de texto
    if(tweet === ''){
        mostrarError('Un tweet no puede ir vacio');    
        return; // Evita que se ejecuten las siguientes lienas
    }

    const tweetObj = {
        id : Date.now(),
        tweet
    }

    // Añadir a arreglo de tweets
    tweets = [...tweets ,tweetObj] // Copio el arreglo y agrego un nuevo valor a uno nuevo
    
    // Crear html
    crearHtml();

    // Reiniciar el formulario
    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    // Insercion en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}

function crearHtml(){

    limpiarHTML(lista);

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            // Creo li
            const li = document.createElement('li');
            // Creo boton
            const boton = document.createElement('a');
            // Texto
            li.textContent = tweet.tweet;

            // Agrego funcion de eliminar 
            boton.onclick = () =>{
                borrarTweet(tweet.id);
            }

            boton.textContent = 'X';
            boton.classList.add('borrar-tweet');

            // Le agrego al elemento de la lista el boton
            li.appendChild(boton);

            // Agregar a lista
            lista.appendChild(li);
        });
    }

    SincronizarStorage();
}

function limpiarHTML(elementoPadre){
    while(elementoPadre.firstChild){
        elementoPadre.removeChild(elementoPadre.firstChild);
    }
}

// Agrega a loca storage
function SincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina tweet
function borrarTweet(id){
    tweets = tweets.filter( item =>{
        if (item.id !== id) {
            return item;
        }
    });
    crearHtml();
}