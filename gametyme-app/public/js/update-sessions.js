let updateSessionsForm = document.getElementById('editSession');

updateSessionsForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectStartSession = document.getElementById("selectSessionStart");
    let updatedSessionStart = document.getElementById("edit-session-start");
    let selectedSessionID = document.getElementById('selectSessionStart').options[selectStartSession.selectedIndex].value;

   
    let selectEndSession = document.getElementById("selectSessionEnd");
    let updatedSessionEnd = document.getElementById("edit-session-end");


  
    let updatedStart = updatedSessionStart.value;

    let updatedEnd = updatedSessionEnd.value;

  
    
    let data = {

        session_id: selectedSessionID,

        session_start: updatedStart,
        session_end: updatedEnd,
        

    }
  
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/sessions/${data.session_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            location.reload();
            return false;
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})



// End Session Listener

document.getElementById("endSession").addEventListener("submit", (e) => {
    e.preventDefault();

    const session_id = document.getElementById("endSessionId").value;
    const session_end = document.getElementById("input-finish-session").value;

    const fetchInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_end })
    }

    fetch(`/sessions/${session_id}`, fetchInit)
    .then( response => {
        console.log('fetch sent', response);
        location.reload();
        return false;
    })
    .catch( error => {
        console.log('there was an error', error);
    });
})
