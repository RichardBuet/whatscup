async function cargarHome() {

    const response =
        await fetch(
            "./data/partidos.json?ver=1"
        );

    const partidos =
        await response.json();

    const enVivo =
        partidos.filter(
            p => p.estado === "IN_PLAY"
                        ||
            p.estado === "PAUSED"
        );

    const proximos =
        partidos.filter(
            p => p.estado === "TIMED"
        );

    const terminados =
        partidos.filter(
            p => p.estado === "FINISHED"
        );



    document.getElementById(
        "ultimosResultados"
    ).innerHTML =

        terminados
        .slice(-5)
        .reverse()
        .map(p => `

            <div class="partido">

                <div class="fecha">

                    ⚫ Finalizado

                    <br>

                    ${p.fecha}

                </div>

                <div class="resultado">

                    <span>
                        ${obtenerBandera(p.local)} 
                        ${p.local}
                    </span>

                    <strong>
                        ${p.golesLocal}
                        -
                        ${p.golesVisitante}
                    </strong>

                    <span>
                        ${obtenerBandera(p.visitante)}
                        ${p.visitante}
                    </span>

                </div>

            </div>

        `)
        .join("");



    document.getElementById(
        "proximosPartidos"
    ).innerHTML =

        [

            ...enVivo,

            ...proximos

        ]

        .slice(0,5)

        .map(p => `

            <div class="partido ${
                p.estado === "IN_PLAY"
                ? "partido-vivo"
                : ""
            }">

                <div class="fecha">

                    ${
                        p.estado === "IN_PLAY"
? "🟢 En vivo"
: p.estado === "PAUSED"
? "⏸️ Entretiempo"
: `🕖 ${p.hora}`
                    }

                    <br>

                    ${p.fecha}

                </div>

                <div class="resultado">

                    <span>
                       ${obtenerBandera(p.local)} 
                       ${p.local}
                    </span>

                    <strong>

                        ${
                            p.estado === "IN_PLAY"
                            ? `${p.golesLocal} - ${p.golesVisitante}`
                            : "vs"
                        }

                    </strong>

                    <span>
                        ${obtenerBandera(p.visitante)}
                        ${p.visitante}
                    </span>

                </div>

            </div>

        `)

        .join("");

}

cargarHome();
