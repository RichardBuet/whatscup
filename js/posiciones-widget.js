async function cargarPosicionesWidget() {

    const response =
        await fetch("./data/posiciones.json");

    const posiciones =
        await response.json();

    const top4 =
        posiciones.slice(0,4);

    document.getElementById(
        "tablaPosiciones"
    ).innerHTML =
        top4.map((equipo,index) => `

            <div class="fila-posicion">

                <span>
                    ${index + 1}
                </span>

                <span>
                    ${equipo.equipo}
                </span>

                <strong>
                    ${equipo.pts}
                </strong>

            </div>

        `).join("");

}

cargarPosicionesWidget();
