const fs = require("fs");

const API_KEY =
process.env.FOOTBALL_DATA_KEY;

async function importar() {

    const response =
    await fetch(
        "https://api.football-data.org/v4/competitions/WC/matches",
        {
            headers:{
                "X-Auth-Token":API_KEY
            }
        }
    );

    const data =
    await response.json();

    const partidos =
    data.matches.map(match => ({

        id:match.id,

        grupo:
        match.group
        ?.replace("GROUP_","")
        || "",

        fecha:
        match.utcDate
        .split("T")[0],

        hora:
        match.utcDate
        .split("T")[1]
        .substring(0,5),

        local:
        match.homeTeam.name,

        visitante:
        match.awayTeam.name,

        golesLocal:
        match.score.fullTime.home ?? 0,

        golesVisitante:
        match.score.fullTime.away ?? 0,

        estado:
        match.status

    }));

    fs.writeFileSync(
        "./data/partidos.json",
        JSON.stringify(
            partidos,
            null,
            2
        )
    );

    console.log(
        `${partidos.length} partidos guardados`
    );

}

importar();
