function showDelete(playthrough_id){
    document.getElementById("deletePlaythrough").style.display = "block";
  
    document.getElementById("delplaythroughBtn").addEventListener("click", function(e){
      e.preventDefault();
      let link = `/playthroughs/${playthrough_id}`;
    let data = {
      id: playthrough_id
  };
  
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(playthrough_id);
    }
  });
  
    })
   
  }
  
  
  function deleteRow(playthrough_id){
    let table = document.getElementById("playthrough-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == playthrough_id) {
            table.deleteRow(i);
            break;
      }
    }
    document.getElementById("deletePlaythrough").style.display = "none";
  }