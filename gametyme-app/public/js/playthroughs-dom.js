function showEdit(selectedPlaythrough){
    document.getElementById("editPlaythrough").style.display = "block";
    document.getElementById("selectGame").value = selectedPlaythrough;
    document.getElementById("selectStart").value = selectedPlaythrough;
    document.getElementById("selectFinish").value = selectedPlaythrough;


    let game = document.getElementById("selectGame");
    let gameInput = document.getElementById('selectGame').options[game.selectedIndex].text;
    document.getElementById("edit-playthrough-game").value = gameInput;

    let start_timestamp = document.getElementById("selectStart");
    let startInput = document.getElementById('selectStart').options[start_timestamp.selectedIndex].text;
    document.getElementById("edit-start-time").value = startInput;

}
function showDelete(){
    document.getElementById("deletePlaythrough").style.display = "block";
}

function addNew(){
    document.getElementById("addPlaythrough").style.display = "block";
}

function showFinish(){
    document.getElementById("finishPlaythrough").style.display= "block";
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