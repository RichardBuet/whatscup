const FIFA = {
    "Algeria":"ALG",
    "Argentina":"ARG",
    "Australia":"AUS",
    "Austria":"AUT",
    "Belgium":"BEL",
    "Bosnia-Herzegovina":"BIH",
    "Brazil":"BRA",
    "Canada":"CAN",
    "Cape Verde Islands":"CPV",
    "Colombia":"COL",
    "Congo DR":"COD",
    "Croatia":"CRO",
    "Curaçao":"CUW",
    "Czechia":"CZE",
    "Ecuador":"ECU",
    "Egypt":"EGY",
    "England":"ENG",
    "France":"FRA",
    "Germany":"GER",
    "Ghana":"GHA",
    "Haiti":"HAI",
    "Iran":"IRN",
    "Iraq":"IRQ",
    "Ivory Coast":"CIV",
    "Japan":"JPN",
    "Jordan":"JOR",
    "Mexico":"MEX",
    "Morocco":"MAR",
    "Netherlands":"NED",
    "New Zealand":"NZL",
    "Norway":"NOR",
    "Panama":"PAN",
    "Paraguay":"PAR",
    "Portugal":"POR",
    "Qatar":"QAT",
    "Saudi Arabia":"KSA",
    "Scotland":"SCO",
    "Senegal":"SEN",
    "South Africa":"RSA",
    "South Korea":"KOR",
    "Spain":"ESP",
    "Sweden":"SWE",
    "Switzerland":"SUI",
    "Tunisia":"TUN",
    "Turkey":"TUR",
    "United States":"USA",
    "Uruguay":"URU",
    "Uzbekistan":"UZB"

};

function nombreCorto(nombre){

    if(window.innerWidth <= 900){

        return FIFA[nombre] || nombre;

    }

    return nombre;

}



function nombreFase(fase){

    switch(fase){

        case "GROUP_STAGE": return "🌍 Grupos";
        case "LAST_32": return "🏆 16avos";
        case "LAST_16": return "🏆 Octavos";
        case "QUARTER_FINALS": return "🏆 Cuartos";
        case "SEMI_FINALS": return "🏆 Semifinales";
        case "THIRD_PLACE": return "🥉 3° Puesto";
        case "FINAL": return "🏆 Final";

        default:
            return "";

    }

}

function fechaCorta(fecha){
    return fecha.substring(8,10) + "/" + fecha.substring(5,7);
}

async function cargarEquipo() {

    const version =
        Math.floor(
            Date.now() / 900000
        );

    const params =
        new URLSearchParams(
            window.location.search
        );

    const nombreEquipo =
        params.get("equipo");

    const html =
        document.getElementById(
            "equipoDetalle"
        );

    if (!nombreEquipo) {

        html.innerHTML =
            "<h2>Seleccioná un equipo</h2>";

        return;

    }

    const responsePosiciones =
        await fetch(
            `data/posiciones.json?v=${version}`
        );

    const grupos =
        await responsePosiciones.json();

    let equipoEncontrado = null;
    let posicionGrupo = null;

    Object.keys(grupos).forEach(grupo => {

        grupos[grupo].forEach((equipo,index) => {

            if (
                equipo.equipo === nombreEquipo
            ) {

                equipoEncontrado = {
                    ...equipo,
                    grupo
                };

                posicionGrupo =
                    index + 1;

            }

        });

    });

    if (!equipoEncontrado) {

        html.innerHTML =
            "<h2>Equipo no encontrado</h2>";

        return;

    }

    const responsePartidos =
        await fetch(
            `data/partidos.json?v=${version}`
        );

    const partidos =
        await responsePartidos.json();

    const jugados =
        partidos.filter(p =>

            (
                p.local === nombreEquipo ||
                p.visitante === nombreEquipo
            )

            &&

            p.estado === "FINISHED"

        );

    const proximos =
        partidos.filter(p =>
            
            (
                p.local === nombreEquipo ||
                p.visitante === nombreEquipo
            )

            &&

            p.estado !== "FINISHED"

        );
    
let estadoActual = "❌ Eliminado en Fase de Grupos";

if (proximos.length) {

    const siguiente = proximos[0];

    estadoActual =
        `⏳ Juega ${nombreFase(siguiente.fase)}`;

}
else if (jugados.length) {

    const ultimo = jugados[jugados.length - 1];

    if (ultimo.fase === "FINAL") {

        estadoActual =
            ultimo.ganador === "HOME_TEAM" && ultimo.local === nombreEquipo ||
            ultimo.ganador === "AWAY_TEAM" && ultimo.visitante === nombreEquipo

            ? "🏆 Campeón"
            : "🥈 Subcampeón";

    }
    else {

        const gano =

            ultimo.ganador === "HOME_TEAM" && ultimo.local === nombreEquipo ||

            ultimo.ganador === "AWAY_TEAM" && ultimo.visitante === nombreEquipo;

        estadoActual = gano

            ? `✅ Clasificado a ${nombreFase(ultimo.fase)}`

            : `❌ Eliminado en ${nombreFase(ultimo.fase)}`;

    }

}


    
    html.innerHTML = `

        <a
            href="javascript:history.back()"
            class="volver"
        >
            ← Volver
        </a>

        <h1>

            ${obtenerBandera(
                equipoEncontrado.equipo
            )}

            ${equipoEncontrado.equipo}

        </h1>

        <br>

        <p style="margin-top:8px;font-weight:600">

    Grupo ${equipoEncontrado.grupo}:

            ${
                posicionGrupo === 1
                ? "🥇"
                : posicionGrupo === 2
                ? "🥈"
                : posicionGrupo === 3
                ? "🥉"
                : "⚪"
            }

            ${posicionGrupo}° del Grupo

        </p>

        <p style="margin-top:8px;font-weight:600">
        
        🏆 Estado actual:
        
        ${estadoActual}
        </p>
        <br>
        <div class="equipo-card stats-card">
        
            <div class="stats-resumen">
        
                <span><b>PJ</b> ${equipoEncontrado.pj}</span>
                <span><b>PG</b> ${equipoEncontrado.pg}</span>
                <span><b>PE</b> ${equipoEncontrado.pe}</span>
                <span><b>PP</b> ${equipoEncontrado.pp}</span>
                <span><b>GF</b> ${equipoEncontrado.gf}</span>
                <span><b>GC</b> ${equipoEncontrado.gc}</span>
                <span><b>DG</b> ${equipoEncontrado.gf-equipoEncontrado.gc}</span>
                <span><b>PTS</b> ${equipoEncontrado.pts}</span>
        
            </div>
        
        </div>

        <br>

        <h2>
            ⚽ Partidos jugados:
        </h2>

        <div id="partidosJugados"></div>

        ${
            proximos.length
            ? `
                <br>
                <h2>📅 Próximos partidos: </h2>
                <div id="proximosPartidos"></div>
            `
            : ""
        }

    `;

    const contenedorJugados =
        document.getElementById(
            "partidosJugados"
        );

    jugados.forEach(p => {

        contenedorJugados.innerHTML += `

            <div class="partido">

                <div class="fecha">
                    ${nombreFase(p.fase)}
                    ${
                        p.grupo
                        ? ` ${p.grupo}`
                        : ""
                    }
                    •
                    ${fechaCorta(p.fecha)}
                </div>
                
                <div class="resultado">

                    <span>
                        ${obtenerBandera(
                            p.local
                        )}
                        ${nombreCorto(p.local)}
                    </span>

                    <strong>
                        ${p.golesLocal}
                        -
                        ${p.golesVisitante}
                    </strong>

                    <span>
                        ${obtenerBandera(
                            p.visitante
                        )}
                        ${nombreCorto(p.visitante)}
                    </span>

                </div>

            </div>

        `;

    });

    const contenedorProximos =
        document.getElementById(
            "proximosPartidos"
        );

    proximos.forEach(p => {

        contenedorProximos.innerHTML += `

            <div class="partido">

                <div class="fecha">
                    ${nombreFase(p.fase)}
                    ${
                        p.grupo
                        ? ` ${p.grupo}`
                        : ""
                    }
                    •
                    ${fechaCorta(p.fecha)}
                </div>

                <div class="resultado">

                    <span>
                        ${obtenerBandera(
                            p.local
                        )}
                        ${nombreCorto(p.local)}
                    </span>

                    <strong>

                        ${
                            p.estado === "TIMED"
                            ? "VS"
                            : `${p.golesLocal} - ${p.golesVisitante}`
                        }

                    </strong>

                    <span>
                        ${obtenerBandera(
                            p.visitante
                        )}
                        ${nombreCorto(p.visitante)}
                    </span>

                </div>

            </div>

        `;

    });

}




cargarEquipo();
