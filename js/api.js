export async function getPartidos() {
    const res = await fetch('data/partidos.json');
    return await res.json();
}

export async function getTorneos() {
    const res = await fetch('data/torneos.json');
    return await res.json();
}

export async function getGoleadores() {
    const res = await fetch('data/goleadores.json');
    return await res.json();
}
