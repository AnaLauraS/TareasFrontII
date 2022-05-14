// campos y sus variables
let campo1 = document.getElementById('nombre');
let campo2 = document.getElementById('pass');
let campo3 = document.getElementById('tel');
let hobby = document.querySelectorAll('[type= checkbox]');
let nacionalidad = document.querySelectorAll('[type= radio]');
let boton = document.getElementById('ins');

campo1.addEventListener('keypress', (e) => {
    if (isNaN(e.key) == false) {
        e.preventDefault();
    }
})

window.addEventListener('click', () => {
    if (campo1.value == "" | campo2.value == "" | campo3.value == "") {
        boton.setAttribute('disabled', 'true');
    } else if (campo1.value != "" & campo2.value != "" & campo3.value != "") {
        boton.removeAttribute('disabled');
    }
})

function cantHobbies() {
    let seleccionados = 0;
    for (let i = 0; i < hobby.length; i++) {
        if (hobby[i].checked) {
            seleccionados++
        }
    }
    return seleccionados
}

function cantNac() {
    let nac = 0;
    for (let i = 0; i < nacionalidad.length; i++) {
        if (nacionalidad[i].checked) {
            nac++
        }
    }
    return nac
}

boton.addEventListener('click', (e) => {
    let var1 = cantHobbies();
    let var2 = cantNac();
    if (var1 > 4 | var2 == 0) {
        e.preventDefault();
        alert("Maximo 4 hobbies y al menos una nacionalidad")
    }

    if (campo3.value.length < 6) {
        e.preventDefault();
        alert("el teléfono tiene al menos 6 caracteres");
    }
    if (campo2.value.length < 4) {
        e.preventDefault();
        alert("la contraseña tiene al menos 4 caracteres");
    }
});