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

            const fechaPartido =
                new Date(match.fecha);

            const hoy =
                new Date();

            let estado = "";

            if (
                match.golesLocal !== null &&
                match.golesVisitante !== null
            ) {

                estado =
                    "✅ Finalizado";

            } else if (
                fechaPartido > hoy
            ) {

                estado =
                    "📅 Próximo";

            } else {

                estado =
                    "🔴 En juego";

            }

            const fechaTexto =
                fechaPartido.toLocaleDateString(
                    "es-AR",
                    {
                        day:"2-digit",
                        month:"2-digit",
                        year:"numeric"
                    }
                );

            fixture.innerHTML += `

                <div class="partido">

                    <div class="fecha">

                        ${estado}

                        <br>

                        ${fechaTexto}

                    </div>

                    <div class="resultado">

                        <span>
                            ${match.local}
                        </span>

                        <strong>

                            ${
                                match.golesLocal ?? "-"
                            }

                            -

                            ${
                                match.golesVisitante ?? "-"
                            }

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
