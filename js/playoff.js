async function cargarPlayoff() {

    const response = await fetch(
        "./data/partidos.json"
    );

    const partidos =
        await response.json();

    const fases = [

        {
            codigo: "LAST_32",
            titulo: "32avos de Final"
        },

        {
            codigo: "LAST_16",
            titulo: "Octavos de Final"
        },

        {
            codigo: "QUARTER_FINALS",
            titulo: "Cuartos de Final"
        },

        {
            codigo: "SEMI_FINALS",
            titulo: "Semifinales"
        },

        {
            codigo: "THIRD_PLACE",
            titulo: "3° Puesto"
        },

        {
            codigo: "FINAL",
            titulo: "Final"
        }

    ];

    const contenedor =
        document.getElementById(
            "playoff"
        );

    contenedor.innerHTML = "";

    for (const fase of fases) {

        const lista =
            partidos.filter(

                partido =>
                    partido.fase ===
                    fase.codigo

            );

        if (!lista.length) {

            continue;

        }

        let html = `

        <section class="fase">

            <h2>

                ${fase.titulo}

            </h2>

        `;

        for (const partido of lista) {

            html += `

            <div class="partido">

                <div class="fecha">

                    ${partido.fecha}
                    ${partido.hora}

                </div>

                <div class="equipos">

                    <span>

                        ${partido.local || "—"}

                    </span>

                    <strong>

                        ${marcador(partido)}

                    </strong>

                    <span>

                        ${partido.visitante || "—"}

                    </span>

                </div>

            </div>

            `;

        }

        html += "</section>";

        contenedor.innerHTML += html;

    }

}
