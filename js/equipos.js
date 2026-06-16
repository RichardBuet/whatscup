async function cargarEquipos() {

    const response =
        await fetch(
            "data/posiciones.json"
        );

    const grupos =
        await response.json();

    const lista =
        document.getElementById(
            "listaEquipos"
        );

    lista.innerHTML =
        '<div class="grupos-grid">';

    Object.keys(grupos).forEach(grupo => {

        lista.innerHTML += `

            <div class="grupo-card">

                <h2>
                    Grupo ${grupo}
                </h2>

        `;

        grupos[grupo].forEach(equipo => {

            lista.innerHTML += `

                <a
                    href="equipo.html?equipo=${encodeURIComponent(equipo.equipo)}"
                    class="equipo-link"
                >

                    ${bandera(equipo.equipo)}
                    ${equipo.equipo}

                </a>

            `;

        });

        lista.innerHTML += `
            </div>
        `;

    });

    lista.innerHTML += `
        </div>
    `;

}

cargarEquipos();
