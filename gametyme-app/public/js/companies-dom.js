function showEdit(selectedCompany, selectedLocation){
    document.getElementById("editCompany").style.display = "block";
    document.getElementById("selectCompanyName").value = selectedCompany;
    document.getElementById("selectCompanyLocation").value = selectedCompany;
    document.getElementById("edit-company-location").value = selectedLocation;

    let companyName = document.getElementById("selectCompanyName");
    let companyInput = companyName.options[companyName.selectedIndex].text;
    document.getElementById("edit-company").value = companyInput;

    let companyLocation = document.getElementById("selectCompanyLocation");
    let compLocInput = companyLocation.options[companyLocation.selectedIndex].text;
    document.getElementById("edit-company-location").value = compLocInput;

}
function showDelete(){
    document.getElementById("deleteCompany").style.display = "block";
}
function addNew(){
    document.getElementById("addCompany").style.display = "block";
}

document.getElementById("cancelAddCompanyBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addCompany").style.display = "none";
})

document.getElementById("cancelBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("deleteCompany").style.display = "none";
})

document.getElementById("canceleditcompanyBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("editCompany").style.display = "none";
})