let updateCompanyForm = document.getElementById('editCompany');

updateCompanyForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectCompany = document.getElementById("selectCompanyName");
    let updatedCompanyName = document.getElementById("edit-company");
    let selectedCompanyID = document.getElementById('selectCompanyName').options[selectCompany.selectedIndex].value;

    let selectCompanyLocation = document.getElementById("selectCompanyLocation");
    let updatedCompanyLocation = document.getElementById("edit-company-location");


    
    let selectedCompanyValue = selectCompany.value;
    let updatedCompany = updatedCompanyName.value;

    let selectedCompLocationVal = selectCompanyLocation.value;
    let updatedCompLocation = updatedCompanyLocation.value;
    

    
    let data = {
        selectedCityVal: selectedCompanyValue,
        selectedStateVal: selectedCompLocationVal,
        company_id: selectedCompanyID,

        company_name: updatedCompany,
        location_id: updatedCompLocation,

    }
  
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/companies/${data.company_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedCompanyValue, selectedCompLocationVal);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, company_id){
    let parsedData = JSON.parse(data);
    let updatedCompany = document.getElementById("edit-company");
    let updatedCompanyName = updatedCompany.value;
    

    location.reload();
    return false;
}
