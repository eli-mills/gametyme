function showEditSession(sessionId){
    document.getElementById("editSession").style.display = "block";
    
    const selectSessionStart = document.getElementById("selectSessionStart");
    const datetimeSessionStart = document.getElementById("edit-session-start");
    const selectSessionEnd = document.getElementById("selectSessionEnd");
    const datetimeSessionEnd = document.getElementById("edit-session-end");

    selectSessionStart.value = sessionId;
    datetimeSessionStart.value = selectSessionStart.options[selectSessionStart.selectedIndex].text;

    selectSessionEnd.value = sessionId;
    datetimeSessionEnd.value = selectSessionEnd.options[selectSessionEnd.selectedIndex].text;

}
function showDeleteSessionSession(){
    document.getElementById("deleteSession").style.display = "block";
}
function addSession(playthrough_id){
    document.getElementById("addSession").style.display = "block";
    document.getElementById("selectPlaythroughID").value = playthrough_id;

    let playthrough_id_session = document.getElementById("selectPlaythroughID");
    let pidInput = document.getElementById('selectPlaythroughID').options[playthrough_id_session.selectedIndex].text;
    document.getElementById("input-playthrough-id").value = pidInput;
}

function endSession(sessionId){
    document.getElementById("endSession").style.display="block";
    document.getElementById("endSessionId").value = sessionId;
}

document.getElementById("canceladdsessionBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addSession").style.display = "none";
})

document.getElementById("cancelfinishsessionBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("endSession").style.display = "none";
})

document.getElementById("cancelEditSession").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("editSession").style.display = "none";
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
    /* 
        Code for converting date to proper format sourced from John Au-Yeung
        at https://thewebdev.info/2022/01/11/how-to-set-datetime-on-a-datetime-local-input-with-javascript/.
    */ 
        now = new Date();
        let dateVal = new Date( now.getTime() - now.getTimezoneOffset()*60000).toISOString();
        dateVal = dateVal.slice(0, -5);
        sessionEnd.value = dateVal;
}
setInterval(getSessionEnd, 1000);