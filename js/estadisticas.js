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
    cargarGoleadores();

});

function activarTab(id){

    document
    .querySelectorAll(".tabs-posiciones button")
    .forEach(b=>b.classList.remove("tab-activa"));

    document
    .getElementById(id)
    .classList.add("tab-activa");

}

cargarEquipos();
