let imgList = document.querySelectorAll('.imagen');
// let divList = document.querySelectorAll('.tarjeta');

// let index = 0;

for (let img of imgList) {
    // Por cada 'img' va a entrar a este for
    let url = prompt("Ingresá la URL");
    img.setAttribute('src', url);
    // img.style.width = '200px';
    img.classList.add('img-small');

    // Agregamos texto junto a la imagen
    let text = document.createTextNode(url);
    let p = document.createElement('p');
    p.appendChild(text);

    // Accedemos al div desde un array y el índice
    // divList[index].appendChild(p);

    // Accedemos al div por ser el pare del 'img'
    //img.parentElement.appendChild(p)
    // index++;

    img.parentElement.setAttribute('href', url);
    img.parentElement.setAttribute('target', '_blank');
}