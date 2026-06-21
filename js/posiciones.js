async function cargarPosiciones() {

    const version =
        Math.floor(
            Date.now() / 900000
        );
    
    const response =
        await fetch(
            `data/partidos.json?v=${version}`
        );

    const grupos =
        await response.json();

    const contenedor =
        document.getElementById(
            "tablaPosiciones"
        );

    let html = "";

    for (const grupo in grupos) {

        html += `

            <h2 class="grupo-titulo">
                Grupo ${grupo}
            </h2>

            <table class="tabla-grupo">

                <thead>

                    <tr>

                        <th>#</th>
                        <th>Equipo</th>
                        <th>PJ</th>
                        <th class="col-px" >PG</th>
                        <th class="col-px" >PE</th>
                        <th class="col-px" >PP</th>
                        <th class="col-px" >GF</th>
                        <th class="col-px" >GC</th>
                        <th>PTS</th>

                    </tr>

                </thead>

                <tbody>

        `;

        grupos[grupo].forEach(
            (equipo,index) => {

                html += `

                    <tr
                        class="fila-equipo"
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
                        <td class="col-px" >${equipo.pg}</td>
                        <td class="col-px" >${equipo.pe}</td>
                        <td class="col-px" >${equipo.pp}</td>

                        <td class="col-px" >${equipo.gf}</td>
                        <td class="col-px" >${equipo.gc}</td>

                        <td>${equipo.pts}</td>

                    </tr>

                `;

            }
        );

        html += `

                </tbody>

            </table>

        `;
    }

    contenedor.innerHTML = html;

}

cargarPosiciones();
