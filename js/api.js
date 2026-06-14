async function getWorldCupMatches() {

    try {

        const response = await fetch(
            `${API_BASE}/competitions/WC/matches`,
            {
                headers: {
                    "X-Auth-Token": API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch(error) {

        console.error("Error API:", error);

        return {
            matches:[]
        };
    }

}
