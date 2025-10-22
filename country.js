const nameFull=new URLSearchParams(location.search).get('name');
const image=document.querySelector("img");
const naTiveName=document.querySelector(".native-name");
const popullationname=document.querySelector(".popullation");
const region=document.querySelector(".region");
const subRegion=document.querySelector(".subRegion");
const capital=document.querySelector(".capital");
const tld=document.querySelector(".tld");
const currencies=document.querySelector(".currencies");
const languages=document.querySelector(".languages");
const nameOfCountry=document.querySelector(".details-text-container h1");
const borderCountries=document.querySelector(".border-countries");
const mode=document.querySelector(".mode");



fetch(`https://restcountries.com/v3.1/name/${nameFull}?fullText=true`).then((res)=>
    res.json()
).then(([country])=>{
    image.src=country.flags.svg;
    image.alt=country.name.common;
    nameOfCountry.innerText=country.name.common;
    popullationname.innerText=country.population.toLocaleString('en-IN');
    region.innerText=country.region;
    subRegion.innerText=country.subregion;
    if(country.currencies){
        currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(", ");
    }
    if(country.capital){
        capital.innerText=country.capital.join(", ");
    }
    if(country.tld){
        tld.innerText=country.tld.join(", ");
    }
    if(country.languages){
        languages.innerText=Object.values(country.languages).join(", ");
    }
//   console.log()
    if(country.name.nativeName){
        naTiveName.innerText=Object.values(country.name.nativeName)[0].common;
    }
    else{
        naTiveName.innerText=country.name.common;
    }
    
    if(country.borders){
        country.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json()).
            then(([borderCountry])=>{
                const countryTag=document.createElement("a");
                countryTag.innerText=borderCountry.name.common;
                countryTag.href = `country.html?name=${borderCountry.name.common}`
                borderCountries.append(countryTag);
                
            });
        })
    }
})



mode.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
})

const backBtn=document.querySelector(".back-btn");
backBtn.addEventListener("click",()=>{
    window.history.back();
})