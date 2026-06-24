async function cargarPlayoff() {

    const version =
        Math.floor(
            Date.now() / 900000
        );

    const response =
        await fetch(
            `data/playoff.json?v=${version}`
        );

    const playoff =
        await response.json();

    console.log(playoff);

}
