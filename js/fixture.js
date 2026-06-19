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

    const hoy =
        new Date()
            .toISOString()
            .split("T")[0];

    partidos
        .slice(0,20)
        .forEach(match => {

let estado = "";

if (
    match.estado === "FINISHED"
) {

    estado =
        "⚫ Finalizado";

}
else if (
    match.estado === "IN_PLAY"
) {

    estado =
        "🟢 En vivo";

}
else if (
    match.estado === "TIMED"
) {

    estado =
        `🕖 ${match.hora}`;

}
else {

    estado =
        "📅 Programado";

}

            const fechaTexto =
                new Date(match.fecha)
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
        : `${match.golesLocal} - ${match.golesVisitante}`
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
