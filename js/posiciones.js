async function cargarPosiciones() {

    const response =
        await fetch("data/posiciones.json");

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

                    <tr>

                        <td>${index+1}</td>

                        <td>${equipo.equipo}</td>

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
