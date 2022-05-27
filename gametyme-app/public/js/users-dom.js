function showEdit(selectedUser){
    document.getElementById("editUser").style.display = "block";
    document.getElementById("selectFname").value = selectedUser;
    document.getElementById("selectLname").value = selectedUser;
    document.getElementById("selectUsername").value = selectedUser;
    document.getElementById("selectEmail").value = selectedUser;

    let fname = document.getElementById("selectFname");
    let fnameInput = fname.options[fname.selectedIndex].text;
    document.getElementById("edit-fname").value = fnameInput;

    let lname = document.getElementById("selectLname");
    let lnameInput = lname.options[lname.selectedIndex].text;
    document.getElementById("edit-lname").value = lnameInput;

    let username = document.getElementById("selectUsername");
    let usernameInput = username.options[username.selectedIndex].text;
    document.getElementById("edit-username").value = usernameInput;

    let email = document.getElementById("selectEmail");
    let emailInput = email.options[email.selectedIndex].text;
    document.getElementById("edit-email").value = emailInput;
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