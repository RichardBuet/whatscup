async function cargarEquipos() {

    const response =
        await fetch(
            "data/grupos.json"
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
                    href="equipo.html?equipo=${encodeURIComponent(equipo.equipo)}"
                    class="equipo-link"
                >
                    
                    // ${bandera(equipo.equipo)}
                    ${equipo.equipo}

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
