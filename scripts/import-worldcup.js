import fs from "fs";

const API_KEY = process.env.FOOTBALL_DATA_KEY;

async function importar() {

    const response = await fetch(
        "https://api.football-data.org/v4/competitions/WC/matches",
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

    const data = await response.json();

    const partidos = data.matches.map(match => {

    const fechaLocal =
        new Date(match.utcDate);

return {

    id: match.id,

    competencia:
        match.competition?.name || "",

    fase:
        match.stage || "",

    grupo:
        match.group?.replace(
            "GROUP_",
            ""
        ) || "",

    jornada:
        match.matchday || 0,

    fecha:
        fechaLocal.toLocaleDateString(
            "en-CA",
            {
                timeZone:
                "America/Argentina/Buenos_Aires"
            }
        ),

    hora:
        fechaLocal.toLocaleTimeString(
            "es-AR",
            {
                timeZone:
                "America/Argentina/Buenos_Aires",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        ),

    utcDate:
        match.utcDate,

    estado:
        match.status,

    estadio:
        match.venue || "",

    local:
        match.homeTeam?.name || "",

    visitante:
        match.awayTeam?.name || "",

    golesLocal:
        match.score?.fullTime?.home ?? null,

    golesVisitante:
        match.score?.fullTime?.away ?? null,

    ganador:
        match.score?.winner || null,

    duracion:
        match.score?.duration || null,

    tiempoCompleto:
        match.score?.fullTime || {},

    entretiempo:
        match.score?.halfTime || {},

    alargue:
        match.score?.extraTime || {},

    penales:
        match.score?.penalties || {},

    ultimaActualizacion:
        match.lastUpdated || null

};

});
    
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

importar().catch(error => {

    console.error(error);

    process.exit(1);

});
