async function cargarEquipos() {

    const response =
        await fetch("data/posiciones.json");

    const grupos =
        await response.json();

    const lista =
        document.getElementById(
            "listaEquipos"
        );

    lista.innerHTML = "";

    Object.keys(grupos).forEach(grupo => {

        lista.innerHTML += `
            <h2 class="grupo-titulo">
                Grupo ${grupo}
            </h2>
        `;

        grupos[grupo].forEach(equipo => {

            lista.innerHTML += `

             <a
    href="equipo.html?equipo=${encodeURIComponent(equipo.equipo)}"
    class="equipo-card"
>

    <div class="equipo-nombre">
        ${banderas[equipo.equipo] || "🏳️"}
        ${equipo.equipo}
    </div>

    <div class="equipo-datos">

        PJ ${equipo.pj}
        ·
        PTS ${equipo.pts}
        ·
        DG ${equipo.gf - equipo.gc}

    </div>

</a>
            `;

        });

    });

}

cargarEquipos();
