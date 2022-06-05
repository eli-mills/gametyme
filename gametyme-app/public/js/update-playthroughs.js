let updatePlaythroughForm = document.getElementById('editPlaythrough');

updatePlaythroughForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectGame = document.getElementById("selectGame");
    let updatedGame = document.getElementById("edit-playthrough-game");
    let playthrough_id = document.getElementById('selectGame').options[selectGame.selectedIndex].value;

   
    let selectStart = document.getElementById("selectStart");
    let updatedStart = document.getElementById("edit-start-time");

    let selectFinish = document.getElementById("selectFinish");
    let updatedFinish = document.getElementById("edit-finish-time");

    let selectUser = document.getElementById("selectPlaythroughUsername");
    let updatedUser = document.getElementById("edit-user");
  


    
    let selectedGameVal = selectGame.value;
    let game_id = updatedGame.value;

    let selectedStart = selectStart.value;
    let start_timestamp = updatedStart.value;

    let selectedFinish = selectFinish.value;
    let finish_timestamp = updatedFinish.value;

    let selectedUser = selectUser.value;
    let user_id = updatedUser.value;

    
    let data = {        
        playthrough_id,
        game_id,
        start_timestamp,
        finish_timestamp,
        user_id
    }
  
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/playthroughs/${data.playthrough_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedGameVal, selectedStart, selectedFinish, selectedUser);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, playthrough_id){
    let parsedData = JSON.parse(data);

    

    location.reload();
    return false;
}

// Finish Playthrough listener

document.getElementById("finishPlaythroughBtn").addEventListener("submit", (e) => {
    e.preventDefault();

});
