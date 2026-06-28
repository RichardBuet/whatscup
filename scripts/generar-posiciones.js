import fs from "fs";

const partidos = JSON.parse(
    fs.readFileSync(
        "./data/partidos.json",
        "utf8"
    )
);

const grupos = {};

for (const partido of partidos) {

    if (partido.estado !== "FINISHED") {
        continue;
    }

    if (!partido.grupo) {
        continue;
    }

    
    const grupo = partido.grupo;

    if (!grupos[grupo]) {
        grupos[grupo] = {};
    }

    const tabla = grupos[grupo];

    const local = partido.local;
    const visitante = partido.visitante;

    if (!tabla[local]) {

        tabla[local] = {
            equipo: local,
            grupo: grupo,
            pts: 0,
            pj: 0,
            pg: 0,
            pe: 0,
            pp: 0,
            gf: 0,
            gc: 0
        };

    }

    if (!tabla[visitante]) {

        tabla[visitante] = {
            equipo: visitante,
            grupo: grupo,
            pts: 0,
            pj: 0,
            pg: 0,
            pe: 0,
            pp: 0,
            gf: 0,
            gc: 0
        };

    }

    tabla[local].pj++;
    tabla[visitante].pj++;

    tabla[local].gf += partido.golesLocal;
    tabla[local].gc += partido.golesVisitante;

    tabla[visitante].gf += partido.golesVisitante;
    tabla[visitante].gc += partido.golesLocal;

    if (partido.golesLocal > partido.golesVisitante) {

        tabla[local].pg++;
        tabla[local].pts += 3;

        tabla[visitante].pp++;

    }

    else if (
        partido.golesLocal <
        partido.golesVisitante
    ) {

        tabla[visitante].pg++;
        tabla[visitante].pts += 3;

        tabla[local].pp++;

    }

    else {

        tabla[local].pe++;
        tabla[visitante].pe++;

        tabla[local].pts++;
        tabla[visitante].pts++;

    }

}

const posiciones = {};

const gruposOrdenados =
    Object.keys(grupos).sort();

for (const grupo of gruposOrdenados) {

    posiciones[grupo] =
        Object.values(grupos[grupo])
        .sort((a,b) => {

            const dgA =
                a.gf - a.gc;

            const dgB =
                b.gf - b.gc;

            if (b.pts !== a.pts)
                return b.pts - a.pts;

            if (dgB !== dgA)
                return dgB - dgA;

            return b.gf - a.gf;

        });

}

fs.writeFileSync(
    "./data/posiciones.json",
    JSON.stringify(
        posiciones,
        null,
        2
    )
);

console.log(
    `${Object.keys(posiciones).length} grupos procesados`
);
