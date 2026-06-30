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

    const local = resolverEquipo(
        partidoPlayoff.local,
        grupos
    );

    const visitante = resolverEquipo(
        partidoPlayoff.visitante,
        grupos
    );

    if (!local || !visitante) {
        continue;
    }

    const partidoReal = partidos.find(
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

    partidoPlayoff.local = local;
    partidoPlayoff.visitante = visitante;

    partidoPlayoff.fecha = partidoReal.fecha;
    partidoPlayoff.hora = partidoReal.hora;
    partidoPlayoff.estadio = partidoReal.estadio;
    partidoPlayoff.estado = partidoReal.estado;
    partidoPlayoff.golesLocal = partidoReal.golesLocal;
    partidoPlayoff.golesVisitante = partidoReal.golesVisitante;
    if (
    partidoReal.estado === "FINISHED"
) {

    partidoPlayoff.ganador =
        partidoReal.golesLocal >
        partidoReal.golesVisitante
            ? local
            : visitante;

}
}


for (const partido of playoff) {

    if (!partido.ganador) {

        continue;

    }

    const siguiente = playoff.find(
        p => p.id === partido.siguiente
    );

    if (!siguiente) {

        continue;

    }

    if (
        siguiente.local.startsWith("G")
    ) {

        siguiente.local =
            partido.ganador;

    }

    if (
        siguiente.visitante.startsWith("G")
    ) {

        siguiente.visitante =
            partido.ganador;

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

console.log("Playoff actualizado correctamente.");
