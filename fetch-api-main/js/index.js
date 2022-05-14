// Aquí realizamos un la consulta de la promesa, esperando su respuesta asíncrona
function random() {
    fetch('https://randomuser.me/api/')
        .then(response => {
            return response.json()
        })
        .then(data => {
            //manipulamos la respuesta
            console.log(data)
            renderizarDatosUsuario(data)
        });
}

function renderizarDatosUsuario(datos) {
    /* -------------------------------- CONSIGNA 1 -------------------------------- */
    // Aquí deben desarrollar una función que muestre en pantalla:
    // la foto, el nombre completo del usuario y su email.
    // Esto debe estar basado en la info que nos llega desde la API e insertarse en el HTML.
    let foto = datos.results[0].picture.medium;
    let img = document.createElement('img');
    document.querySelector('.tarjeta').appendChild(img);
    img.setAttribute('src', foto);

    let nombre = datos.results[0].name.first;
    let apellido = datos.results[0].name.last;
    let nomYape = document.createElement('p');
    document.querySelector('.tarjeta').appendChild(nomYape);
    nomYape.innerText = nombre + " " + apellido;

    let email = datos.results[0].email;
    let mail = document.createElement('p');
    document.querySelector('.tarjeta').appendChild(mail);
    mail.innerText = email;
}



/* --------------------------- CONSIGNA 2 (extra) --------------------------- */
// Aqui pueden ir por el punto extra de utilizar el boton que se encuentra comentado en el HTML
// Pueden descomentar el código del index.html y usar ese boton para ejecutar un nuevo pedido a la API, sin necesidad de recargar la página.
// Es criterio del equipo QUÉ bloque del código debe contenerse dentro de una función para poder ser ejecutada cada vez que se escuche un click.

document.querySelector('#random').addEventListener('click', () => {
    document.querySelector('.tarjeta').innerHTML = "";
    random();
})