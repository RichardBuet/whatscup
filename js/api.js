async function getWorldCupMatches() {

    const response = await fetch(
        "https://api.football-data.org/v4/competitions/WC/matches",
        {
            headers: {
                "X-Auth-Token": API_KEY
            }
        }
    );

    const data = await response.json();

    return data;
}


// export async function getPartidos() {
//     const res = await fetch('data/partidos.json');
//     return await res.json();
// }

// export async function getTorneos() {
//     const res = await fetch('data/torneos.json');
//     return await res.json();
// }

// export async function getGoleadores() {
//     const res = await fetch('data/goleadores.json');
//     return await res.json();
// }
