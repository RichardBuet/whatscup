export function resolverEquipo(codigo, grupos) {

    if (!codigo) {

        return null;

    }

    const grupo = codigo.charAt(0);

    const posicion = parseInt(codigo.charAt(1));

    if (!grupos[grupo]) {

        return null;

    }

    return grupos[grupo][posicion - 1]?.equipo ?? null;

}
