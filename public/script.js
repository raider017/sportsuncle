async function loadStandings() {
  const loading = document.getElementById("loading");
  const tableBody = document.querySelector("#standings tbody");

  try {
    const res = await fetch("/api/standings");
    const data = await res.json();

    loading.style.display = "none";
    tableBody.innerHTML = "";

    if (!data.length) {
      tableBody.innerHTML = `<tr><td colspan="8">No data available</td></tr>`;
      return;
    }

    data.sort((a, b) => b.winPercent - a.winPercent); // sort by win %
    data.forEach(team => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${team.logo}" alt="${team.team}" width="40"/></td>
        <td>${team.team}</td>
        <td>${team.wins}</td>
        <td>${team.losses}</td>
        <td>${team.ties}</td>
        <td>${(team.winPercent * 100).toFixed(1)}%</td>
        <td>${team.pointsFor}</td>
        <td>${team.pointsAgainst}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    loading.innerText = "Error loading standings.";
    console.error("Error fetching standings:", err);
  }
}

loadStandings();
