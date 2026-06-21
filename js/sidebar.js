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

    document.getElementById(
        "estadisticasSidebar"
    ).innerHTML = `

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

        </div>

        <div class="sidebar-card">

            <h3>
                🔥 Récord
            </h3>

            <p>
                ${stats.mayorGoleada}
            </p>

        </div>

        <div class="sidebar-card">

            <h3>
                📊 Promedio
            </h3>

            <p>
                ${stats.promedioGol}
                goles/partido
            </p>

        </div>

    `;

}

cargarSidebar();
