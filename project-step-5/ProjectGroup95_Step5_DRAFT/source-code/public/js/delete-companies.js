function showDelete(company_id){
    document.getElementById("deleteCompany").style.display = "block";
  
    document.getElementById("delcompanyBtn").addEventListener("click", function(e){
      e.preventDefault();
      let link = `/companies/${company_id}`;
    let data = {
      id: company_id
  };
  
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(company_id);
    }
  });
  
    })
   
  }
  
  
  function deleteRow(company_id){
    let table = document.getElementById("company-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == company_id) {
            table.deleteRow(i);
            break;
      }
    }
    document.getElementById("deleteCompany").style.display = "none";
  }