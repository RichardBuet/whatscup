function marcador(partido) {

    if (
        partido.golesLocal == null ||
        partido.golesVisitante == null
    ) {
        return "vs";
    }

    let texto =
        `${partido.golesLocal} - ${partido.golesVisitante}`;

    if (partido.duracion === "PENALTY_SHOOTOUT") {
        texto += " (Pen.)";
    }
    else if (partido.duracion === "EXTRA_TIME") {
        texto += " (ET)";
    }

    return texto;
}

async function cargarPlayoff() {

    const version = Math.floor(Date.now() / 900000);

    const response = await fetch(
        `data/partidos.json?v=${version}`
    );

    const partidos = await response.json();

    const fases = [

        ["LAST_32","32avos de Final"],
        ["LAST_16","Octavos de Final"],
        ["QUARTER_FINALS","Cuartos de Final"],
        ["SEMI_FINALS","Semifinales"],
        ["THIRD_PLACE","3° Puesto"],
        ["FINAL","Final"]

    ];

    const contenedor =
        document.getElementById(
            "contenidoPosiciones"
        );

    let html = "";

    for (const [codigo,titulo] of fases) {

        const lista =
            partidos.filter(
                p => p.fase === codigo
            );

        if (!lista.length) continue;

        html += `
            <h2 class="grupo-titulo">${titulo}</h2>

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
                        ${obtenerBandera(partido.local)}
                        ${partido.local || "—"}
                    </td>

                    <td style="
                        text-align:center;
                        font-weight:bold;
                        width:90px;
                    ">
                        ${marcador(partido)}
                    </td>

                    <td>
                        ${obtenerBandera(partido.visitante)}
                        ${partido.visitante || "—"}
                    </td>

                </tr>
            `;

        });

        html += `
                </tbody>
            </table>
        `;
    }

    contenedor.innerHTML = html;

}
