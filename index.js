var mainElement = document.querySelector('main');

function whenJSONLoad(bands){
  var completeListOfBands = bands.map(function(band , i){
    for(var i = 0; i < band.members.length; i++){
      console.log(band.members[i].name);
    }
    return `<div id="band1">
      <h2 class="space-between">${band.name}<h2>
      <h3 class="space-between">${band.genre}<h3>
      <h3 class="space-between">Members<h3>

      <ul class="members space-between">
        <li></li>
        <li>John Doe Guitar</li>
      </ul>
      <h3 class="space-between">Albums<h3>


      <ul class="albums space-between">
        <li>Album Name (2001)</li>
        <li>Album Name (2001)</li>
      </ul>
    </div>`


  });
  mainElement.innerHTML = completeListOfBands.join("");
}



function loadJson(url){
  fetch(url)
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(whenJSONLoad)
    .catch(function(err){
      console.info(err);
    });
}


var url = './bands.json';
loadJson(url);
