async function cargarHome() {

    const response =
        await fetch("./data/partidos.json");

    const partidos =
        await response.json();

    const terminados =
        partidos.filter(
            p => p.estado === "FINISHED"
        );

    const pendientes =
        partidos.filter(
            p =>
                p.estado !== "FINISHED"
        );

    document.getElementById(
        "ultimosResultados"
    ).innerHTML =
        terminados
        .slice(-5)
        .reverse()
        .map(p => `

            <div class="partido">

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

        `)
        .join("");

    document.getElementById(
        "proximosPartidos"
    ).innerHTML =
        pendientes
        .slice(0,5)
        .map(p => `

            <div class="partido">

                <div class="resultado">

                    ${p.local}

                    <strong>vs</strong>

                    ${p.visitante}

                </div>

            </div>

        `)
        .join("");

}

cargarHome();
