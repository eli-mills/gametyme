function showEdit(selectedPlaythrough){
    document.getElementById("editPlaythrough").style.display = "block";
    document.getElementById("selectGame").value = selectedPlaythrough;
    document.getElementById("selectStart").value = selectedPlaythrough;
    document.getElementById("selectFinish").value = selectedPlaythrough;
    document.getElementById("selectPlaythroughUsername").value = selectedPlaythrough;
    document.getElementById("edit-user").value = selectedPlaythrough;
    document.getElementById("edit-playthrough-game").value = selectedPlaythrough;
  
    // Pre-fill select menus
    selectValue(document.getElementById("selectPlaythroughUsername"), document.getElementById("edit-user"));
    selectValue(document.getElementById("selectGame"), document.getElementById("edit-playthrough-game"));

    // Pre-fill timestamps
    let start_timestamp = document.getElementById("selectStart");
    let startInput = document.getElementById('selectStart').options[start_timestamp.selectedIndex].text;
    document.getElementById("edit-start-time").value = startInput;

    let finish_timestamp = document.getElementById("selectFinish");
    let finishInput = document.getElementById('selectFinish').options[finish_timestamp.selectedIndex].text;
    document.getElementById("edit-finish-time").value = finishInput;

}

/**
 * Used to pre-fill select menus containing the correct ID
 * @param {HTMLSelectElement} hiddenElement The select element that contains the current Playthrough ID and is not shown.
 * @param {HTMLSelectElement} shownElement The select element that contains the ID for the displayed entity.
 */
function selectValue (hiddenElement, shownElement) {
    const textToMatch = hiddenElement.options[hiddenElement.selectedIndex].text;
    for (option of shownElement.options) {
        if (option.text === textToMatch) {
            option.selected = true;
            break
        }
    }
}

function showDelete(){
    document.getElementById("deletePlaythrough").style.display = "block";
}

function addNew(){
    document.getElementById("addPlaythrough").style.display = "block";
}

function showFinish(playthroughId){
    document.getElementById("finishPlaythrough").style.display= "block";
    document.getElementById("finishPlaythroughId").value = playthroughId;

}

document.getElementById("canceladdplaythroughBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addPlaythrough").style.display = "none";
})

document.getElementById("cancelBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("deletePlaythrough").style.display = "none";
})

document.getElementById("canceleditBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("editPlaythrough").style.display = "none";
})
document.getElementById("cancelfinishBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("finishPlaythrough").style.display = "none";
})


// Get current timestamp for Start TimeStamp
const startTime = document.getElementById("input-start-time");
function getStartTime() {
    var dateVal = new Date().toLocaleString();
    startTime.value = dateVal;
    
}
  
setInterval(getStartTime, 1000);

// Get finish timestamp for Finish Timestamp
const finishTime = document.getElementById("input-finish-time");
function getfinishTime() {
    var dateVal = new Date().toLocaleString();
    finishTime.value = dateVal;
  }
  
setInterval(getfinishTime, 1000);