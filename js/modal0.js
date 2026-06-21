document
.getElementById("btnVerMas")
?.addEventListener(
    "click",
    () => {

        document
        .getElementById(
            "modalMundial"
        )
        .classList
        .add("show");

    }
);

document
.getElementById("cerrarModal")
?.addEventListener(
    "click",
    () => {

        document
        .getElementById(
            "modalMundial"
        )
        .classList
        .remove("show");

    }
);
