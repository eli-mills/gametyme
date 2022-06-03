function editSession(){
    document.getElementById("editSession").style.display = "block";
}
function delSession(){
    document.getElementById("deleteSession").style.display = "block";
}
function addSession(playthrough_id){
    document.getElementById("addSession").style.display = "block";
    document.getElementById("selectPlaythroughID").value = playthrough_id;

    let playthrough_id_session = document.getElementById("selectPlaythroughID");
    let pidInput = document.getElementById('selectPlaythroughID').options[playthrough_id_session.selectedIndex].text;
    document.getElementById("input-playthrough-id").value = pidInput;
}

function endSession(){
    document.getElementById("endSession").style.display="block";
}

document.getElementById("canceladdsessionBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addSession").style.display = "none";
})

document.getElementById("cancelfinishsessionBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("endSession").style.display = "none";
})

// Get current timestamp for Start TimeStamp
const sessionStart = document.getElementById("input-session-start");
function getSessionStart() {
    var dateVal = new Date().toLocaleString();
    sessionStart.value = dateVal;
    
  }
  
setInterval(getSessionStart, 1000);

const sessionEnd = document.getElementById("input-finish-session");
function getSessionEnd(){
    var dateVal = new Date().toLocaleString();
    sessionEnd.value = dateVal;
}
setInterval(getSessionEnd, 1000);