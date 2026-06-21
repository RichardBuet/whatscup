import fs from "fs";

const partidos = JSON.parse(
    fs.readFileSync(
        "./data/partidos.json",
        "utf8"
    )
);

const jugados =
    partidos.filter(
        p => p.estado === "FINISHED"
    );

const goles =
    jugados.reduce(
        (total,p) =>
            total +
            p.golesLocal +
            p.golesVisitante,
        0
    );

const envivo =
    partidos.filter(
        p =>
            p.estado === "IN_PLAY" ||
            p.estado === "PAUSED"
    ).length;

const restantes =
    partidos.filter(
        p =>
            p.estado !== "FINISHED"
    ).length;

let mayorGoleada = "-";
let diferenciaMax = -1;

jugados.forEach(p => {

    const diferencia =
        Math.abs(
            p.golesLocal -
            p.golesVisitante
        );

    if (
        diferencia >
        diferenciaMax
    ) {

        diferenciaMax =
            diferencia;

        mayorGoleada =
            `${p.local} ${p.golesLocal}-${p.golesVisitante} ${p.visitante}`;

    }

});

const estadisticas = {

    goles,

    jugados:
        jugados.length,

    restantes,

    envivo,

    mayorGoleada,

    promedioGol:
        jugados.length
        ?
        (
            goles /
            jugados.length
        ).toFixed(2)
        :
        0

};

fs.writeFileSync(
    "./data/estadisticas.json",
    JSON.stringify(
        estadisticas,
        null,
        2
    )
);

console.log(
    "Estadísticas generadas"
);
