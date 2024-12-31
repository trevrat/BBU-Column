// ==UserScript==
// @name         BBU Count
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Add a BBU Count column next to Whip Count in tables on a webpage
// @author       trevrat
// @match        *://*/*
// @grant        none
//@updateURL     https://github.com/trevrat/BBU-Column/raw/refs/heads/main/BBU%20Column.user.js
//@downloadURL   https://github.com/trevrat/BBU-Column/raw/refs/heads/main/BBU%20Column.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to check and update the table
    function updateTable() {
        // Find all tables on the page
        const tables = document.querySelectorAll('table');

        tables.forEach(table => {
            // Find all table headers in the current table
            const headers = table.querySelectorAll('th');
            let whipCountIndex = -1;

            // Look for the "Whip Count" header
            headers.forEach((header, index) => {
                if (header.textContent.trim() === "Whip Count") {
                    whipCountIndex = index;
                }
            });

            // If "Whip Count" header is found and "BBU Count" does not already exist
            if (whipCountIndex !== -1 && ![...headers].some(header => header.textContent.trim() === "BBU Count")) {
                // Add the "BBU Count" header
                const bbuHeader = document.createElement('th');
                bbuHeader.textContent = "BBU Count";
                headers[whipCountIndex].after(bbuHeader);

                // Add "BBU Count" cells for each row
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > whipCountIndex) {
                        const whipCountCell = cells[whipCountIndex];
                        const whipCountValue = parseInt(whipCountCell.textContent.trim(), 10);

                        // Create the BBU Count cell
                        const bbuCell = document.createElement('td');
                        if (!isNaN(whipCountValue)) {
                            bbuCell.textContent = whipCountValue * 3;
                        } else {
                            bbuCell.textContent = "-";
                        }
                        whipCountCell.after(bbuCell);
                    }
                });
            }
        });
    }

    // Run the script every 15 seconds
    setInterval(updateTable, 15000);
})();
