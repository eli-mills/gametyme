let updateUsersForm = document.getElementById('editUser');

updateSessionsForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectFname = document.getElementById("selectFname");
    let updatedFname = document.getElementById("edit-fname");
    let selectedUserID = document.getElementById('selectFname').options[selectFname.selectedIndex].value;

   
    let selectLname = document.getElementById("selectLname");
    let updatedLname = document.getElementById("edit-lname");

    let selectUsername = document.getElementById("selectUsername");
    let updatedUsername = document.getElementById("edit-username");

    let selectEmail = document.getElementById("selectEmail");
    let updatedEmail = document.getElementById("edit-email");
  


    
    let selectedFnameVal = selectFname.value;
    let updatedFirstName = updatedFname.value;

    let selectedLnameVal = selectLname.value;
    let updatedLastName = updatedLname.value;

    let selectedUsernameVal = selectUsername.value;
    let updatedUname = updatedUsername.value;

    let selectedEmailVal = selectEmail.value;
    let updatedemail = updatedEmail.value;

    
    let data = {
        selectedUFVal: selectedFnameVal,
        selectedULVal: selectedLnameVal,
        selectedUNVal: selectedUsernameVal,
        selectedUEVal: selectedEmailVal,
        
        user_id: selectedUserID,

        first_name: updatedFirstName,
        last_name: updatedLastName,
        username: updatedUname,
        email: updatedemail,

    }
  
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/users/${data.user_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedFnameVal, selectedLnameVal, selectedUsernameVal, selectedEmailVal);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, user_id){
    let parsedData = JSON.parse(data);
    let updatedFname = document.getElementById("edit-fname");
    let updatedFirstName = updatedFname.value;
   
    

    location.reload();
    return false;
}
