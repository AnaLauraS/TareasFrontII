/*
REQUERIMIENTOS
- utilizar el formulario para captar el texto ingresado


- implmentar el evento "submit", utilizarlo para guardar el comentario en un array

- cada vez que se agrega un nuevo comentario renderizarlo en una etiqueta "p"(sacar del html los hardcodeados y hacerlo dinamico)

- constantemente guardar la informacion en localStorage, si se recarga la pagina deberian mantenerse los comentarios
*/

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let comentarioCapturado = document.querySelector('#comentario').value;
    guardaHistorial(comentarioCapturado);
    render();
})

function guardaHistorial(dato) {
    let historial = [];
    if (sessionStorage.getItem('comentario') != null) {
        let json = sessionStorage.getItem('comentario');
        historial = JSON.parse(json);
    }
    if (!historial.includes(dato)) {
        historial.push(dato);
    }
    let json = JSON.stringify(historial);
    sessionStorage.setItem('comentario', json);
}

function render() {
    let div = document.querySelector('.comentarios');
    let historial = [];
    if (sessionStorage.getItem('comentario') != null) {
        let json = sessionStorage.getItem('comentario');
        historial = JSON.parse(json);
    }
    // limpio el div para que no se vuelva a sumar lo que ya habia mostrado
    div.innerHTML = ""
    historial.forEach(element => {
        div.innerHTML += `<p>${element}</p>`;
    });
}