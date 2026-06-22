async function cargarClasificados() {

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

    const terceros = [];

    Object.keys(grupos)
        .forEach(grupo => {

            if (
                grupos[grupo].length >= 3
            ) {

                terceros.push({
                    ...grupos[grupo][2]
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

    let html = "";

    html += `
        <div class="sidebar-card">
            <h3>
                🟩 Clasificados
            </h3>
    `;

    Object.keys(grupos)
        .sort()
        .forEach(grupo => {

            html += `
                <p>
                    ${obtenerBandera(
                        grupos[grupo][0].equipo
                    )}
                    ${grupos[grupo][0].equipo}
                </p>

                <p>
                    ${obtenerBandera(
                        grupos[grupo][1].equipo
                    )}
                    ${grupos[grupo][1].equipo}
                </p>
            `;

        });

    html += `
        </div>
    `;

    html += `
        <div class="sidebar-card">
            <h3>
                🟨 Mejores terceros
            </h3>
    `;

    mejoresTerceros.forEach(
        equipo => {

            html += `
                <p>
                    ${equipo}
                </p>
            `;

        }
    );

    html += `
        </div>
    `;

    document
        .getElementById(
            "clasificadosSidebar"
        )
        .innerHTML = html;

}

cargarClasificados();
