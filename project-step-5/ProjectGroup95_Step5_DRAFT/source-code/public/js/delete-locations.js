function showDelete(location_id){
    document.getElementById("deleteLocation").style.display = "block";
  
    document.getElementById("dellocationBtn").addEventListener("click", function(e){
      e.preventDefault();
      let link = `/locations/${location_id}`;
    let data = {
      id: location_id
  };
  
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(location_id);
    }
  });
  
    })
   
  }
  
  
  function deleteRow(location_id){
    let table = document.getElementById("locations-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == location_id) {
            table.deleteRow(i);
            break;
      }
    }
    document.getElementById("deleteLocation").style.display = "none";
  }