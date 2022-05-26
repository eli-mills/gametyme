function showEdit(selectedUser){
    document.getElementById("editUser").style.display = "block";
    document.getElementById("selectFname").value = selectedUser;
    document.getElementById("selectLname").value = selectedUser;
    document.getElementById("selectUsername").value = selectedUser;
    document.getElementById("selectEmail").value = selectedUser;

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