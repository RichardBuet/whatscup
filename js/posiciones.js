async function cargarPosiciones() {

    const response =
        await fetch("data/partidos.json");

    const partidos =
        await response.json();

    const equipos = {};

    partidos.forEach(partido => {

        if (!equipos[partido.local]) {

            equipos[partido.local] = {
                nombre: partido.local,
                pj:0,
                pg:0,
                pe:0,
                pp:0,
                gf:0,
                gc:0,
                pts:0
            };

        }

        if (!equipos[partido.visitante]) {

            equipos[partido.visitante] = {
                nombre: partido.visitante,
                pj:0,
                pg:0,
                pe:0,
                pp:0,
                gf:0,
                gc:0,
                pts:0
            };

        }

        const local =
            equipos[partido.local];

        const visitante =
            equipos[partido.visitante];

        local.pj++;
        visitante.pj++;

        local.gf += partido.golesLocal;
        local.gc += partido.golesVisitante;

        visitante.gf += partido.golesVisitante;
        visitante.gc += partido.golesLocal;

        if (
            partido.golesLocal >
            partido.golesVisitante
        ) {

            local.pg++;
            local.pts += 3;

            visitante.pp++;

        }

        else if (
            partido.golesLocal <
            partido.golesVisitante
        ) {

            visitante.pg++;
            visitante.pts += 3;

            local.pp++;

        }

        else {

            local.pe++;
            visitante.pe++;

            local.pts++;
            visitante.pts++;

        }

    });

    const tabla =
        Object.values(equipos);

    tabla.sort((a,b)=>
        b.pts - a.pts ||
        (b.gf-b.gc) - (a.gf-a.gc)
    );

    const html =
        document.getElementById(
            "tablaPosiciones"
        );

    html.innerHTML = `
        <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>DG</th>
            <th>PTS</th>
        </tr>
    `;

    tabla.forEach((equipo,index)=>{

        html.innerHTML += `
            <tr>

                <td>${index+1}</td>

                <td>
                    ${equipo.nombre}
                </td>

                <td>${equipo.pj}</td>
                <td>${equipo.pg}</td>
                <td>${equipo.pe}</td>
                <td>${equipo.pp}</td>

                <td>${equipo.gf}</td>
                <td>${equipo.gc}</td>

                <td>
                    ${equipo.gf-equipo.gc}
                </td>

                <td>
                    ${equipo.pts}
                </td>

            </tr>
        `;
    });

}

cargarPosiciones();
