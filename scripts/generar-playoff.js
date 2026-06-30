import { resolverEquipo } from "./utils.js";

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

const grupos = JSON.parse(
    fs.readFileSync(
        "./data/posiciones.json",
        "utf8"
    )
);

for (const partidoPlayoff of playoff) {

    // Sólo buscamos partidos que ya tienen equipos definidos
    const local =
    resolverEquipo(
        partidoPlayoff.local,
        grupos
    );

const visitante =
    resolverEquipo(
        partidoPlayoff.visitante,
        grupos
    );

if (!local || !visitante) {

    continue;

}

        const local =
    resolverEquipo(
        partidoPlayoff.local,
        grupos
    );

const visitante =
    resolverEquipo(
        partidoPlayoff.visitante,
        grupos
    );

const partidoReal =
    partidos.find(
        p =>
            (
                p.local === local &&
                p.visitante === visitante
            ) ||
            (
                p.local === visitante &&
                p.visitante === local
            )
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

        partidoPlayoff.local =
    local;

partidoPlayoff.visitante =
    visitante;

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
