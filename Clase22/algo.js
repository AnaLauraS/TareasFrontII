let listado = document.querySelector("#lista");
let url = "https://dog.ceo/api/breed/hound/images";

// fetch(url)
//     .then(respuesta => {
//         return respuesta.json();
//     })
//     .then(data => {
//         console.log(data.message);
//         data.message.forEach(element => {
//             console.log(element)
//             listado.innerHTML += `<li> <a href="${element}" target="_blank">${element}</a></li>`

//         });

//     })




let boton = document.querySelector('button');
boton.addEventListener('click', function() {
    traerFotos();
})

function traerFotos() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            console.log("esto es api " +
                data.message);
            let div = document.querySelector("#fotosPerros");
            div.innerHTML += `<img src="${data.message}">`
        })
}
for (var i = 0; i < 10; i++) {
    var count = 0;
    for (var j = 0; j < Math.floor(Math.random() * 10); j++) {
        count++;
    }
    console.log(count);
}