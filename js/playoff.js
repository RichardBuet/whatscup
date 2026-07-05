//--------------------------------------------------
// WhatsCup
// Playoff V2
// Parte 1/4
//--------------------------------------------------

const FASES = [

    ["LAST_32","32avos"],
    ["LAST_16","Octavos"],
    ["QUARTER_FINALS","Cuartos"],
    ["SEMI_FINALS","Semifinales"],
    ["THIRD_PLACE","3° Puesto"],
    ["FINAL","Final"]

];

const FIFA = {

    "Argentina":"ARG",
    "Australia":"AUS",
    "Austria":"AUT",
    "Belgium":"BEL",
    "Bosnia and Herzegovina":"BIH",
    "Brazil":"BRA",
    "Canada":"CAN",
    "Cape Verde":"CPV",
    "Colombia":"COL",
    "Croatia":"CRO",
    "Czechia":"CZE",
    "DR Congo":"COD",
    "Ecuador":"ECU",
    "Egypt":"EGY",
    "England":"ENG",
    "France":"FRA",
    "Germany":"GER",
    "Ghana":"GHA",
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

function codigoEquipo(nombre){

    return FIFA[nombre] ||
        nombre
            .substring(0,3)
            .toUpperCase();

}

function marcadorLocal(partido){

    if(
        partido.golesLocal==null
    ){
        return "VS";
    }

    let texto =
        `${partido.golesLocal}`;

    if(
        partido.duracion==="PENALTY_SHOOTOUT"
        &&
        partido.penales
    ){

        texto +=
            ` (${partido.penales.home})`;

    }

    return texto;

}

function marcadorVisitante(partido){

    if(
        partido.golesVisitante==null
    ){
        return "";

    }

    let texto =
        `${partido.golesVisitante}`;

    if(
        partido.duracion==="PENALTY_SHOOTOUT"
        &&
        partido.penales
    ){

        texto +=
            ` (${partido.penales.away})`;

    }

    if(
        partido.duracion==="EXTRA_TIME"
    ){

        texto +=
            " ET";

    }

    return texto;

}

function claseGanador(
    partido,
    lado
){

    if(
        partido.ganador===lado
    ){

        return " ganador";

    }

    return "";

}

function fechaPartido(
    partido
){

    return `
        <div class="fecha">

            ${partido.fecha}

            ·

            ${partido.hora}

        </div>
    `;

}

async function cargarPlayoff(){

    const version =
        Math.floor(
            Date.now()/900000
        );

    const response =
        await fetch(
            `data/partidos.json?v=${version}`
        );

    const partidos =
        await response.json();

    const contenedor =
        document.getElementById(
            "contenidoPosiciones"
        );

    let html = "";

  //--------------------------------------------------
// Playoff V2
// Parte 2/4
//--------------------------------------------------

    //--------------------------------------------------
    // Botones de fases
    //--------------------------------------------------

    html += `

        <div class="tabs-posiciones">

    `;

    FASES.forEach(

        (fase,index)=>{

            html += `

                <button

                    class="${
                        index===0
                        ? "tab-activa"
                        : ""
                    }"

                    onclick="
                        mostrarFase(
                            '${fase[0]}',
                            this
                        )
                    "

                >

                    ${fase[1]}

                </button>

            `;

        }

    );

    html += `

        </div>

    `;

    //--------------------------------------------------
    // Contenido por fase
    //--------------------------------------------------

    FASES.forEach(

        (fase,index)=>{

            const lista =

                partidos.filter(

                    p=>

                        p.fase===fase[0]

                );

            html += `

                <div

                    id="fase_${fase[0]}"

                    style="
                        display:${
                            index===0
                            ? "block"
                            : "none"
                        };
                    "

                >

            `;

            lista.forEach(

                partido=>{

                    html += `

                        <div class="playoff-card">

                            ${fechaPartido(partido)}

                            <div class="playoff-equipo${claseGanador(partido,"HOME_TEAM")}">

                                <div>

                                    <span

                                        class="equipo-link"

                                        onclick="
                                            location.href=
                                            'equipo.html?equipo=${encodeURIComponent(partido.local)}'
                                        "

                                    >

                                        ${obtenerBandera(partido.local)}

                                        ${codigoEquipo(partido.local)}

                                    </span>

                                </div>

                                <div class="playoff-marcador">

                                    ${marcadorLocal(partido)}

                                </div>

                            </div>

                            <div class="playoff-equipo${claseGanador(partido,"AWAY_TEAM")}">

                                <div>

                                    <span

                                        class="equipo-link"

                                        onclick="
                                            location.href=
                                            'equipo.html?equipo=${encodeURIComponent(partido.visitante)}'
                                        "

                                    >

                                        ${obtenerBandera(partido.visitante)}

                                        ${codigoEquipo(partido.visitante)}

                                    </span>

                                </div>

                                <div class="playoff-marcador">

                                    ${marcadorVisitante(partido)}

                                </div>

                            </div>

                    `;

                    if(

                        partido.estadio

                    ){

                        html += `

                            <div class="playoff-info">

                                🏟

                                ${partido.estadio}

                            </div>

                        `;

                    }





                  //--------------------------------------------------
// Playoff V2
// Parte 3/4
//--------------------------------------------------

                    if(

                        partido.duracion==="PENALTY_SHOOTOUT"

                    ){

                        html += `

                            <div class="playoff-info">

                                🎯 Penales

                                ${partido.penales.home}

                                -

                                ${partido.penales.away}

                            </div>

                        `;

                    }

                    else if(

                        partido.duracion==="EXTRA_TIME"

                    ){

                        html += `

                            <div class="playoff-info">

                                ⏱ Definido en alargue

                            </div>

                        `;

                    }

                    html += `

                        </div>

                    `;

                }

            );

            html += `

                </div>

            `;

        }

    );

    contenedor.innerHTML = html;

}

//--------------------------------------------------
// Mostrar fase
//--------------------------------------------------

function mostrarFase(

    fase,

    boton

){

    document

        .querySelectorAll(

            "[id^='fase_']"

        )

        .forEach(

            div =>

                div.style.display =

                    "none"

        );

    document

        .getElementById(

            "fase_" + fase

        )

        .style.display =

            "block";

    document

        .querySelectorAll(

            ".tabs-posiciones button"

        )

        .forEach(

            b =>

                b.classList.remove(

                    "tab-activa"

                )

        );

    boton.classList.add(

        "tab-activa"

    );


  //--------------------------------------------------
// Playoff V2
// Parte 4/4
//--------------------------------------------------

//--------------------------------------------------
// Abrir automáticamente la primera fase
//--------------------------------------------------

function iniciarPlayoff(){

    const primerBoton =

        document.querySelector(

            ".tabs-posiciones button"

        );

    if(

        primerBoton

    ){

        primerBoton.click();

    }

}

//--------------------------------------------------
// Inicializar
//--------------------------------------------------

cargarPlayoff()
.then(

    ()=>{

        iniciarPlayoff();

    }

)
.catch(

    error=>{

        console.error(

            "Error cargando playoff:",

            error

        );

        const contenedor =

            document.getElementById(

                "contenidoPosiciones"

            );

        if(

            contenedor

        ){

            contenedor.innerHTML = `

                <div
                    class="mensaje-error"
                >

                    No fue posible cargar el
                    Playoff.

                </div>

            `;

        }

    }

);

  
