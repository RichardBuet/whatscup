async function cargarSidebar() {

    const version =
        Math.floor(
            Date.now() / 900000
        );

    const response =
        await fetch(
            `data/estadisticas.json?v=${version}`
        );

    const stats =
        await response.json();

const contenedor =
    document.getElementById(
        "estadisticasSidebar"
    );

if (!contenedor) return;

contenedor.innerHTML = `

    <div class="sidebar-card">

            <h3>
                🌎 Mundial 2026
            </h3>

            <p>
                ⚽ ${stats.goles} goles
            </p>

            <p>
                🎮 ${stats.jugados} jugados
            </p>

            <p>
                📅 ${stats.restantes} restantes
            </p>

            <p>
                🟢 ${stats.envivo} en vivo
            </p>

            <p>
                ${stats.promedioGol}
                goles/partido
            </p>

        </div>

    `;

}

cargarSidebar();
