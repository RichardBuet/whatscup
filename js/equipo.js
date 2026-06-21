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

        <div class="equipo-card stats-card">

            <div class="stats-header">

                <span>PJ</span>
                <span>PG</span>
                <span>PE</span>
                <span>PP</span>
                <span>GF</span>
                <span>GC</span>
                <span>DG</span>

            </div>

            <div class="stats-values">

                <span>${equipoEncontrado.pj}</span>
                <span>${equipoEncontrado.pg}</span>
                <span>${equipoEncontrado.pe}</span>
                <span>${equipoEncontrado.pp}</span>
                <span>${equipoEncontrado.gf}</span>
                <span>${equipoEncontrado.gc}</span>

                <span>
                    ${
                        equipoEncontrado.gf -
                        equipoEncontrado.gc
                    }
                </span>

            </div>

            <div class="stats-points">

                PTS:
                ${equipoEncontrado.pts}

            </div>

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

                    <span>
                        ${obtenerBandera(
                            p.local
                        )}
                        ${p.local}
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
                        ${p.visitante}
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
                    ${p.fecha}
                </div>

                <div class="resultado">

                    <span>
                        ${obtenerBandera(
                            p.local
                        )}
                        ${p.local}
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
                        ${p.visitante}
                    </span>

                </div>

            </div>

        `;

    });

}

cargarEquipo();
