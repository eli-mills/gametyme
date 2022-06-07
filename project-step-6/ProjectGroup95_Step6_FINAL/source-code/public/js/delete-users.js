function showDelete(user_id){
    document.getElementById("deleteUser").style.display = "block";
  
    document.getElementById("deluserBtn").addEventListener("click", function(e){
      e.preventDefault();
      let link = `/users/${user_id}`;
    let data = {
      id: user_id
  };
  
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(user_id);
    }
  });
  
    })
   
  }
  
  
  function deleteRow(user_id){
    let table = document.getElementById("user-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == user_id) {
            table.deleteRow(i);
            break;
      }
    }
    document.getElementById("deleteUser").style.display = "none";
  }