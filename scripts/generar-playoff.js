import fs from "fs";

const partidos = JSON.parse(
    fs.readFileSync(
        "./data/partidos.json",
        "utf8"
    )
);

const playoff = JSON.parse(
    fs.readFileSync(
        "./data/playoff.json",
        "utf8"
    )
);

for (const partidoPlayoff of playoff) {

    // Sólo buscamos partidos que ya tienen equipos definidos
    if (
        partidoPlayoff.local.length > 2 ||
        partidoPlayoff.visitante.length > 2
    ) {

        const partidoReal =
            partidos.find(p =>

                p.local === partidoPlayoff.local &&

                p.visitante === partidoPlayoff.visitante

            );

        if (!partidoReal) {

            continue;

        }

        partidoPlayoff.fecha =
            partidoReal.fecha;

        partidoPlayoff.hora =
            partidoReal.hora;

        partidoPlayoff.estadio =
            partidoReal.estadio;

        partidoPlayoff.estado =
            partidoReal.estado;

        partidoPlayoff.golesLocal =
            partidoReal.golesLocal;

        partidoPlayoff.golesVisitante =
            partidoReal.golesVisitante;

    }

}

fs.writeFileSync(

    "./data/playoff.json",

    JSON.stringify(
        playoff,
        null,
        2
    )

);

console.log(
    "Playoff actualizado correctamente."
);
