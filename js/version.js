async function verificarVersion() {

    try {

        const response =
            await fetch(
                `version.json?t=${Date.now()}`
            );

        const data =
            await response.json();

        const actual =
            localStorage.getItem(
                "appVersion"
            );

        if (
            actual &&
            actual !== data.version
        ) {

            localStorage.setItem(
                "appVersion",
                data.version
            );

            location.reload();

            return;

        }

        localStorage.setItem(
            "appVersion",
            data.version
        );

        const versionDiv =
            document.getElementById(
                "versionApp"
            );

        if (versionDiv) {

            versionDiv.textContent =
                `WhatsCup v${data.version}`;

        }

    }
    catch(error) {

        console.error(
            "Error verificando versión",
            error
        );

    }

}

verificarVersion();
