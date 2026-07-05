function marcador(partido) {

    if (
        partido.golesLocal == null ||
        partido.golesVisitante == null
    ) {
        return "vs";
    }

    // Resultado normal
    let local =
        `${partido.golesLocal}`;

    let visitante =
        `${partido.golesVisitante}`;

    // Si hubo penales
    if (
        partido.duracion === "PENALTY_SHOOTOUT"
    ) {

        local += ` (${partido.penales.home})`;
        visitante += ` (${partido.penales.away})`;

    }

    // Si hubo alargue
    if (
        partido.duracion === "EXTRA_TIME"
    ) {

        visitante += " ET";

    }

    return `
        <div>${local}</div>
        <div>${visitante}</div>
    `;

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
    <span
        class="equipo-link"
        onclick="location.href='equipo.html?equipo=${encodeURIComponent(partido.local)}'"
    >
        ${obtenerBandera(partido.local)}
        ${partido.local || "—"}
    </span>
</td>

                    <td style="
    text-align:center;
    font-weight:bold;
    width:70px;
    line-height:1.4;
">
    ${marcador(partido)}
</td>

                    <td>
    <span
        class="equipo-link"
        onclick="location.href='equipo.html?equipo=${encodeURIComponent(partido.visitante)}'"
    >
        ${obtenerBandera(partido.visitante)}
        ${partido.visitante || "—"}
    </span>
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
