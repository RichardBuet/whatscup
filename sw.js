const CACHE_NAME = "whatscup-v1";

const urls = [

    "./",
    "./index.html",

    "./fixture.html",
    "./posiciones.html",
    "./equipos.html",
    "./goleadores.html",

    "./css/main.css",
    "./css/layout.css",

    "./js/home.js",
    "./js/fixture.js",

    "./data/partidos.json",
    "./data/posiciones.json",
    "./data/goleadores.json"

];

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
            .then(cache =>
                cache.addAll(urls)
            )

        );

    }
);

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
            .then(response =>

                response ||

                fetch(event.request)

            )

        );

    }
);
