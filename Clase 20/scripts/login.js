window.addEventListener('load', function() {
    /* ---------------------- obtenemos variables globales ---------------------- */





    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let valorEmail = document.querySelector('#inputEmail').value;
        let valorPass = document.querySelector('#inputPassword').value;
        realizarLogin(valorEmail, valorPass);

    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    const urlBase = 'https://ctd-todo-api.herokuapp.com/v1';
    const keyToken = '21esa';

    function realizarLogin(mail, pass) {
        //Parametros de configuración de la API
        const urlLogin = urlBase + '/users/login';
        const settings = {
            method: 'POST',
            body: JSON.stringify({ email: mail, password: pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        //Llamado de la api 
        fetch(urlLogin, settings)
            .then(response => {
                if (response.status == 400 || response.status == 404) {
                    showMessage('Credenciales inválidas.');
                }

                if (response.status == 500) {
                    showMessage('Error al conectarse con el servidor, intente mas tarde.');
                }

                if (response.status == 201) {
                    return response.json();
                }
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


});