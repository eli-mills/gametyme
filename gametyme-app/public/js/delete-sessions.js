function showDeleteSession(session_id){
    document.getElementById("deleteSession").style.display = "block";
  
    document.getElementById("delsessionBtn").addEventListener("click", function(e){
      e.preventDefault();
      let link = `/sessions/${session_id}`;
    let data = {
      id: session_id
  };
  
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(session_id);
    }
  });
  
    })
   
  }
  
  
  function deleteRow(session_id){
    let table = document.getElementById("session-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == session_id) {
            table.deleteRow(i);
            break;
      }
    }
    document.getElementById("deleteSession").style.display = "none";
  }