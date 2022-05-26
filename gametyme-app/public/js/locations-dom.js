function showEdit(selectedLocation){
    document.getElementById("editLocation").style.display = "block";
    document.getElementById("selectLocationState").value = selectedLocation;
    document.getElementById("selectLocationCity").value = selectedLocation;
    document.getElementById("selectLocationCountry").value = selectedLocation;
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