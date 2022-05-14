window.onload = () => {
    const noticias = [{
            titulo: "Turismo de vacunas: 2.000 personas por día reciben su dosis en el aeropuerto de Miami ",
            imgUrl: "https://images.pexels.com/photos/9906385/pexels-photo-9906385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            descripcion: "Fácil y rápido son los dos adjetivos que más repiten las personas que describen cómo es el proceso de vacunación en el aeropuerto internacional de Miami.En su mayoría son turistas internacionales quienes se inoculan al día en la clínica instalada en la terminal aérea ",
            fecha: "07/06/21",
            tipoNacional: true
        },
        {
            titulo: "El gran gesto por amor de Jennifer Lopez hacia Ben Affleck ",
            imgUrl: "https://images.pexels.com/photos/9906385/pexels-photo-9906385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            descripcion: "La cantante fue vista averiguando sobre escuelas en Los Ángeles, lo que hace suponer que podría mudarse con sus hijos allí para estar cerca del actor",
            fecha: "02/06/21",
            tipoNacional: false
        },
        {
            titulo: "Cómo evitar que se empañen los anteojos al usar barbijo",
            imgUrl: "https://images.pexels.com/photos/5044497/pexels-photo-5044497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            descripcion: "Para quienes utilizan anteojos, la combinación del uso obligatorio de tapabocas desde el año pasado se volvió una complicación.Paso a paso para evitar que se empañen",
            fecha: "01/06/21",
            tipoNacional: true
        },
        {
            titulo: "La UE aprobó el fondo de USD 21.000 millones para apoyar a las regiones más afectadas por la transición verde ",
            imgUrl: "https://images.pexels.com/photos/5044497/pexels-photo-5044497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            descripcion: "El objetivo es ayudar a los países a emprender la transición ecológica en su camino hacia una economía libre de emisiones de gases de efecto invernadero a mitad de siglo",
            fecha: "04/06/21",
            tipoNacional: false
        },
        {
            titulo: "Maradona: cómo es la muestra fotográfica argentina que deslumbra a todos en Serbia ",
            imgUrl: "https://images.pexels.com/photos/5044497/pexels-photo-5044497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            descripcion: "La exposición, que cuenta con postales icónicas de “El Diez” que capturaron los fotógrafos de la agencia de noticias Télam, es uno de los hitos del festival Mes de la Fotografía de Belgrado",
            fecha: "07/06/21",
            tipoNacional: true
        },
    ];

    let cuerpo = document.querySelector('main');

    for (let nota of noticias) {
        let divPpal = document.createElement('div');
        if (nota.tipoNacional == false) {
            divPpal.classList.add('internacional');
        }

        let titulo = document.createElement('h2');
        let textoTitulo = document.createTextNode(nota.titulo);
        titulo.appendChild(textoTitulo);

        let foto = document.createElement('img');
        foto.setAttribute('src', nota.imgUrl);

        let fecha = document.createElement('p');
        fecha.classList.add('fecha');
        let textoFecha = document.createTextNode(nota.fecha);
        fecha.appendChild(textoFecha);

        let desc = document.createElement('p');
        let textoDesc = document.createTextNode(nota.descripcion);
        desc.appendChild(textoDesc);

        divPpal.appendChild(titulo);
        divPpal.appendChild(foto);
        divPpal.appendChild(fecha);
        divPpal.appendChild(desc);

        cuerpo.appendChild(divPpal);
    }

}