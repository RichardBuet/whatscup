let rondaActual =
    "1/16";

function cambiarRonda(
    ronda,
    boton
){

    rondaActual =
        ronda;

    document
        .querySelectorAll(".btn-ronda")
        .forEach(
            b => b.classList.remove("activo")
        );

    if(boton){

        boton.classList.add("activo");

    }

    cargarPlayoff();

}
async function cargarPlayoff(ronda = "1/16") {

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

<div class="tabs-playoff">

    <button
    id="btn16"
    class="btn-ronda activo"
    onclick="cambiarRonda('1/16',this)">
    1/16
</button>

<button
    id="btnOctavos"
    class="btn-ronda"
    onclick="cambiarRonda('Octavos',this)">
    Octavos
</button>

<button
    id="btnCuartos"
    class="btn-ronda"
    onclick="cambiarRonda('Cuartos',this)">
    Cuartos
</button>

<button
    id="btnSemis"
    class="btn-ronda"
    onclick="cambiarRonda('Semifinal',this)">
    Semis
</button>

<button
    id="btnTercero"
    class="btn-ronda"
    onclick="cambiarRonda('Tercer Puesto',this)">
    3°
</button>

<button
    id="btnFinal"
    class="btn-ronda"
    onclick="cambiarRonda('Final',this)">
    Final
</button>
</div>

<div class="section-title">
    🏆 Playoff
</div>

`;
    

    const partidosMostrar =
    playoff.filter(
        partido =>
            partido.ronda === rondaActual
    );

    partidosMostrar.forEach(partido => {
    
        let estado = "";
    
    if(
        partido.golesLocal != null &&
        partido.golesVisitante != null
    ){
    
        estado = `
            <div class="estado-finalizado">
                FINAL
            </div>
        `;
    
    }else{
    
        estado = `
            <div class="estado-programado">
                ${partido.hora ?? ""}
            </div>
        `;
    
    }
    
        html += `

            <div
                class="partido"
                onclick="
                    location.href=
                    'partido.html?id=' +
                    ${partido.id}
                "
            >

                <div class="resultado">
                    <span
                        class="${
                            partido.ganador &&
                            resolverEquipo(
                                partido.local,
                                grupos,
                                playoff
                            ).includes(partido.ganador)
                    
                            ? "ganador"
                    
                            : ""
                        }"
                    >
                    
                        ${resolverEquipo(
                            partido.local,
                            grupos,
                            playoff
                        )}
                    
                    </span>             
                    <strong>                
                        ${
                            partido.golesLocal != null
                            &&
                            partido.golesVisitante != null                
                            ?                
                            `${partido.golesLocal} - ${partido.golesVisitante}`                
                            :                
                            "VS"                
                        }                
                    </strong>                
                    <span
                        class="${
                            partido.ganador &&
                            resolverEquipo(
                                partido.visitante,
                                grupos,
                                playoff
                            ).includes(partido.ganador)
                    
                            ? "ganador"
                    
                            : ""
                        }"
                    >
                    
                        ${resolverEquipo(
                            partido.visitante,
                            grupos,
                            playoff
                        )}
                    
                    </span>              
                </div>
        
            <div class="partido-info">
        
               <!-- 📅 ${partido.fecha} ${partido.hora ? "🕒 " + partido.hora : ""} 🏟 ${partido.estadio} -->
                ${estado}
                📅 ${partido.fecha}
                🏟 ${partido.estadio}

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
    grupos,
    playoff
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
    
        const id =
            parseInt(
                codigo.substring(1)
            );
    
        const partido =
            playoff.find(
                p => p.id === id
            );
    
        if(
            partido &&
            partido.ganador
        ){
    
            return `
                ${obtenerBandera(
                    partido.ganador
                )}
                ${partido.ganador}
            `;
    
        }
    
        return `🏆 Ganador ${id}`;
    
    }

    if(
    codigo.startsWith("L")
    ){
    
        const id =
            parseInt(
                codigo.substring(1)
            );
    
        const partido =
            playoff.find(
                p => p.id === id
            );
    
        if(
            partido &&
            partido.ganador
        ){
    
            const perdedor =
                partido.local === partido.ganador
                    ? partido.visitante
                    : partido.local;
    
            return `
                ${obtenerBandera(
                    perdedor
                )}
                ${perdedor}
            `;
    
        }
    
        return `🥉 Perdedor ${id}`;
    
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


