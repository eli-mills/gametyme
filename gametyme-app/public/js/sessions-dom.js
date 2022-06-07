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

function generateDateTime(element){
    /* 
    Code for converting date to proper format sourced from John Au-Yeung
    at https://thewebdev.info/2022/01/11/how-to-set-datetime-on-a-datetime-local-input-with-javascript/.
    */ 
   now = new Date();
   let dateVal = new Date( now.getTime() - now.getTimezoneOffset()*60000).toISOString();
   dateVal = dateVal.slice(0, -5);
   element.value = dateVal;
}

const sessionEnd = document.getElementById("input-finish-session");
setInterval(()=>{generateDateTime(sessionEnd)}, 1000);

const sessionStart = document.getElementById("input-session-start");  
setInterval(()=>{generateDateTime(sessionStart)}, 1000);


// Reference: https://stackoverflow.com/questions/43940850/how-to-iterate-through-table-tr-and-get-the-value-for-first-td-javascript
const sessionTable = document.getElementById('session-table');
var endCol = sessionTable.querySelectorAll('tr > td:nth-child(4)');
var endBtns = sessionTable.querySelectorAll('tr > td:nth-child(8)');


for (var i = 0; i < endCol.length; i++) {
    var endTime = endCol[i];
    if(endTime.innerHTML !== ""){
        endBtns[i].style.pointerEvents = 'none';
        endBtns[i].style.opacity = '0.1';
    }else{
        endBtns[i].style.pointerEvents = 'initial';
        endBtns[i].style.opacity = '1';
    }
}