async function cargarPartidos() {

    const fixture =
        document.getElementById(
            "fixture"
        );

    fixture.innerHTML =
        "Cargando...";

    const response =
        await fetch(
            "data/partidos.json"
        );

    const partidos =
        await response.json();

    console.log(partidos);

    fixture.innerHTML = "";

    partidos
        .slice(0,20)
        .forEach(match => {

            fixture.innerHTML += `

                <div class="partido">

                    <div class="fecha">
                        ${match.fecha}
                    </div>

                    <div class="resultado">

                        <span>
                            ${match.local}
                        </span>

                        <strong>

                            ${match.golesLocal}
                            -
                            ${match.golesVisitante}

                        </strong>

                        <span>
                            ${match.visitante}
                        </span>

                    </div>

                </div>

            `;

        });

}

cargarPartidos();
