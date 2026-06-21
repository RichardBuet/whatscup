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
            `data/partidos.json?v=${version}`
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
