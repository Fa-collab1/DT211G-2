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
        let table = document.getElementById("tabelldata");
        let tableContent = '';

        result.forEach((item, i) => {
            tableContent += `<tr>
                <td>${item.code}</td>
                <td>${item.coursename}</td>
                <td>${item.progression}</td>
            </tr>`;
        });

        table.innerHTML += tableContent;

    } catch (error) {
        console.error('Error:', error);
    }
}
/*
    ska kunna göras:
    Sortera i stigande och fallande ordning på kurskod, kursnamn och progression.
    Filtrera på kursnamn och kurskod.

*/
processData();