async function cargarPartidos() {

    const fixture = document.getElementById("fixture");

    fixture.innerHTML = "Cargando...";

    const response =
    await fetch("data/partidos.json");

const partidos =
    await response.json();

    console.log(data);

    fixture.innerHTML = "";

    data.matches.slice(0,5).forEach(match => {

        fixture.innerHTML += `
            <div class="partido">
                <div class="fecha">
                    ${match.utcDate}
                </div>

                <div class="resultado">

                    <span>${match.homeTeam.name}</span>

                    <strong>
                        ${match.score.fullTime.home ?? "-"}
                        -
                        ${match.score.fullTime.away ?? "-"}
                    </strong>

                    <span>${match.awayTeam.name}</span>

                </div>
            </div>
        `;

    });

}

cargarPartidos();
