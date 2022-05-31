function showDelete(game_id){
    document.getElementById("deleteGame").style.display = "block";
  
    document.getElementById("delGameBtn").addEventListener("click", function(e){
      e.preventDefault();
      let link = `/games/${game_id}`;
    let data = {
      id: game_id
  };
  
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(game_id);
    }
  });
  
    })
   
  }
  
  
  function deleteRow(game_id){
    let table = document.getElementById("games-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == game_id) {
            table.deleteRow(i);
            break;
      }
    }
    document.getElementById("deleteGame").style.display = "none";
  }