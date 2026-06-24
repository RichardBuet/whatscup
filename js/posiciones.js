async function mostrarGrupos() {

    const version =
        Math.floor(
            Date.now() / 900000
        );

    const response =
        await fetch(
            `data/posiciones.json?v=${version}`
        );

    const grupos =
        await response.json();

    const contenedor =
        document.getElementById(
            "tablaPosiciones"
        );

let html = "";

const terceros = [];

Object.keys(grupos)
    .forEach(grupo => {

        if (
            grupos[grupo].length >= 3
        ) {

            terceros.push({
                ...grupos[grupo][2],
                grupo
            });

        }

    });

terceros.sort((a,b) => {

    const dgA =
        a.gf - a.gc;

    const dgB =
        b.gf - b.gc;

    if (b.pts !== a.pts)
        return b.pts - a.pts;

    if (dgB !== dgA)
        return dgB - dgA;

    return b.gf - a.gf;

});

const mejoresTerceros =
    terceros
    .slice(0,8)
    .map(t => t.equipo);

Object.keys(grupos)
    .sort()
    .forEach(grupo => {

        html += `

            <h2 class="grupo-titulo">
                Grupo ${grupo}
            </h2>

            <div class="leyenda-clasificacion">

                <span>
                    🟩 Clasifica
                </span>

                <span>
                    🟨 Mejor tercero
                </span>

            </div>

            <table class="tabla-grupo">

                <thead>

                    <tr>

                        <th>#</th>
                        <th>Equipo</th>
                        <th>PJ</th>
                        <th class="col-px">PG</th>
                        <th class="col-px">PE</th>
                        <th class="col-px">PP</th>
                        <th class="col-px">GF</th>
                        <th class="col-px">GC</th>
                        <th>PTS</th>

                    </tr>

                </thead>

                <tbody>

        `;

        grupos[grupo].forEach(
            (equipo,index) => {

                let clase = "";

                if (index < 2) {

                    clase =
                        "clasificado";

                }
                else if (

                    mejoresTerceros.includes(
                        equipo.equipo
                    )

                ) {

                    clase =
                        "tercero";

                }

                html += `

                    <tr
                        class="
                            fila-equipo
                            ${clase}
                        "
                        onclick="
                            location.href=
                            'equipo.html?equipo=' +
                            encodeURIComponent(
                                '${equipo.equipo}'
                            )
                        "
                    >

                        <td>${index+1}</td>

                        <td class="equipo-nombre">

                            ${obtenerBandera(
                                equipo.equipo
                            )}

                            ${equipo.equipo}

                        </td>

                        <td>${equipo.pj}</td>

                        <td class="col-px">
                            ${equipo.pg}
                        </td>

                        <td class="col-px">
                            ${equipo.pe}
                        </td>

                        <td class="col-px">
                            ${equipo.pp}
                        </td>

                        <td class="col-px">
                            ${equipo.gf}
                        </td>

                        <td class="col-px">
                            ${equipo.gc}
                        </td>

                        <td>
                            ${equipo.pts}
                        </td>

                    </tr>

                `;

            }
        );

        html += `

                </tbody>

            </table>

        `;

    });

    contenedor.innerHTML = html;

}

async function mostrarPlayoff() {

    const version =
        Math.floor(
            Date.now() / 900000
        );

    const response =
        await fetch(
            `data/posiciones.json?v=${version}`
        );

    const grupos =
        await response.json();

    const cruces = [

        ["A", "B"],
        ["C", "D"],
        ["E", "F"],
        ["G", "H"],
        ["I", "J"],
        ["K", "L"]

    ];

    let html = `

        <div class="section-title">
            🏆 Playoff
        </div>

    `;

    cruces.forEach(([g1,g2]) => {

        const primero1 =
            grupos[g1][0];

        const segundo1 =
            grupos[g1][1];

        const primero2 =
            grupos[g2][0];

        const segundo2 =
            grupos[g2][1];

        html += `

            <div class="partido">

                <div class="resultado">

                    <span>
                        ${obtenerBandera(
                            primero1.equipo
                        )}
                        ${primero1.equipo}
                    </span>

                    <strong>
                        VS
                    </strong>

                    <span>
                        ${obtenerBandera(
                            segundo2.equipo
                        )}
                        ${segundo2.equipo}
                    </span>

                </div>

            </div>

            <div class="partido">

                <div class="resultado">

                    <span>
                        ${obtenerBandera(
                            primero2.equipo
                        )}
                        ${primero2.equipo}
                    </span>

                    <strong>
                        VS
                    </strong>

                    <span>
                        ${obtenerBandera(
                            segundo1.equipo
                        )}
                        ${segundo1.equipo}
                    </span>

                </div>

            </div>

        `;

    });

    document
        .getElementById(
            "contenidoPosiciones"
        )
        .innerHTML = html;

}

document
.getElementById("btnGrupos")
.addEventListener(
    "click",
    () => {

        document
        .getElementById(
            "contenidoPosiciones"
        )
        .innerHTML =
            '<div id="tablaPosiciones"></div>';

        mostrarGrupos();

    }
);

document
.getElementById("btnPlayoff")
.addEventListener(
    "click",
    mostrarPlayoff
);

mostrarGrupos();
