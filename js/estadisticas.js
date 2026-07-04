//--------------------------------------------------
// WhatsCup
// Estadísticas
//--------------------------------------------------
//
// Activos:
// ✔ Equipos
// ✔ Goleadores
// ✔ Récords
//
// Pendientes:
// □ Asistencias
// □ Tarjetas
// □ Vallas invictas
//--------------------------------------------------

function activarTab(id){

    document
        .querySelectorAll(".tabs-posiciones button")
        .forEach(b => b.classList.remove("tab-activa"));

    document
        .getElementById(id)
        .classList.add("tab-activa");

}

document
.getElementById("btnEquipos")
.addEventListener("click", () => {

    activarTab("btnEquipos");
    cargarEquipos();

});

document
.getElementById("btnGoleadores")
.addEventListener("click", () => {

    activarTab("btnGoleadores");
    if (typeof cargarGoleadores === "function") {
        cargarGoleadores();
    }

});

document
.getElementById("btnRecords")
.addEventListener("click", () => {

    activarTab("btnRecords");
    cargarRecords();

});

//--------------------------------------
// Parametros no usados
//--------------------------------------

// document
// .getElementById("btnAsistencias")
// .addEventListener("click", () => {
//     activarTab("btnAsistencias");
// });
// document
// .getElementById("btnTarjetas")
// .addEventListener("click", () => {
//     activarTab("btnTarjetas");
// });
// document
// .getElementById("btnVallas")
// .addEventListener("click", () => {
//     activarTab("btnVallas");
// });


//--------------------------------------
// Pantalla inicial
//--------------------------------------

setTimeout(() => {
    activarTab("btnEquipos");
    if (typeof cargarEquipos === "function") {
        cargarEquipos();
    }
}, 100);

// document
// .getElementById("btnPlayoff")
// .addEventListener(
//     "click",
//     () => {

//         document
//             .getElementById("btnPlayoff")
//             .classList.add("tab-activa");

//         document
//             .getElementById("btnGrupos")
//             .classList.remove("tab-activa");

// setTimeout(() => {
// mostrarEquipos();

// }, 0);

//     }
// );
