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

/*
        <tr>
            <td><a href="http://www.ica.se">Kurskod</a></td>
            <td>Kursnamn</td>
            <td>Progression</td>
        </tr>

    ska kunna göras:
    Sortera i stigande och fallande ordning på kurskod, kursnamn och progression.
    Filtrera på kursnamn och kurskod.

*/


processData();