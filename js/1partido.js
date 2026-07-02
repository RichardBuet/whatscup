const parametros =
    new URLSearchParams(
        location.search
    );

const id =
    parseInt(
        parametros.get("id")
    );

async function cargarPartido(){

    const version =
        Math.floor(
            Date.now()/900000
        );

    const response =
        await fetch(
            `data/playoff.json?v=${version}`
        );

    const playoff =
        await response.json();

    const partido =
        playoff.find(
            p => p.id === id
        );
document
    .getElementById(
        "detallePartido"
    )
    .innerHTML = `

<h1>

    Partido ${partido.id}

</h1>

<h2>

    ${partido.ronda}

</h2>

<p>

    📅 ${partido.fecha}

</p>

<p>

    🏟 ${partido.estadio}

</p>

<p>

    ${partido.local}

    VS

    ${partido.visitante}

</p>

`;
    console.log(partido);

}

cargarPartido();
