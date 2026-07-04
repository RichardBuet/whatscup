async function cargarFixture() {

    const fixture = document.getElementById("fixtureCompleto");

    const response =
        await fetch("data/partidos.json");

    const partidos =
        await response.json();

    fixture.innerHTML = "";

    partidos.forEach(partido => {

        fixture.innerHTML += `

        <div class="partido">

            <div class="fecha">

                ${partido.fecha}
                •
                ${partido.hora}

            </div>

            <div class="resultado">

                <span>

                    ${partido.local}

                </span>

                <strong>

                    ${partido.golesLocal}
                    -
                    ${partido.golesVisitante}

                </strong>

                <span>

                    ${partido.visitante}

                </span>

            </div>

        </div>

        `;

    });

}

cargarFixture();
