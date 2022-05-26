let updateGenreForm = document.getElementById('editLocation');

updateGenreForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectCity = document.getElementById("selectLocationCity");
    let updatedCity = document.getElementById("edit-city-name");
    let selectedCityID = document.getElementById('selectLocationCity').options[selectCity.selectedIndex].value;

    let selectState = document.getElementById("selectLocationState");
    let updatedState = document.getElementById("edit-state-name");
    let selectedStateID = document.getElementById('selectLocationState').options[selectState.selectedIndex].value;


    let selectCountry = document.getElementById("selectLocationCountry");
    let updatedCountry = document.getElementById("edit-country-name");
    let selectedCountryID = document.getElementById('selectLocationCountry').options[selectCountry.selectedIndex].value;

    
    let selectedCityValue = selectCity.value;
    let updatedCityName = updatedCity.value;
    let selectedStateValue = selectState.value;
    let updatedStateName = updatedState.value;
    let selectedCountryValue = selectCountry.value;
    let updatedCountryName = updatedCountry.value;

    
    let data = {
        selectedCityVal: selectedCityValue,
        selectedStateVal: selectedStateValue,
        selectedCountryVal: selectedCountryValue,
        location_id: selectedCityID,

        city: updatedCityName,
        state: updatedStateName,
        country: updatedCountryName,

    }
  
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/locations/${data.location_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedCityValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, location_id){
    let parsedData = JSON.parse(data);
    let updatedCity = document.getElementById("edit-city-name");
    let updatedCityName = updatedCity.value;
    
    console.log(parsedData);
    // let table = document.getElementById("genre-table");

    // for (let i = 0, row; row = table.rows[i]; i++) {
    //    if (table.rows[i].getAttribute("data-value") == genre_id) {

    //         let updateRowIndex = table.getElementsByTagName("tr")[i];

    //         let td = updateRowIndex.getElementsByTagName("td")[1];

    //         td.innerHTML = updatedGenreName; 
            
    //    }
    // }

    location.reload();
    return false;
}
