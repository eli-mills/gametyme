let updatePlatformForm = document.getElementById('editPlatform');

updatePlatformForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    
    const editPlatformName = document.getElementById('edit-platform-name').value;
    const editCompanyId = document.getElementById('edit-company-id').value;  
    const editPlatformId = document.getElementById('edit-platform-id').value;

    const body = { platform_name: editPlatformName, company_id: editCompanyId }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/platforms/${editPlatformId}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
            return false;

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(body));

});
