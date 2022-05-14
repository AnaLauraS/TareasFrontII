// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function() {

    const keyToken = '21esa';
    let token = sessionStorage.getItem(keyToken);

    if (token == null) {
        alert('Debe ingresar primero a una cuenta');
        location.replace('index.html')
    }


    /* ---------------- variables globales y llamado a funciones ---------------- */
    let btnCerrarSesion = document.querySelector('#closeApp');
    let formCrearTarea = document.querySelector('.nueva-tarea');
    const urlBase = 'https://ctd-todo-api.herokuapp.com/v1/';
    /* -------------------------------------------------------------------------- */
    /*                          FUNCIÓN 1 - Cerrar sesión                         */
    /* -------------------------------------------------------------------------- */

    btnCerrarSesion.addEventListener('click', function() {
        location.replace('index.html');
        sessionStorage.removeItem('21esa');
    });

    /* -------------------------------------------------------------------------- */
    /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
    /* -------------------------------------------------------------------------- */

    function obtenerNombreUsuario() {
        //los parámetros deberán ser la url y el token para la autorización
        const urlLogin = urlBase + 'users/getMe';
        const conf = {
            method: 'GET',
            headers: {
                authorization: token
            }
        }

        // creo el único parámetro que recibirá el fetch
        const requerimiento = new Request(urlLogin, conf);

        // fetch para get siempre acepta un solo parámetro.
        fetch(requerimiento)
            .then(response => {
                if (response.status == 404) {
                    showMessage('El usuario no existe');
                }

                if (response.status == 500) {
                    showMessage('Error al conectarse con el servidor, intente mas tarde.');
                }

                if (response.status == 200) {
                    return response.json();
                }
                console.log(response.status);
            })
            .then(data => {
                if (data) {
                    console.log(data.firstName);
                    let seccion = document.querySelector('.user-info');
                    seccion.firstElementChild.innerHTML = `<p>Bienvenido/a ${data.firstName}</p>`
                }
            });
    };

    /* para hacerlo asincrónico:
async function obtenerNombreAsync(){
    const urlLogin = urlBase + 'users/getMe';
        const conf = {
            method: 'GET',
            headers: {
                authorization: token
            }
        }
    let response = wait fetch (urlLogin, settings);
    let data = await response.json();
    return data;
}

    */


    /* -------------------------------------------------------------------------- */
    /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
    /* -------------------------------------------------------------------------- */

    function consultarTareas() {
        const urlLogin = urlBase + 'tasks';
        const conf = {
            method: 'GET',
            headers: {
                authorization: token
            }
        }
        const requerimiento = new Request(urlLogin, conf);
        fetch(requerimiento)
            .then(response => {
                if (response.status == 404) {
                    showMessage('El usuario no existe');
                }

                if (response.status == 500) {
                    showMessage('Error al conectarse con el servidor, intente mas tarde.');
                }

                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    console.log(data);
                    renderizarTareas(data);
                    botonesCambioEstado();
                    botonBorrarTarea();
                }
            });
    };

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
    /* -------------------------------------------------------------------------- */

    formCrearTarea.addEventListener('submit', function(event) {
        event.preventDefault();
        let descripcionTarea = document.querySelector('#nuevaTarea').value;
        const urlLogin = urlBase + 'tasks';
        const conf = {
            method: 'POST',
            body: JSON.stringify({ description: descripcionTarea, completed: false }),
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            }
        }
        fetch(urlLogin, conf)
            .then(response => {
                if (response.status == 400) {
                    showMessage('No pusiste tarea');
                }
                if (response.status == 401) {
                    showMessage('Falta autenticación');
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
                    consultarTareas();
                    formCrearTarea.reset();
                }
            });
    });


    /* -------------------------------------------------------------------------- */
    /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
    /* -------------------------------------------------------------------------- */
    function renderizarTareas(listado) {

        // obtengo listados y limpio cualquier contenido interno
        const tareasPendientes = document.querySelector('.tareas-pendientes');
        const tareasTerminadas = document.querySelector('.tareas-terminadas');
        tareasPendientes.innerHTML = "";
        tareasTerminadas.innerHTML = "";

        // buscamos el numero de finalizadas
        const numeroFinalizadas = document.querySelector('#cantidad-finalizadas');
        let contador = 0;
        numeroFinalizadas.innerText = contador;

        listado.forEach(tarea => {
            //variable intermedia para manipular la fecha
            let fecha = new Date(tarea.createdAt);

            if (tarea.completed) {
                contador++;
                //lo mandamos al listado de tareas completas
                tareasTerminadas.innerHTML += `
              <li class="tarea">
                <div class="hecha">
                  <i class="fa-regular fa-circle-check"></i>
                </div>
                <div class="descripcion">
                  <p class="nombre">${tarea.description}</p>
                  <div class="cambios-estados">
                    <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                    <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
                  </div>
                </div>
              </li>
                            `
            } else {
                //lo mandamos al listado de tareas sin terminar
                tareasPendientes.innerHTML += `
              <li class="tarea">
                <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
                <div class="descripcion">
                  <p class="nombre">${tarea.description}</p>
                  <div class="cambios-estados">
                    <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
                  </div>
                  <p class="timestamp">${fecha.toLocaleDateString()}</p>
                </div>
              </li>
                            `
            }
            // actualizamos el contador en la pantalla
            numeroFinalizadas.innerText = contador;
        })
    }

    /* -------------------------------------------------------------------------- */
    /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
    /* -------------------------------------------------------------------------- */
    function botonesCambioEstado() {
        const botonesCambio = document.querySelectorAll('.change');

        botonesCambio.forEach(boton => {

            boton.addEventListener('click', function(event) {
                // obtengo el id del elemento clickeado con target
                const id = event.target.id;
                const url = urlBase + 'tasks/' + id
                const payload = {}; //¡?

                if (event.target.classList.contains('incompleta')) {
                    payload.completed = false;
                } else {
                    payload.completed = true;
                }

                const settingsCambio = {
                    method: 'PUT',
                    headers: {
                        "Authorization": token,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
                fetch(url, settingsCambio)
                    .then(response => {
                        console.log(response.status);
                        consultarTareas();
                    })
            })
        });
    }


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
    /* -------------------------------------------------------------------------- */
    function botonBorrarTarea() {
        const botonesEliminar = document.querySelectorAll('.borrar');

        botonesEliminar.forEach(boton => {

            boton.addEventListener('click', function(event) {
                // obtengo el id del elemento clickeado con target
                const id = event.target.id;
                const url = urlBase + 'tasks/' + id

                const conf2 = {
                    method: 'DELETE',
                    headers: {
                        "Authorization": token,
                    },
                }

                fetch(url, conf2)
                    .then(response => {
                        console.log(response.status);
                        consultarTareas();
                    })
            })
        });
    };

    obtenerNombreUsuario();
    consultarTareas();
    renderizarTareas();

});