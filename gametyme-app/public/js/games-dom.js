function showEdit(gameId, gameTitle, gameSummary, releaseDate, companyName, genreName, platformList){
    
    const platsToFill = platformList.split(', ');

    console.log('platsToFill: ', platsToFill);

    // Pre-fill form values
    document.getElementById("edit-game-id").value = gameId;
    document.getElementById("edit-game-title").value = gameTitle;
    document.getElementById("edit-game-summary").value = gameSummary;
    document.getElementById("edit-release-date").value = releaseDate;
    document.getElementById("edit-game-company").value = companyName;
    document.getElementById("edit-game-genre").value = genreName;
    
    document.getElementById("editGame").style.display = "block";
    

    // Clear previously selected checkboxes
    const checkboxes = document.querySelectorAll('#platform-checkboxes input');
    checkboxes.forEach( box => {
        console.log(box.value);
        box.checked = false;
    });


    // Iterate through multiple platform options and select relevant ones:
    platsToFill.forEach( platform => {
        document.getElementById(`edit ${platform}`).checked = true;
    } );   
}



function showDelete(){
    document.getElementById("deleteGame").style.display = "block";
}
function addGame(){
    document.getElementById("addGame").style.display = "block";
}

document.getElementById("canceladdgameBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addGame").style.display = "none";
})

document.getElementById("deletecancelGame").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("deleteGame").style.display = "none";
})

document.getElementById("canceleditgameBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("editGame").style.display = "none";
})