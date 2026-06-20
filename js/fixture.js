async function cargarPartidos() {

    const fixture =
        document.getElementById(
            "fixture"
        );

    const selectorFechas =
        document.getElementById(
            "selectorFechas"
        );

    const resumen =
        document.getElementById(
            "resumenFixture"
        );

    fixture.innerHTML =
        "Cargando...";

    const response =
        await fetch(
            "data/partidos.json?ver=1"
        );

    const partidos =
        await response.json();

    partidos.sort((a,b) => {

        const fechaA =
            new Date(
                `${a.fecha}T${a.hora || "00:00"}`
            );

        const fechaB =
            new Date(
                `${b.fecha}T${b.hora || "00:00"}`
            );

        return fechaA - fechaB;

    });

    const fechas =
        [...new Set(
            partidos.map(
                p => p.fecha
            )
        )];

    const hoy =
        new Date()
        .toLocaleDateString(
            "en-CA"
        );

    let fechaSeleccionada =
        fechas.includes(hoy)
        ? hoy
        : fechas[0];

    function renderizarFechas() {

        selectorFechas.innerHTML =
            fechas.map(fecha => {

                const fechaObj =
                    new Date(
                        `${fecha}T00:00:00`
                    );
                
                const dias = [
                    "DO",
                    "LU",
                    "MA",
                    "MI",
                    "JU",
                    "VI",
                    "SA"
                ];
                
                const diaSemana =
                    dias[
                        fechaObj.getDay()
                    ];
                
                const diaMes =
                    fechaObj
                    .getDate()
                    .toString()
                    .padStart(2,"0");
                
                const texto =
                    fecha === hoy
                    ? `
                        <div>HOY</div>
                        <small>${diaMes}</small>
                      `
                    : `
                        <div>${diaSemana}</div>
                        <small>${diaMes}</small>
                      `;

                return `

                    <button
                        class="
                            fecha-btn
                            ${
                                fecha === fechaSeleccionada
                                ? "activo"
                                : ""
                            }
                        "
                        data-fecha="${fecha}"
                    >

                        ${texto}

                    </button>

                `;

            })
            .join("");

        document
            .querySelectorAll(
                ".fecha-btn"
            )
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    () => {

                        fechaSeleccionada =
                            btn.dataset.fecha;

                        renderizarFechas();

                        renderizarPartidos();

                    }
                );

            });
    setTimeout(() => {

    const activo =

        document.querySelector(

            ".fecha-btn.activo"

        );

    if (activo) {

        activo.scrollIntoView({

            behavior: "smooth",

            inline: "center",

            block: "nearest"

        });

    }

}, 50);
    }

    function renderizarPartidos() {

        const partidosFecha =
            partidos.filter(
                p =>
                    p.fecha ===
                    fechaSeleccionada
            );

        const enVivo =
            partidos.filter(
                p =>
                    p.estado === "IN_PLAY"
                    ||
                    p.estado === "PAUSED"
            ).length;

        resumen.innerHTML = `

            <div class="resumen-item">
                🟢 ${enVivo} En vivo
            </div>

            <div class="resumen-item">
                ⚽ ${partidosFecha.length} partidos
            </div>

        `;

        fixture.innerHTML = "";

        partidosFecha.forEach(match => {

            let estado = "";

            if (
                match.estado === "FINISHED"
            ) {

                estado = `
                    <span class="estado-finalizado">
                        ⚫ Finalizado
                    </span>
                `;

            }
            else if (
                match.estado === "IN_PLAY"
            ) {

                estado = `
                    <span class="estado-vivo">
                        🟢 En vivo
                    </span>
                `;

            }
            else if (
                match.estado === "PAUSED"
            ) {

                estado = `
                    <span class="estado-vivo">
                        ⏸️ Entretiempo
                    </span>
                `;

            }
            else {

                estado = `
                    <span class="estado-programado">
                        🕖 ${match.hora}
                    </span>
                `;

            }

            fixture.innerHTML += `

                <div class="
                    partido
                    ${
                        match.estado === "IN_PLAY"
                        ||
                        match.estado === "PAUSED"
                        ? "partido-vivo"
                        : ""
                    }
                ">

                    <div class="fecha">

                        ${estado}

                        <br>

                        ${match.fecha}

                    </div>

                    <div class="resultado">

                        <span>
                            ${obtenerBandera(
                                match.local
                            )}
                            ${match.local}
                       </span>

                        <strong>

                            ${
                                match.estado === "TIMED"
                                ? "VS"
                                : `${match.golesLocal} - ${match.golesVisitante}`
                            }

                        </strong>

                        <span>
                            ${obtenerBandera(
                                match.visitante
                            )}
                            ${match.visitante}
                       </span>

                    </div>

                </div>

            `;

        });

    }

    renderizarFechas();

    renderizarPartidos();

}

cargarPartidos();
