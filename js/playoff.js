const FIFA = {

    "Argentina":"ARG",
    "Algeria":"ALG",
    "Australia":"AUS",
    "Austria":"AUT",
    "Belgium":"BEL",
    "Bosnia-Herzegovina":"BIH",
    "Brazil":"BRA",
    "Canada":"CAN",
    "Cape Verde Islands":"CPV",
    "Colombia":"COL",
    "Croatia":"CRO",
    "Czechia":"CZE",
    "Congo DR":"COD",
    "Ecuador":"ECU",
    "Egypt":"EGY",
    "England":"ENG",
    "France":"FRA",
    "Germany":"GER",
    "Ghana":"GHA",
    "Ivory Coast":"CIV",
    "Japan":"JPN",
    "Mexico":"MEX",
    "Morocco":"MAR",
    "Netherlands":"NED",
    "Norway":"NOR",
    "Paraguay":"PAR",
    "Portugal":"POR",
    "Senegal":"SEN",
    "South Africa":"RSA",
    "Spain":"ESP",
    "Sweden":"SWE",
    "Switzerland":"SUI",
    "United States":"USA"

};

function nombreEquipo(nombre){

    if(window.innerWidth <= 900){

        return FIFA[nombre] || nombre;

    }

    return nombre;

}

let faseActual = "LAST_16";
let faseInicializada = false;

const FASES = [

    {
        codigo:"LAST_32",
        nombre:"16avos"
    },

    {
        codigo:"LAST_16",
        nombre:"Octavos"
    },

    {
        codigo:"QUARTER_FINALS",
        nombre:"Cuartos"
    },

    {
        codigo:"SEMI_FINALS",
        nombre:"Semis"
    },
{
        codigo:"THIRD_PLACE",
        nombre:"3° Puesto"
    },


    {
        codigo:"FINAL",
        nombre:"Final"
    }

    
];




function marcador(partido) {

    if (
        partido.golesLocal == null ||
        partido.golesVisitante == null
    ) {
        return "vs";
    }

    // Resultado normal
    let local =
        `${partido.golesLocal}`;

    let visitante =
        `${partido.golesVisitante}`;

    // Si hubo penales
    if (
        partido.duracion === "PENALTY_SHOOTOUT"
    ) {

        local += ` (${partido.penales.home})`;
        visitante += ` (${partido.penales.away})`;

    }

    // Si hubo alargue
    if (
        partido.duracion === "EXTRA_TIME"
    ) {

        visitante += " ET";

    }

    return `
        <div>${local}</div>
        <div>${visitante}</div>
    `;

}

async function cargarPlayoff() {

    const version = Math.floor(Date.now() / 900000);

    const response = await fetch(
        `data/partidos.json?v=${version}`
    );

    const partidos = await response.json();

const ORDEN = [

    "LAST_32",
    "LAST_16",
    "QUARTER_FINALS",
    "SEMI_FINALS",
    "THIRD_PLACE",
    "FINAL"

];

if(!faseInicializada){

    for(const codigo of ORDEN){

        if(
            partidos.some(
                p =>
                    p.fase === codigo &&
                    p.estado !== "FINISHED"
            )
        ){

            faseActual = codigo;
            break;

        }

    }

    faseInicializada = true;

}


    const contenedor =
        document.getElementById(
            "contenidoPosiciones"
        );

    let html = "";


    

 const fase = FASES.find(
    f => f.codigo === faseActual
);

const lista = partidos.filter(
    p => p.fase === fase.codigo
);

html += `

<div class="tabs-playoff">

${FASES

    .map(f => `
        <button
            class="btn-ronda ${f.codigo===faseActual?"activo":""}"
            onclick="
                faseActual='${f.codigo}';
                cargarPlayoff();
            "
        >
            ${f.nombre}
        </button>
    `)
    .join("")}

</div>

<h2 class="grupo-titulo">
    ${fase.nombre}
</h2>

<table class="tabla-grupo">
    <tbody>
`;

    
lista.forEach(partido => {

    html += `

        <tr>

            <td style="width:140px">
                ${partido.fecha}<br>
                ${partido.hora}
            </td>

            <td>
                <span
                    class="equipo-link"
                    onclick="location.href='equipo.html?equipo=${encodeURIComponent(partido.local)}'"
                >
                    ${obtenerBandera(partido.local)}
                    ${nombreEquipo(partido.local)}
                </span>
            </td>

            <td style="
                text-align:center;
                font-weight:bold;
                width:70px;
                line-height:1.4;
            ">
                ${marcador(partido)}
            </td>

            <td>
                <span
                    class="equipo-link"
                    onclick="location.href='equipo.html?equipo=${encodeURIComponent(partido.visitante)}'"
                >
                    ${obtenerBandera(partido.visitante)}
                    ${nombreEquipo(partido.visitante)}
                </span>
            </td>

        </tr>

    `;

});

html += `
        </tbody>
    </table>
`;

    contenedor.innerHTML = html;

}
