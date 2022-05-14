window.addEventListener("load", function() {
    /* ---------------------- obtenemos variables globales ---------------------- */

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let valorEmail = document.querySelector('#inputEmail').value;
        let valorPass = document.querySelector('#inputPassword').value;
        let valorNombre = document.querySelector('#inputNombre').value;
        let valorApellido = document.querySelector('#inputApellido').value;

        registrarUsuario(valorEmail, valorPass, valorNombre, valorApellido);
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    const urlBase = 'https://ctd-todo-api.herokuapp.com/v1/';
    const keyToken = '21esa';

    function registrarUsuario(nombre, apellido, email, pass) {
        // Acá llamamos a la API
        const urlLogin = urlBase + 'users';
        const settings = {
            method: 'POST',
            body: JSON.stringify({ firstName: nombre, lastName: apellido, email: email, password: pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(urlLogin, settings)
            .then(response => {
                if (response.status == 400) {
                    showMessage('Credenciales inválidas.');
                }

                if (response.status == 500) {
                    showMessage('Error al conectarse con el servidor, intente mas tarde.');
                }

                if (response.status == 201) {
                    showMessage('Usuario creado correctamente.');
                    return response.json();
                }
                console.log(response.status);
            })
            .then(data => {
                if (data) {
                    sessionStorage.setItem(keyToken, data.jwt);
                    location.replace('mis-tareas.html');
                }
            });
    };

    function showMessage(message) {
        alert(message);
    }

    document.querySelector("#inputNombre").addEventListener("blur", (e) => {
        if (validarNombreOApellido(e.target.value) == false) {
            mostrarErrores("El nombre no puede contener números ni guiones.");
        }
    });

    document.querySelector("#inputApellido").addEventListener("blur", (e) => {
        if (validarNombreOApellido(e.target.value) == false) {
            mostrarErrores("El apellido no puede contener números ni guiones.");
        }
    });

    document.querySelector("#inputEmail").addEventListener("blur", (e) => {
        console.log(e.target.value);
        if (!validarEmail(e.target.value)) {
            mostrarErrores("El email no tiene el formato esperado.");
        }
    });

    const pass1 = document.querySelector("#inputPassword");
    const pass2 = document.querySelector("#inputPasswordRepetida");

    pass1.addEventListener("focus", () => {
        console.log(
            "La contraseña tiene que tener un mínimo de 4 dígitos y al menos un número."
        );
    });

    pass1.addEventListener("blur", (e) => {
        validarContrasenias(e);
    });

    pass2.addEventListener("blur", (e) => {
        validarContrasenias(e);
    });

    function validarContrasenias(e) {
        let contraseniaValida = validarContrasenia(e.target.value) == false;
        let contraseniasNoVacia = contraseniasNoSonVacias(pass1.value, pass2.value);

        if (contraseniaValida && contraseniasNoVacia) {
            let contraseniasIguales = compararContrasenias(pass1.value, pass2.value);
            if (!contraseniasIguales) {
                mostrarErrores("Las contraseñas no coniciden.");
            } else {
                limpiarErrores();
            }
        }
    }
});