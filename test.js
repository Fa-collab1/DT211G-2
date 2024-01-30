// En asynkron funktion som hämtar data från en webbtjänst
async function fetchData() {
    try {
        const response = await fetch('https://dahlgren.miun.se/ramschema_ht23.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Användning av den asynkrona funktionen
async function processData() {
    try {
        const result = await fetchData(); // Väntar på att data ska hämtas
        console.table(result);
    } catch (error) {
        // Hantera fel om det uppstår vid hämtning eller bearbetning av data
    }
}

processData();