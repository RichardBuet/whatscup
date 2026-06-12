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

document.getElementById('fixture').innerHTML =
`
<div class="partido">
    <div class="fecha">
        TEST
    </div>

    <div class="resultado">
        <span>Argentina</span>
        <strong>2 - 0</strong>
        <span>Austria</span>
    </div>
</div>
`;
