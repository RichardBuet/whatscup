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
                        <th>PG</th>
                        <th>PE</th>
                        <th>PP</th>
                        <th>GF</th>
                        <th>GC</th>
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
                        <td>${equipo.pg}</td>
                        <td>${equipo.pe}</td>
                        <td>${equipo.pp}</td>

                        <td>${equipo.gf}</td>
                        <td>${equipo.gc}</td>

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
