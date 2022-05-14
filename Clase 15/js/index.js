document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    comments.push(document.querySelector('#comentario').value);
    showComments();
});

// 2. Al inciar el sitio, mostrar un confirm para que el usuario indique si quiere o no guardar en el Storage los comentarios
let guardarSesion = confirm("¿Quiere guardar los datos en el SessionStorage?")


let comments = [];

// Guarda el comentario en el array y renderiza todo el array entero
function showComments() {
    let container = document.querySelector('.comentarios');
    container.innerHTML = '';

    comments.forEach((comment, index) => {
        let button = document.createElement('button');
        button.textContent = 'Borrar';
        button.addEventListener('click', () => {
            deleteComment(index);
            showComments();
        });

        // 1. Guardar los comentarios en Storage
        if (guardarSesion) {
            let json = JSON.stringify(comments);
            sessionStorage.setItem('comentario', json);
        }

        let p = document.createElement('p');
        p.innerText = comment;
        p.appendChild(button);
        container.appendChild(p);
    });
}

function deleteComment(index) {
    comments.splice(index, 1);
}