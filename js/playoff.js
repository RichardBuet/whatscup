let rondaActual = "";

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

function obtenerRondaActual(playoff){

    const rondas = [
        "1/16",
        "Octavos",
        "Cuartos",
        "Semifinal",
        "Final"
    ];

    for(const ronda of rondas){

        const pendientes =
            playoff.some(partido => {

                const pendiente =
                    partido.estado
                        ? partido.estado !== "FINISHED"
                        : (
                            partido.golesLocal == null ||
                            partido.golesVisitante == null
                        );

                return (
                    partido.ronda === ronda &&
                    pendiente
                );

            });

        if(pendientes){

            return ronda;

        }

    }

    return "Final";

}

async function cargarPlayoff(ronda = "1/16") {
document
    .getElementById("btnGrupos")
    .classList.remove("tab-activa");

document
    .getElementById("btnPlayoff")
    .classList.add("tab-activa");

    
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
        if(!rondaActual){        
            rondaActual =
                obtenerRondaActual(playoff);
        }
    
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
    class="btn-ronda"
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

const mitad =
    Math.ceil(
        partidosMostrar.length / 2
    );

/* ---------- LLAVE 1 ---------- */
if(
    rondaActual !== "Final" &&
    rondaActual !== "Tercer Puesto"
){

    html += `
        <div class="separador-llave">
            << LLAVE 1 >>
        </div>
    `;

}

partidosMostrar.forEach((partido, index) => {
/* ---------- LLAVE 2 ---------- */
if(
    rondaActual !== "Final" &&
    rondaActual !== "Tercer Puesto" &&
    index === mitad
){

    html += `
        <div class="separador-llave">
            << LLAVE 2 >>
        </div>
    `;

}

    const indiceLlave =
        index < mitad
            ? index
            : index - mitad;

    const claseGrupo =
        (indiceLlave % 2 === 1)
            ? "grupo-fin"
            : "";

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
            class="partido ${claseGrupo}"
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

    
document.querySelectorAll(".btn-ronda")
.forEach(b=>b.classList.remove("activo"));

const mapaBotones = {

    "1/16":"btn16",

    "Octavos":"btnOctavos",

    "Cuartos":"btnCuartos",

    "Semifinal":"btnSemis",

    "Tercer Puesto":"btnTercero",

    "Final":"btnFinal"

};

const botonActivo =
    document.getElementById(
        mapaBotones[rondaActual]
    );

if(botonActivo){

    botonActivo.classList.add("activo");

}
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
    /^L\d{2}$/.test(codigo)
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


