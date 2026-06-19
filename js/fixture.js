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

    fixture.innerHTML = "";

    partidos

        .sort((a,b) => {

            const fechaA =
                new Date(
                    `${a.fecha}T${a.hora || "00:00"}`
                );

            const fechaB =
                new Date(
                    `${b.fecha}T${b.hora || "00:00"}`
                );

            return fechaA - fechaB;

        })

        .slice(0,50)

        .forEach(match => {

            let estado = "";

            if (
                match.estado === "FINISHED"
            ) {

                estado =
                    `
                    <span class="estado-finalizado">
                        ⚫ Finalizado
                    </span>
                    `;

            }
            else if (
                match.estado === "IN_PLAY"
            ) {

                estado =
                    `
                    <span class="estado-vivo">
                        🟢 En vivo
                    </span>
                    `;

            }
            else if (
                match.estado === "TIMED"
            ) {

                estado =
                    `
                    <span class="estado-programado">
                        🕖 ${match.hora}
                    </span>
                    `;

            }
            else {

                estado =
                    `
                    <span class="estado-programado">
                        📅 Programado
                    </span>
                    `;

            }

            const fechaTexto =
                new Date(
                    `${match.fecha}T00:00:00`
                )
                .toLocaleDateString(
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
                                match.estado === "TIMED"
                                    ? "vs"
                                    : `${match.golesLocal ?? 0} - ${match.golesVisitante ?? 0}`
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
