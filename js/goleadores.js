async function cargarGoleadores() {

    const response =
        await fetch(
            "data/goleadores.json"
        );

    const goleadores =
        await response.json();

    const contenedor =
        document.getElementById(
            "goleadores"
        );

    contenedor.innerHTML = "";

    goleadores.forEach((g,index) => {

        let medalla = "";

        if(index === 0)
            medalla = "🥇";

        else if(index === 1)
            medalla = "🥈";

        else if(index === 2)
            medalla = "🥉";

        else
            medalla = `${index + 1}.`;

        contenedor.innerHTML += `

            <div class="goleador-card">

                <div class="goleador-posicion">

                    ${medalla}

                </div>

                <div class="goleador-info">

                    <div class="goleador-nombre">

                        ${g.jugador}

                    </div>

                    <div class="goleador-equipo">

                        ${g.equipo}

                    </div>

                </div>

                <div class="goleador-goles">

                    ${g.goles} ⚽

                </div>

            </div>

        `;

    });

}

cargarGoleadores();
