
function loadJson(){
  var url = './bands.json';

  fetch(url)
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(function(json){
      console.info(json[2]);
    })
    .catch(function(err){
      console.info(err);
    });
}
