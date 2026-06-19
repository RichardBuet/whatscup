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

<div class="goleador-row">

    <div class="goleador-pos">

        ${medalla}

    </div>

    <div class="goleador-player">

        ${g.jugador}

        <span>

            ${g.equipo}

        </span>

    </div>

    <div class="goleador-goals">

        ${g.goles}

    </div>

</div>

`;

    });

}

cargarGoleadores();
