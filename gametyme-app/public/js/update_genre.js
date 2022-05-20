let updateGenreForm = document.getElementById('editGenre');

updateGenreForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let selectGenre = document.getElementById("selectGenreName");
    let updatedGenre = document.getElementById("edit-genre-name");
    let selectedGenreID = document.getElementById('selectGenreName').options[selectGenre.selectedIndex].value;

    
    let selectedGenreValue = selectGenre.value;
    let updatedGenreName = updatedGenre.value;

    
    let data = {
        selectedGenre: selectedGenreValue,
        genre_id: selectedGenreID,
        genre_name: updatedGenreName,
    }
    console.log("ID: ", data.genre_id);
    console.log("Value: ", data.selectedGenre);
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT",  `/edit-genre/${data.genre_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedGenreValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, genre_id){
    let parsedData = JSON.parse(data);
    let updatedGenre = document.getElementById("edit-genre-name");
    let updatedGenreName = updatedGenre.value;
    
    console.log(parsedData);
    // let table = document.getElementById("genre-table");

    // for (let i = 0, row; row = table.rows[i]; i++) {
    //    if (table.rows[i].getAttribute("data-value") == genre_id) {

    //         let updateRowIndex = table.getElementsByTagName("tr")[i];

    //         let td = updateRowIndex.getElementsByTagName("td")[1];

    //         td.innerHTML = updatedGenreName; 
            
    //    }
    // }

    location.reload();
    return false;
}
