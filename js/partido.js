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

    console.log(partido);

}

cargarPartido();
