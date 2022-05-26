function showEdit(platformId, companyId){
    document.getElementById("editPlatform").style.display = "block";
    document.getElementById("company-select").value = companyId;
}
function showDelete(){
    document.getElementById("deletePlatform").style.display = "block";
}
function addNew(){
    document.getElementById("addplatform").style.display = "block";
}

document.getElementById("canceladdplatformBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addplatform").style.display = "none";
})

document.getElementById("cancelBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("deletePlatform").style.display = "none";
})