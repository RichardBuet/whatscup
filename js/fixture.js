async function cargarPartidos() {

    const fixture = document.getElementById("fixture");

    const data = await getWorldCupMatches();

    fixture.innerHTML = "";

    data.matches.slice(0,10).forEach(match => {

        fixture.innerHTML += `
        <div class="partido">

            <div class="fecha">
                ${match.utcDate}
            </div>

            <div class="resultado">

                <span>
                    ${match.homeTeam.name}
                </span>

                <strong>
                    ${match.score.fullTime.home ?? "-"}
                    -
                    ${match.score.fullTime.away ?? "-"}
                </strong>

                <span>
                    ${match.awayTeam.name}
                </span>

            </div>

        </div>
        `;

    });

}

cargarPartidos();

// fetch('data/partidos.json')
// .then(response => response.json())
// .then(partidos => {

//     const fixture = document.getElementById('fixture');

//     partidos.forEach(partido => {

//         fixture.innerHTML += `
//             <div class="partido">

//                 <div class="fecha">
//                     ${partido.fecha}
//                 </div>

//                 <div class="resultado">
//                     <span>${partido.local}</span>

//                     <strong>
//                         ${partido.golesLocal}
//                         -
//                         ${partido.golesVisitante}
//                     </strong>

//                     <span>${partido.visitante}</span>
//                 </div>

//             </div>
//         `;
//     });

// });

// document.getElementById('fixture').innerHTML =
// `
// <div class="partido">
//     <div class="fecha">
//         FASE 1
//     </div>

//     <div class="resultado">
//         <span>Mexico</span>
//         <strong>2 - 0</strong>
//         <span>Sudafrica</span>
//     </div>
// </div>
// `;
