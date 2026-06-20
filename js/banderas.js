const banderas = {

    "Argentina":"ar",
    "Algeria":"dz",
    "Austria":"at",
    "Jordan":"jo",

    "Australia":"au",
    "Paraguay":"py",
    "Turkey":"tr",
    "United States":"us",

    "Belgium":"be",
    "Egypt":"eg",
    "Iran":"ir",
    "New Zealand":"nz",

    "Bosnia and Herzegovina":"ba",
    "Canada":"ca",
    "Qatar":"qa",
    "Switzerland":"ch",

    "Brazil":"br",
    "Morocco":"ma",
    "Scotland":"gb-sct",
    "Haiti":"ht",

    "Germany":"de",
    "Curacao":"cw",
    "Ivory Coast":"ci",
    "Ecuador":"ec",

    "Netherlands":"nl",
    "Japan":"jp",
    "Sweden":"se",
    "Tunisia":"tn",

    "Spain":"es",
    "Cape Verde":"cv",
    "Saudi Arabia":"sa",
    "Uruguay":"uy",

    "France":"fr",
    "Senegal":"sn",
    "Iraq":"iq",
    "Norway":"no",

    "Portugal":"pt",
    "DR Congo":"cd",
    "Uzbekistan":"uz",
    "Colombia":"co",

    "England":"gb-eng",
    "Croatia":"hr",
    "Ghana":"gh",
    "Panama":"pa",

    "Mexico":"mx",
    "South Korea":"kr",
    "South Africa":"za",
    "Czechia":"cz"

};

/* 👇 PEGAR AQUÍ */

function obtenerBandera(nombre){

    const codigo =
        banderas[nombre];

    if(!codigo)
        return "";

    return `
        <img
            src="https://flagcdn.com/w40/${codigo}.png"
            class="flag"
            alt="${nombre}"
        >
    `;

}
