function showEdit(selectedLocation){
    document.getElementById("editLocation").style.display = "block";
    document.getElementById("selectLocationState").value = selectedLocation;
    document.getElementById("selectLocationCity").value = selectedLocation;
    document.getElementById("selectLocationCountry").value = selectedLocation;

    let city = document.getElementById("selectLocationCity");
    let cityInput = document.getElementById('selectLocationCity').options[city.selectedIndex].text;
    document.getElementById("edit-city-name").value = cityInput;

    let state = document.getElementById("selectLocationState");
    let stateInput = document.getElementById('selectLocationState').options[state.selectedIndex].text;
    document.getElementById("edit-state-name").value = stateInput;


    let country = document.getElementById("selectLocationCountry");
    let countryInput = document.getElementById('selectLocationCountry').options[country.selectedIndex].text;
    document.getElementById("edit-country-name").value = countryInput;
}
function showDelete(){
    document.getElementById("deleteLocation").style.display = "block";
}
function addNew(){
    document.getElementById("addLocation").style.display = "block";
}


document.getElementById("canceladdLocationBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addLocation").style.display = "none";
})

document.getElementById("cancelBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("deleteGenre").style.display = "none";
})

document.getElementById("canceleditLocationBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("editLocation").style.display = "none";
})