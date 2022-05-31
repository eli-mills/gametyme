let updateGameForm = document.getElementById('editGame');

updateGameForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectGameTitle = document.getElementById("selectgameName");
    let updatedGameTitle = document.getElementById("edit-game-name");
    let selectedGameID = document.getElementById('selectgameName').options[selectGameTitle.selectedIndex].value;

    let selectGameSummary = document.getElementById("selectgameSummary");
    let selectGameDate = document.getElementById("selectgameDate");
    let selectGameCompany = document.getElementById("selectCompanyName");
    let selectGenre = document.getElementById("selectGenreName");
    let selectPlatform = document.getElementById("selectplatName");
    
    let updatedSummary = document.getElementById("edit-game-summary");
    let updatedDate = document.getElementById("edit-release-date");
    let updatedCompany = document.getElementById("edit-game-company");
    let updatedGenre = document.getElementById("edit-genre-name");
    let updatedPlat = document.getElementById('selectplatName').options[selectplatName.selectedIndex].value


    
    let selectedGameTitleValue = selectGameTitle.value;
    let updatedTitle = updatedGameTitle.value;

    let selectedSummaryValue = selectGameSummary.value;
    let updatedSummaryVal = updatedSummary.value;

    let selectedDateValue = selectGameDate.value;
    let updatedDateVal = updatedDate.value;

    let selectedCompValue = selectGameCompany.value;
    let updatedCompVal = updatedCompany.value;

    let selectedGenreValue = selectGenre.value;
    let updatedGenreVal = updatedGenre.value;

    let selectedPlatValue = selectPlatform.value;
    let updatedPlatVal = updatedPlat.value;

    
    let data = {
        selectedTitle: selectedGameTitleValue,
        selectedSummary: selectedSummaryValue,
        selectedDate: selectedDateValue,
        selectedCompany: selectedCompValue,
        selectedGenre: selectedGenreValue,
        selectedPlatform: selectedPlatValue,
        
        game_id: selectedGameID,

        game_title: updatedTitle,
        game_summary: updatedSummaryVal,
        release_date: updatedDateVal,
        company_name: updatedCompVal,
        genre_id: updatedGenreVal,
        platform_ids: updatedPlatVal

    }
  
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/companies/${data.game_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedGameTitleValue, selectedSummaryValue, selectedDateValue, selectedCompValue,
                selectedGenreValue, selectedPlatValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, game_id){
    let parsedData = JSON.parse(data);

    

    location.reload();
    return false;
}
