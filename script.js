const selectByRegion = document.querySelector(".selectRegionOptions");
const countriesContainer = document.querySelector(".countries-container");
const searchBarInput = document.querySelector(".searchBar input");
let allCountries = []; // store all countries
const mode = document.querySelector(".mode");

// Dark mode toggle
mode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  mode.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fa-solid fa-sun"></i> &nbsp; Light Mode'
    : '<i class="fa-solid fa-moon"></i> &nbsp; Dark Mode';
});

// Shimmer loading function
function showShimmer(count = 12) {
  countriesContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const shimmerCard = document.createElement('div');
    shimmerCard.classList.add('country-card', 'shimmer');
    countriesContainer.append(shimmerCard);
  }
}

// Fetch all countries
showShimmer(); // show shimmer while loading
fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region")
  .then(res => res.json())
  .then((data) => {
    allCountries = data;
    renderCountries(data);
  })
  .catch(err => console.error("Error fetching countries:", err));

// Region filter (filter locally instead of fetching)
selectByRegion.addEventListener("change", () => {
  const region = selectByRegion.value;
  const filtered = region === "" ? allCountries : allCountries.filter(c => c.region === region);
  renderCountries(filtered);
});

// Search bar input
searchBarInput.addEventListener("input", (e) => {
  if (!allCountries || allCountries.length === 0) return;

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

// Render countries
function renderCountries(data) {
  countriesContainer.innerHTML = "";

  if (!data || data.length === 0) {
    countriesContainer.innerHTML = `<p style="text-align:center; font-size:1.2rem;">No countries found</p>`;
    return;
  }

  data.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `./country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
      </div>
    `;
    countriesContainer.append(countryCard);
  });
}

function showShimmer(count = 12) {
  countriesContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const shimmerCard = document.createElement('div');
    shimmerCard.classList.add('country-card', 'shimmer');
    countriesContainer.append(shimmerCard);
  }
}

// Call it before fetching
showShimmer();
