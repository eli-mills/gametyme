let updateSessionsForm = document.getElementById('editSession');

updateSessionsForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectStartSession = document.getElementById("selectSessionStart");
    let updatedSessionStart = document.getElementById("edit-session-start");
    let selectedSessionID = document.getElementById('selectSessionStart').options[selectStartSession.selectedIndex].value;

   
    let selectEndSession = document.getElementById("selectSessionEnd");
    let updatedSessionEnd = document.getElementById("edit-session-end");


    let selectedSessionStart = selectStartSession.value;
    let updatedStart = updatedSessionStart.value;

    let selectedSessionEnd = selectEndSession.value;
    let updatedEnd = updatedSessionEnd.value;

  
    
    let data = {
        selectedStartTime: selectedSessionStart,
        selectedEndTime: selectedSessionEnd,
        
        session_id: selectedSessionID,

        session_start: updatedStart,
        session_end: updatedEnd,
        

    }
  
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/sessions/${data.session_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedSessionStart, selectedSessionEnd)
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, session_id){
    let parsedData = JSON.parse(data);
   
    
    location.reload();
    return false;
}
