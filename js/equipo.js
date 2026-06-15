async function cargarEquipo() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const nombreEquipo =
        params.get("equipo");

    const response =
        await fetch(
            "data/posiciones.json"
        );

    const grupos =
        await response.json();

    let equipoEncontrado = null;

    Object.keys(grupos).forEach(grupo => {

        grupos[grupo].forEach(equipo => {

            if (
                equipo.equipo === nombreEquipo
            ) {

                equipoEncontrado = {
                    ...equipo,
                    grupo
                };

            }

        });

    });

    const html =
        document.getElementById(
            "equipoDetalle"
        );

    if (!equipoEncontrado) {

        html.innerHTML =
            "Equipo no encontrado";

        return;

    }

    html.innerHTML = `

        <h1>
            ${equipoEncontrado.equipo}
        </h1>

        <br>

        <h2>
            Grupo ${equipoEncontrado.grupo}
        </h2>

        <br>

        <div class="equipo-card">

            <p>
                PJ:
                ${equipoEncontrado.pj}
            </p>

            <p>
                PG:
                ${equipoEncontrado.pg}
            </p>

            <p>
                PE:
                ${equipoEncontrado.pe}
            </p>

            <p>
                PP:
                ${equipoEncontrado.pp}
            </p>

            <br>

            <p>
                GF:
                ${equipoEncontrado.gf}
            </p>

            <p>
                GC:
                ${equipoEncontrado.gc}
            </p>

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

    `;

}

cargarEquipo();
