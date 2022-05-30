function deleteGenre(genre_id) {
  let link = `/delete-genre/${genre_id}`;
  let data = {
    id: genre_id
};

$.ajax({
  url: link,
  type: 'DELETE',
  data: JSON.stringify(data),
  contentType: "application/json; charset=utf-8", 
  success: function(result) {
    deleteRow(genre_id);
  }
});
}

function deleteRow(genre_id){
  let table = document.getElementById("genre-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == genre_id) {
          table.deleteRow(i);
          break;
    }
  }
}