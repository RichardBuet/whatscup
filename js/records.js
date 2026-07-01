async function cargarRecords() {

    const version = Math.floor(Date.now() / 900000);

    const response = await fetch(
        `data/partidos.json?v=${version}`
    );

    const partidos = await response.json();

    const contenedor =
        document.getElementById(
            "contenidoEstadisticas"
        );

    const equipos = {};

    let jugados = 0;
    let goles = 0;
    let empates = 0;

    let mayorGoleada = null;
    let partidoMasGoles = null;

    for (const p of partidos) {

        if (p.estado !== "FINISHED") continue;

        jugados++;

        const gl = p.golesLocal ?? 0;
        const gv = p.golesVisitante ?? 0;

        goles += gl + gv;

        if (gl === gv)
            empates++;

        if (!equipos[p.local]) {

            equipos[p.local] = {

                gf:0,
                gc:0,
                pg:0,
                pp:0,
                pj:0

            };

        }

        if (!equipos[p.visitante]) {

            equipos[p.visitante] = {

                gf:0,
                gc:0,
                pg:0,
                pp:0,
                pj:0

            };

        }

        equipos[p.local].pj++;
        equipos[p.visitante].pj++;

        equipos[p.local].gf += gl;
        equipos[p.local].gc += gv;

        equipos[p.visitante].gf += gv;
        equipos[p.visitante].gc += gl;

        if (gl > gv) {

            equipos[p.local].pg++;
            equipos[p.visitante].pp++;

        }

        else if (gv > gl) {

            equipos[p.visitante].pg++;
            equipos[p.local].pp++;

        }

        const diferencia =
            Math.abs(gl-gv);

        if (
            !mayorGoleada ||
            diferencia >
            mayorGoleada.diferencia
        ){

            mayorGoleada = {

                diferencia,

                texto:
                    `${obtenerBandera(p.local)} ${p.local}
                     ${gl}-${gv}
                     ${obtenerBandera(p.visitante)} ${p.visitante}`

            };

        }

        const total =
            gl+gv;

        if(
            !partidoMasGoles ||
            total >
            partidoMasGoles.total
        ){

            partidoMasGoles = {

                total,

                texto:
                    `${obtenerBandera(p.local)} ${p.local}
                     ${gl}-${gv}
                     ${obtenerBandera(p.visitante)} ${p.visitante}`

            };

        }

    }

    const lista =
        Object.entries(equipos);

    const masGoles =
        [...lista]
        .sort((a,b)=>
            b[1].gf-a[1].gf
        )[0];

    const menosGoles =
        [...lista]
        .sort((a,b)=>
            a[1].gc-b[1].gc
        )[0];

    const masVictorias =
        [...lista]
        .sort((a,b)=>
            b[1].pg-a[1].pg
        )[0];

    const masDerrotas =
        [...lista]
        .sort((a,b)=>
            b[1].pp-a[1].pp
        )[0];

    contenedor.innerHTML = `

<h2 class="grupo-titulo">
🏆 Récords del Mundial
</h2>

<table class="tabla-grupo">

<tbody>

<tr>

<td>⚽ Equipo más goleador</td>

<td>
${obtenerBandera(masGoles[0])}
${masGoles[0]}
</td>

<td>${masGoles[1].gf}</td>

</tr>

<tr>

<td>🛡️ Equipo menos goleado</td>

<td>
${obtenerBandera(menosGoles[0])}
${menosGoles[0]}
</td>

<td>${menosGoles[1].gc}</td>

</tr>

<tr>

<td>🏆 Más victorias</td>

<td>
${obtenerBandera(masVictorias[0])}
${masVictorias[0]}
</td>

<td>${masVictorias[1].pg}</td>

</tr>

<tr>

<td>📉 Más derrotas</td>

<td>
${obtenerBandera(masDerrotas[0])}
${masDerrotas[0]}
</td>

<td>${masDerrotas[1].pp}</td>

</tr>

<tr>

<td>🤝 Empates</td>

<td colspan="2">
${empates}
</td>

</tr>

<tr>

<td>🔥 Mayor goleada</td>

<td colspan="2">
${mayorGoleada.texto}
</td>

</tr>

<tr>

<td>⚽ Partido con más goles</td>

<td colspan="2">
${partidoMasGoles.texto}
</td>

</tr>

<tr>

<td>🥅 Total de goles</td>

<td colspan="2">
${goles}
</td>

</tr>

<tr>

<td>🎮 Partidos jugados</td>

<td colspan="2">
${jugados}
</td>

</tr>

<tr>

<td>📈 Promedio de gol</td>

<td colspan="2">
${(goles/jugados).toFixed(2)}
</td>

</tr>

</tbody>

</table>

`;

}
