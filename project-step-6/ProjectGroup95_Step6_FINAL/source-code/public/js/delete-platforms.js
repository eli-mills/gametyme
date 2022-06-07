function showDelete(platform_id){
    document.getElementById("deletePlatform").style.display = "block";
  
    document.getElementById("delplatformBtn").addEventListener("click", function(e){
      e.preventDefault();
      let link = `/platforms/${platform_id}`;
    let data = {
      id: platform_id
  };
  
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(platform_id);
    }
  });
  
    })
   
  }
  
  
  function deleteRow(platform_id){
    let table = document.getElementById("platform-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == platform_id) {
            table.deleteRow(i);
            break;
      }
    }
    document.getElementById("deletePlatform").style.display = "none";
  }