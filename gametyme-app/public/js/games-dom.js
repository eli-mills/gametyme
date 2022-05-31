function showEdit(selectedGame){
    document.getElementById("editGame").style.display = "block";
    document.getElementById("selectgameName").value = selectedGame;
    document.getElementById("selectgameSummary").value = selectedGame;
    document.getElementById("selectgameDate").value = selectedGame;
    document.getElementById("selectCompanyName").value = selectedGame;
    document.getElementById("selectGenreName").value = selectedGame;
    document.getElementById("selectplatName").value = selectedGame;
   
    let gameName = document.getElementById("selectgameName");
    let gameTitle = gameName.options[gameName.selectedIndex].text;
    document.getElementById("edit-game-name").value = gameTitle;

    let gameSummary = document.getElementById("selectgameSummary");
    let summary = gameSummary.options[gameSummary.selectedIndex].text;
    document.getElementById("edit-game-summary").value = summary;

    let gameDate = document.getElementById("selectgameDate");
    let dateval= gameDate.options[gameDate.selectedIndex].text;
    document.getElementById("edit-release-date").value = dateval;

    let gameCompany = document.getElementById("selectCompanyName");
    let company = gameCompany.options[gameCompany.selectedIndex].text;
    document.getElementById("edit-game-company").value = company;

    let gameGenre = document.getElementById("selectGenreName");
    let genre = gameGenre.options[gameGenre.selectedIndex].text;
    document.getElementById("edit-genre-name").value = genre;

   
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