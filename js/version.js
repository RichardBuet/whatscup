document.addEventListener(
    "DOMContentLoaded",
    () => {

        const div =
            document.getElementById(
                "versionApp"
            );

        if (div) {

            div.innerHTML =
                "🔥 VERSION FUNCIONANDO 🔥";

            div.style.position =
                "fixed";

            div.style.top =
                "10px";

            div.style.right =
                "10px";

            div.style.background =
                "red";

            div.style.color =
                "white";

            div.style.padding =
                "10px";

            div.style.zIndex =
                "99999";

        }

    }
);
