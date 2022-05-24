function showEdit( selectedGenre ){
    document.getElementById("editGenre").style.display = "block";
    document.getElementById("selectGenreName").value = selectedGenre;
}

function hideEdit() {
    document.getElementById("editGenre").style.display = "none";
}

function showDelete(){
    document.getElementById("deleteGenre").style.display = "block";
}

function addNew(){
    document.getElementById("addGenre").style.display = "block";
}



document.getElementById("cancelGenreAddBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addGenre").style.display = "none";

})