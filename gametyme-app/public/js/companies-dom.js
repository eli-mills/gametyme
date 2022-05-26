function showEdit(){
    document.getElementById("editCompany").style.display = "block";
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