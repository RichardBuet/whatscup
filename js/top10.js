async function cargarTop10() {

    const version =
        Math.floor(Date.now()/900000);

    const response =
        await fetch(
            `data/goleadores.json?v=${version}`
        );

    const goleadores =
        await response.json();

    const contenedor =
        document.getElementById("contenidoPosiciones");

    let html = `

<h2 class="grupo-titulo">

⚽ Goleadores

</h2>

<table class="tabla-grupo">

<tbody>

`;

    goleadores
        .slice(0,20)
        .forEach((g,index)=>{

        html += `

<tr>

<td style="width:45px">

${index+1}

</td>

<td style="text-align:left">

${obtenerBandera(g.equipo)}
${g.jugador}

<br>

<small style="color: darkgray;">

${g.equipo}

</small>

</td>

<td
style="
font-weight:bold;
text-align:center;
width:60px;
">

${g.goles}

</td>

</tr>

`;

    });

    html += `

</tbody>

</table>

`;

    contenedor.innerHTML = html;

}
