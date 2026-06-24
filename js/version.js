fetch(
    "version.json?v=" +
    Date.now()
)
.then(
    response =>
        response.json()
)
.then(
    data => {

        const div =
            document.getElementById(
                "versionApp"
            );

        if (!div)
            return;

        div.innerHTML =
            `WhatsCup ${data.version}`;

    }
);
