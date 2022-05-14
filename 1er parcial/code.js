/* --------------------------- NO TOCAR DESDE ACÁ --------------------------- */
let datosPersona = {
    nombre: "",
    edad: 0,
    ciudad: "",
    interesPorJs: "",
};

const listado = [{
        imgUrl: "https://huguidugui.files.wordpress.com/2015/03/html1.png",
        lenguajes: "HTML y CSS",
        bimestre: "1er bimestre",
    },
    {
        imgUrl: "https://jherax.files.wordpress.com/2018/08/javascript_logo.png",
        lenguajes: "Javascript",
        bimestre: "2do bimestre",
    },
    {
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
        lenguajes: "React JS",
        bimestre: "3er bimestre",
    },
];

const profileBtn = document.querySelector("#completar-perfil");
const materiasBtn = document.querySelector("#obtener-materias");
const verMasBtn = document.querySelector("#ver-mas");
const cambiarTema = document.querySelector('#cambiar-tema');

profileBtn.addEventListener("click", renderizarDatosUsuario);
materiasBtn.addEventListener("click", recorrerListadoYRenderizarTarjetas);
cambiarTema.addEventListener("click", alternarColorTema);
/* --------------------------- NO TOCAR HASTA ACÁ --------------------------- */

function obtenerDatosDelUsuario() {
    /* --------------- PUNTO 1: Escribe tu codigo a partir de aqui --------------- */
    datosPersona.nombre = prompt("Ingresá tu nombre");

    let anio = prompt("Ingresá el año en que naciste");
    let edadCalculada = new Date().getFullYear() - anio;
    if (edadCalculada > 0 & anio != "" & anio != null) {
        datosPersona.edad = edadCalculada;
    } else {
        datosPersona.edad = "Dato mal cargado";
    };

    datosPersona.ciudad = prompt("Ingresá la ciudad dónde vivís");
    datosPersona.interesPorJs = confirm("¿Te interesa Javascript?");
}

function renderizarDatosUsuario() {
    /* ------------------- NO TOCAR NI ELIMINAR ESTA FUNCION. ------------------- */
    obtenerDatosDelUsuario();
    /* --------------- PUNTO 2: Escribe tu codigo a partir de aqui --------------- */
    let spanNombre = document.getElementById('nombre');
    spanNombre.innerText = datosPersona.nombre;
    let spanEdad = document.getElementById('edad');
    spanEdad.innerText = datosPersona.edad;
    let spanCiudad = document.getElementById('ciudad');
    spanCiudad.innerText = datosPersona.ciudad;
    let spanJs = document.getElementById('javascript');
    spanJs.innerText = datosPersona.interesPorJs;
}


function recorrerListadoYRenderizarTarjetas() {
    /* ------------------ PUNTO 3: Escribe tu codigo desde aqui ------------------ */
    let comprobacion = document.querySelectorAll('.caja');
    if (comprobacion.length < 1) {
        for (let materia of listado) {
            let divCaja = document.createElement('div');
            divCaja.classList.add('caja');

            let imagen = document.createElement('img');
            imagen.setAttribute('src', materia.imgUrl);
            imagen.setAttribute('alt', materia.lenguajes);

            let pLeng = document.createElement('p');
            pLeng.classList.add('lenguajes');
            let textoLeng = document.createTextNode("Lenguajes: " + materia.lenguajes);
            pLeng.appendChild(textoLeng);

            let pBim = document.createElement('p');
            pBim.classList.add('bimestre');
            let textoBim = document.createTextNode("Bimestre: " + materia.bimestre);
            pBim.appendChild(textoBim);

            divCaja.appendChild(imagen);
            divCaja.appendChild(pLeng);
            divCaja.appendChild(pBim);
            let divFila = document.getElementById('fila');
            divFila.appendChild(divCaja);
        }
    }
}

function alternarColorTema() {
    /* --------------------- PUNTO 4: Escribe tu codigo aqui --------------------- */
    let theme = document.getElementById('sitio');
    theme.classList.toggle('dark');
}

/* --------------------- PUNTO 5: Escribe tu codigo aqui --------------------- */
window.addEventListener('keypress', (e) => {
    if (e.key == "f" | e.key == "F") {
        let texto = document.getElementById('sobre-mi');
        texto.classList.remove('oculto');
    }
})