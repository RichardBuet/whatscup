let rondaActual =
    "Eliminatoria de 32";

function cambiarRonda(
    ronda
){

    rondaActual =
        ronda;

    cargarPlayoff();

}

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

    const responsePos =
        await fetch(
            `data/posiciones.json?v=${version}`
        );

    const grupos =
        await responsePos.json();

    let html = `

        <div class="section-title">
            🏆 Playoff
        </div>

    `;

    playoff.forEach(partido => {

        html += `

            <div class="partido">

                <div class="resultado">

                    <span>
                        ${resolverEquipo(
                            partido.local,
                            grupos
                        )}
                    </span>

                    <strong>
                        VS
                    </strong>

                    <span>
                        ${resolverEquipo(
                            partido.visitante,
                            grupos
                        )}
                    </span>
            </div>
        
            <div class="partido-info">
        
                📅 ${partido.fecha} ${partido.hora ? "🕒 " + partido.hora : ""} 🏟 ${partido.estadio}
        
            </div>
        
        </div>
        
        `;

    });

    document
        .getElementById(
            "contenidoPosiciones"
        )
        .innerHTML = html;

}

function resolverMejorTercero(
    codigo,
    grupos
){

    const gruposPermitidos =
        codigo.substring(1).split("");

    const terceros = [];

    gruposPermitidos.forEach(grupo=>{

        if(
            grupos[grupo] &&
            grupos[grupo][2]
        ){

            terceros.push({

                grupo,

                ...grupos[grupo][2]

            });

        }

    });

    terceros.sort((a,b)=>{

        const dgA =
            a.gf-a.gc;

        const dgB =
            b.gf-b.gc;

        if(
            b.pts!==a.pts
        ){

            return b.pts-a.pts;

        }

        if(
            dgB!==dgA
        ){

            return dgB-dgA;

        }

        return b.gf-a.gf;

    });

    if(
        terceros.length===0
    ){

        return "🟨 "+codigo;

    }

    return `
        ${obtenerBandera(
            terceros[0].equipo
        )}
        ${terceros[0].equipo}
    `;

}

function resolverEquipo(
    codigo,
    grupos
){

    if(!codigo){

        return "A definir";

    }

    if(
    codigo.startsWith("3")
    ){
    
        return resolverMejorTercero(
            codigo,
            grupos
        );
    
    }

    if(
        codigo.startsWith("W")
    ){

        return `🏆 Ganador ${codigo.substring(1)}`;

    }

    if(
        codigo.startsWith("L")
    ){

        return `🥉 Perdedor ${codigo.substring(1)}`;

    }

    if(typeof codigo !== "string"){
    
        return "A definir";
    
    }
    
    const grupo =
        codigo.charAt(0);

    const posicion =
        parseInt(
            codigo.charAt(1)
        );

    if(
        !grupos[grupo]
    ){

        return codigo;

    }

const equipo =
    grupos[grupo][
        posicion-1
    ];

if(!equipo){

    return codigo;

}

return `
        ${obtenerBandera(
            equipo.equipo
        )}
        ${equipo.equipo}
    `;

}
