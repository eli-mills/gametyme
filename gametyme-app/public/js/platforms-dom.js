function showEdit(platformId, platformName, companyId){
    console.log('edit clicked');
    document.getElementById("editPlatform").style.display = "block";
    document.getElementById("edit-company-id").value = companyId;
    document.getElementById("edit-platform-id").value = platformId;
    document.getElementById("edit-platform-name").value = platformName;
}

function hideEdit() {
    document.getElementById("editPlatform").style.display = "none";
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