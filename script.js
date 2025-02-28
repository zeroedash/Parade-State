document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("current-date").textContent = new Date().toLocaleDateString();
});

function addRow(tableId) {
    let table = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    row.innerHTML = `
        <td>${rowCount + 1}</td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td>
            <select class="status-dropdown">
                <option value="Present">Present</option>
                <option value="Leave">Leave</option>
                <option value="TY Duty">TY Duty</option>
                <option value="GD In">GD In</option>
                <option value="GD Out">GD Out</option>
                <option value="Duty">Duty</option>
                <option value="Duty Off">Duty Off</option>
                <option value="Misc">Misc</option>
            </select>
        </td>
    `;
}

function updateSummary() {
    let statuses = ["Present", "Leave", "TY Duty", "GD In", "GD Out", "Duty", "Duty Off", "Misc"];
    
    let summarySenior = { "Borne Strength": 0 };
    let summaryJunior = { "Borne Strength": 0 };

    statuses.forEach(status => {
        summarySenior[status] = 0;
        summaryJunior[status] = 0;
    });

    document.querySelectorAll("#senior-table .status-dropdown").forEach(dropdown => {
        let value = dropdown.value;
        summarySenior["Borne Strength"]++;
        summarySenior[value]++;
    });

    document.querySelectorAll("#junior-table .status-dropdown").forEach(dropdown => {
        let value = dropdown.value;
        summaryJunior["Borne Strength"]++;
        summaryJunior[value]++;
    });

    // Update Senior Summary
    document.getElementById("senior-borne").textContent = summarySenior["Borne Strength"];
    statuses.forEach(status => {
        document.getElementById(`senior-${status.toLowerCase().replace(/ /g, "-")}`).textContent = summarySenior[status];
    });

    // Update Junior Summary
    document.getElementById("junior-borne").textContent = summaryJunior["Borne Strength"];
    statuses.forEach(status => {
        document.getElementById(`junior-${status.toLowerCase().replace(/ /g, "-")}`).textContent = summaryJunior[status];
    });
}
// Function to save table data to Local Storage
function saveData() {
    const seniorRows = document.querySelector("#senior-table tbody").innerHTML;
    const juniorRows = document.querySelector("#junior-table tbody").innerHTML;
    localStorage.setItem("seniorData", seniorRows);
    localStorage.setItem("juniorData", juniorRows);
    alert("Data Saved Successfully!");
}

// Function to load saved data on page load
function loadData() {
    if (localStorage.getItem("seniorData")) {
        document.querySelector("#senior-table tbody").innerHTML = localStorage.getItem("seniorData");
    }
    if (localStorage.getItem("juniorData")) {
        document.querySelector("#junior-table tbody").innerHTML = localStorage.getItem("juniorData");
    }
}

// Load data when the page loads
window.onload = function () {
    loadData();
};

// Attach saveData function to Save button
document.getElementById("save-button").addEventListener("click", saveData);
