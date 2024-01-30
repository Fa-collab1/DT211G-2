'use strict';

// Globala variabler för att hålla reda på data.
let result = []; // Global variabel för att lagra resultatet från API-anropet
let originalData = []; // En kopia av originaldatan för osorterat tillstånd

// Globala variabler för att hålla reda på sorteringsläget för varje kolumn.
let sortState = {
    code: 'unsorted',      // Sorteringsstatus för 'code'-kolumnen. (kurskod)
    coursename: 'unsorted' // Sorteringsstatus för 'coursename'-kolumnen. (kursnamn)
};

// Objekt som innehåller tecken för olika sorteringsstatus.
const arrows = {
    unsorted: '\u00A0\u00A0', // Två icke-brytande mellanslag för osorterat läge. (Kurskod hoppar för mycket annars)
    ascending: '↑',          // Pil upp för stigande sortering.
    descending: '↓'          // Pil ned för fallande sortering.
};

// Funktion som uppdaterar tabellrubrikerna med sorteringspilar.
function updateHeaders() {
    // Objekt som mappar kolumnnamn till motsvarande rubrikelements span för pilplats.
    const headers = {
        'code': document.getElementById('header-code').querySelector('span'),
        'coursename': document.getElementById('header-coursename').querySelector('span'),
    };

    // Loopa igenom varje kolumn och uppdatera rubriken med rätt pil.
    for (let column in headers) {
        if (headers[column]) {
            // Sätt textinnehållet i rubriken till motsvarande pil.
            headers[column].textContent = arrows[sortState[column]];
        }
    }
}

// Funktion för att växla mellan olika sorteringsordningar för en kolumn.
function toggleSort(column) {
    // Återställ sorteringsläget för alla andra kolumner.
    for (let key in sortState) {
        if (key !== column) {
            sortState[key] = 'unsorted';
        }
    }

    // Växla sorteringsläget för den aktuella kolumnen.
    if (sortState[column] === 'descending') {
        // Återgå till osorterat läge och använd ursprungsdata.
        result = originalData.slice();
        sortState[column] = 'unsorted';
    } else {
        // Växla mellan stigande och fallande ordning.
        let isAscending = sortState[column] === 'ascending';
        sortData(column, !isAscending);
        sortState[column] = isAscending ? 'descending' : 'ascending';
    }

    // Uppdatera tabellen och rubrikerna.
    updateTable();
    updateHeaders();
}

// Asynkron funktion för att hämta data från webbtjänsten.
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

// Funktion för att bearbeta och visa hämtad data.
async function processData() {
    try {
        result = await fetchData();
        originalData = result.slice(); // Skapa en kopia av ursprungsdatan.
        updateTable();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Funktion för att uppdatera innehållet i tabellen.
function updateTable() {
    let table = document.getElementById("tabelldata");
    let tableContent = '';

    // Skapa tabellrader baserat på data.
    result.forEach((item) => {
        tableContent += `<tr>
            <td>${item.code}</td>
            <td>${item.coursename}</td>
            <td>${item.progression}</td>
        </tr>`;
    });

    // Uppdatera tabellens HTML och rubrikerna.
    table.innerHTML = tableContent;
    updateHeaders();
}

// Funktion för att sortera data.
function sortData(column, isAscending) {
    // Sortera 'result'-arrayen.
    result.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        // Sortera som strängar eller tal beroende på datatyp.
        if (typeof valueA === 'string') {
            return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return isAscending ? valueA - valueB : valueB - valueA;
        }
    });

    // Uppdatera tabellen efter sortering.
    updateTable();
}

// Starta processen för att hämta och visa
processData() 