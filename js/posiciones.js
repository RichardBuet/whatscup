async function cargarPosiciones() {

    const response = await fetch("data/posiciones.json");

    const equipos = await response.json();

    const tabla = document.getElementById("tablaPosiciones");

    tabla.innerHTML = `
        <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>PTS</th>
        </tr>
    `;

    equipos.forEach(equipo => {

        tabla.innerHTML += `
            <tr>
                <td>${equipo.pos}</td>
                <td>${equipo.pais}</td>
                <td>${equipo.pj}</td>
                <td>${equipo.pg}</td>
                <td>${equipo.pe}</td>
                <td>${equipo.pp}</td>
                <td>${equipo.pts}</td>
            </tr>
        `;

    });

}

cargarPosiciones();
