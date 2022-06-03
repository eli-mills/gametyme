function showEdit(){
    document.getElementById("editPlaythrough").style.display = "block";
}
function showDelete(){
    document.getElementById("deletePlaythrough").style.display = "block";
}
function editSession(){
    document.getElementById("editSession").style.display = "block";
}
function delSession(){
    document.getElementById("deleteSession").style.display = "block";
}
function addNew(){
    document.getElementById("addPlaythrough").style.display = "block";
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

const startTime = document.getElementById("input-start-time");
function getTime() {
    var dateVal = new Date().toLocaleString();
    startTime.value = dateVal;
  }
  
setInterval(getTime, 1000);

