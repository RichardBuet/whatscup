import fs from "fs";

const API_KEY =
    process.env.FOOTBALL_DATA_KEY;

async function importarGoleadores() {

    const response =
        await fetch(
            "https://api.football-data.org/v4/competitions/WC/scorers",
            {
                headers: {
                    "X-Auth-Token": API_KEY
                }
            }
        );

    if (!response.ok) {

        throw new Error(
            `Football Data API Error: ${response.status}`
        );

    }

    const data =
        await response.json();

    const goleadores =
        data.scorers.map(j => ({

            jugador:
                j.player?.name || "",

            equipo:
                j.team?.name || "",

            goles:
                j.goals || 0

        }));

    fs.writeFileSync(
        "./data/goleadores.json",
        JSON.stringify(
            goleadores,
            null,
            2
        )
    );

    console.log(
        `${goleadores.length} goleadores guardados`
    );

}

importarGoleadores().catch(error => {

    console.error(error);

    process.exit(1);

});
