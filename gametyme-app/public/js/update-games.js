let updateGameForm = document.getElementById('editGame');

updateGameForm.addEventListener("submit", function (e) {
   
    e.preventDefault();


    // Fill platform names to update
    const platform_names = [];

    document.querySelectorAll('input[name=edit-platform-names]:checked').forEach( box => {
        platform_names.push(box.value);
    } )

    const data = {
        game_title:     document.getElementById('edit-game-title').value,
        game_summary:   document.getElementById('edit-game-summary').value,
        release_date:   document.getElementById('edit-release-date').value,
        company_name:   document.getElementById('edit-game-company').value,
        genre_name:     document.getElementById('edit-game-genre').value,
        platform_names    
    }

    console.log(data);

    const game_id = document.getElementById('edit-game-id').value;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/games/${game_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            location.reload();
            return false;

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

});
