document.addEventListener("DOMContentLoaded", async () => {

    const fixture = document.getElementById("fixture");

    fixture.innerHTML = `
        <div class="partido">
            Cargando partidos...
        </div>
    `;

    const data = await getWorldCupMatches();

    if (!data.matches || data.matches.length === 0) {

        fixture.innerHTML = `
            <div class="partido">
                No se pudieron obtener partidos.
            </div>
        `;

        return;
    }

    fixture.innerHTML = "";

    data.matches.slice(0,10).forEach(match => {

        const homeGoals =
            match.score?.fullTime?.home ?? "-";

        const awayGoals =
            match.score?.fullTime?.away ?? "-";

        fixture.innerHTML += `

        <div class="partido">

            <div class="fecha">

                ${new Date(match.utcDate)
                    .toLocaleDateString("es-AR")}

            </div>

            <div class="resultado">

                <span>
                    ${match.homeTeam.name}
                </span>

                <strong>
                    ${homeGoals}
                    -
                    ${awayGoals}
                </strong>

                <span>
                    ${match.awayTeam.name}
                </span>

            </div>

        </div>

        `;

    });

});
