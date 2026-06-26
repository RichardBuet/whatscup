const parametros =
    new URLSearchParams(
        location.search
    );

const id =
    parseInt(
        parametros.get("id")
    );

console.log(id);
