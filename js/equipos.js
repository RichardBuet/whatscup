async function cargarEquipos() {

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

    const lista =
        document.getElementById(
            "listaEquipos"
        );

    let html =
        '<div class="grupos-grid">';

    Object.keys(grupos).forEach(grupo => {

        html += `

            <div class="grupo-card">

                <h2>
                    Grupo ${grupo}
                </h2>

        `;

        grupos[grupo].forEach(equipo => {

            html += `

                <a
                    href="equipo.html?equipo=${encodeURIComponent(equipo)}"  
                    class="equipo-link"
                >
                    
                    ${obtenerBandera(equipo)}
                    ${equipo}

                </a>

            `;

        });

        html += `
            </div>
        `;

    });

    html += `
        </div>
    `;

    lista.innerHTML = html;

}

cargarEquipos();
