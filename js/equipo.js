async function cargarEquipo() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const nombreEquipo =
        params.get("equipo");

    const responsePosiciones =
        await fetch(
            "data/posiciones.json"
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


    
    const html =
        document.getElementById(
            "equipoDetalle"
        );

    if (!equipoEncontrado) {

        html.innerHTML =
            "<h2>Equipo no encontrado</h2>";

        return;

    }

    const responsePartidos =
        await fetch(
            "data/partidos.json"
        );

    const partidos =
        await responsePartidos.json();

    const jugados =
        partidos.filter(p =>

            (p.local === nombreEquipo ||
             p.visitante === nombreEquipo)

            &&

            p.estado === "FINISHED"

        );

    const proximos =
        partidos.filter(p =>

            (p.local === nombreEquipo ||
             p.visitante === nombreEquipo)

            &&

            p.estado !== "FINISHED"

        );

    html.innerHTML = `

        <a
            href="javascript:history.back()"
            class="volver"
        >
            ← Volver
        </a>

        <h1>

            ${banderas[equipoEncontrado.equipo] || "🏳️"}
        
            ${equipoEncontrado.equipo}
        
        </h1>

        <br>

        <h2>
            Grupo ${equipoEncontrado.grupo}
        </h2>
        
        <p>
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

        <br>

        <div class="equipo-card">

            <p>PJ: ${equipoEncontrado.pj}</p>
            <p>PG: ${equipoEncontrado.pg}</p>
            <p>PE: ${equipoEncontrado.pe}</p>
            <p>PP: ${equipoEncontrado.pp}</p>

            <br>

            <p>GF: ${equipoEncontrado.gf}</p>
            <p>GC: ${equipoEncontrado.gc}</p>

            <p>
                DG:
                ${
                    equipoEncontrado.gf -
                    equipoEncontrado.gc
                }
            </p>

            <br>

            <h2>
                PTS:
                ${equipoEncontrado.pts}
            </h2>

        </div>

        <br>

        <h2>
            ⚽ Partidos jugados
        </h2>

        <div id="partidosJugados"></div>

        <br>

        <h2>
            📅 Próximos partidos
        </h2>

        <div id="proximosPartidos"></div>

    `;

    const contenedorJugados =
        document.getElementById(
            "partidosJugados"
        );

    jugados.forEach(p => {

        contenedorJugados.innerHTML += `

            <div class="partido">

                <div class="fecha">
                    ${p.fecha}
                </div>

                <div class="resultado">

                    ${p.local}

                    <strong>

                        ${p.golesLocal}
                        -
                        ${p.golesVisitante}

                    </strong>

                    ${p.visitante}

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
                    ${p.fecha}
                </div>

                <div class="resultado">

                    ${p.local}

                    <strong>
                        vs
                    </strong>

                    ${p.visitante}

                </div>

            </div>

        `;

    });

}

cargarEquipo();
