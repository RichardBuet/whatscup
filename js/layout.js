async function cargarRightbar() {

    const response =
        await fetch(
            "rightbar.html"
        );

    const html =
        await response.text();

    document
        .getElementById(
            "rightbarContainer"
        )
        .innerHTML = html;

}

cargarRightbar();
