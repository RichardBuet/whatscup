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
.getElementById("btnAsistencias")
.addEventListener("click", () => {

    activarTab("btnAsistencias");

});

document
.getElementById("btnTarjetas")
.addEventListener("click", () => {

    activarTab("btnTarjetas");

});

document
.getElementById("btnVallas")
.addEventListener("click", () => {

    activarTab("btnVallas");

});

document
.getElementById("btnRecords")
.addEventListener("click", () => {

    activarTab("btnRecords");

});

cargarEquipos();
