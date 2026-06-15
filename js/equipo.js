const params =
    new URLSearchParams(
        window.location.search
    );

const equipo =
    params.get("equipo");

document.getElementById(
    "equipoDetalle"
).innerHTML = `

    <h2>
        ${equipo || "Sin equipo"}
    </h2>

`;
