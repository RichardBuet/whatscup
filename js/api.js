async function getWorldCupMatches() {

    const response = await fetch(
        `${API_BASE}/competitions/WC/matches`,
        {
            headers:{
                "X-Auth-Token":API_KEY
            }
        }
    );

    const data = await response.json();

    console.log("API OK");
    console.log(data);

    return data;
}


