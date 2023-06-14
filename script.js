const countriescontainer=document.querySelector(".countries");
const regionFilters=document.querySelectorAll(".region");
const dropDownButton=document.querySelector(".dropDown")
const drop=document.querySelector(".drop")
const searchInput=document.getElementById("search-input");
searchInput.addEventListener("change",async ()=>{
    try{
    const searchaValue=searchInput.value ;
    console.log("search:",searchaValue);

    const response= await fetch(`https://restcountries.com/v3.1/name/${searchaValue}`);
    const data = await response.json();
     const countriesHtml = getCountriesHtml(data);
     countriescontainer.innerHTML=countriesHtml;}
     catch{
        alert("not found")
     }

})
dropDownButton.addEventListener("click",()=>{
    drop.classList.toggle("showDropDown")
})
regionFilters.forEach((region)=> {
    region.addEventListener("click",async ()=>{
        const response= await fetch(`https://restcountries.com/v3.1/region/${region.textContent}`);
           const data = await response.json();
            const countriesHtml = getCountriesHtml(data);
            countriescontainer.innerHTML=countriesHtml;
    })  
    })

const getcountries=async()=>{
    const response=await fetch("https://restcountries.com/v3.1/all") ; // API endpoint
    console.log("response",response) 
    data= await response.json();
    console.log("data",data );
    return data; 
} 
function getCountriesHtml(countries){
    let countriesHtml=""
    countries.map((country)=>{
        const countryHtml=getOneCountriesHtml(country);
        console.log ("html:",countryHtml)
        countriesHtml+=countryHtml;
    })
    return countriesHtml
}

function getOneCountriesHtml(country){
  return `<div><div class="country-img">
<img src=${country?.flags?.png} alt="country" />
</div>
<div class="country-info">
<h5>${country?.name?.common}</h5>
<p><strong>Population:</strong>${country?.population}</p>
<p><strong>region:</strong>${country?.region}</p>
<p><strong>capital:</strong>${country?.capital}</p>
</div></div>`;
}



 async function main (){
    const countries = await getcountries();
    const countriesHtml=getCountriesHtml(countries)
  countriescontainer.innerHTML = countriesHtml
  
}
console.log("region:",regionFilters)
main()