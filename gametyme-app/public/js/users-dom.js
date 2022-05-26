function showEdit(){
    document.getElementById("editUser").style.display = "block";
}
function showDelete(){
    document.getElementById("deleteUser").style.display = "block";
}
function addNew(){
    document.getElementById("addUser").style.display = "block";
}


document.getElementById("canceladduserBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addUser").style.display = "none";
})

document.getElementById("cancelBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("deleteUser").style.display = "none";
})