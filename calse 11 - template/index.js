let nombre = document.querySelector('#nombre').value;
let submit = document.querySelector('#submit');

function cantNombres() {
    let arrayNombres = nombre.split(' ');
    if (arrayNombres.length > 1) {
        for (let i = 0; i < arrayNombres.length; i++) {
            if (arrayNombres[i].length > 1) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

function caracteres() {
    if (nombre.length <= 150) {
        return true;
    } else {
        return false;
    }
}

function noNumeros() {
    document.querySelector('#nombre').addEventListener('keypress', (e) => {
        if (isNaN(e.key) == false) {
            e.preventDefault();
        }
    })
}

document.querySelector('#nombre').addEventListener('blur', () => {
    if (nombre != "") {
        if (cantNombres() == false | caracteres() == false) {
            document.querySelector('#nombre').classList.add("error");
        } else {
            document.querySelector('#nombre').classList.remove("error");
            submit.removeAttribute('disabled');
        }
    }

})