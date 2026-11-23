const countrySelect = document.getElementById("country");
const searchButton = document.getElementById("searchButton");
const countryInfo = document.getElementById("countryInfo");

async function getCountry() {
    const country = countrySelect.value;

    countryInfo.textContent = "Loading...";

    try {
        const response = await fetch(
            "https://api.worldbank.org/v2/country/" + country + "?format=json"
        );

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        const info = data[1][0];

        countryInfo.innerHTML = `
            <h2>${info.name}</h2>
            <img src="https://flagcdn.com/w320/${info.iso2Code.toLowerCase()}.png" alt="Country flag">
            <p>Capital: ${info.capitalCity}</p>
            <p>Region: ${info.region.value}</p>
            <p>Income Level: ${info.incomeLevel.value}</p>
            <p>Longitude: ${info.longitude}</p>
            <p>Latitude: ${info.latitude}</p>
        `;

    } catch (error) {
        countryInfo.textContent = "Error: " + error.message;
    }
}

searchButton.addEventListener("click", getCountry);