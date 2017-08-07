var mainElement = document.querySelector('main');

function whenJSONLoad(bands){
  var completeListOfBands = bands.map(function(band , i){
  var memberslist = renderMembers(band.members);
  var albumslist = renderAlbums(band.albums);
    return `<div id="band1">
      <h2 class="space-between">${band.name}<h2>
      <h3 class="space-between">${band.genre}<h3>
      <h3 class="space-between">Members<h3>

      <ul class="members space-between">
        <li>${memberslist}</li>

      </ul>
      <h3 class="space-between">Albums<h3>


      <ul class="albums space-between">
        <li>${albumslist}</li>
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

function renderMembers(members) {
  var  htmlString = "<h4>Members</h4><ul>";
  members.sort(sortByName).forEach(function(member){
    htmlString += `

          <li>
            <span class="member-name">${member.name}</span>
            <span class="member-instrument">${member.instrument}</span>
          </li>`
  });
  return htmlString + "</ul>";
}

function renderAlbums(albums) {
  var htmlString = "<h4>Albums</h4><ul>";
  albums.sort(sortByNumber).forEach(function(album) {

    htmlString += `

          <li>
            <span class="album-name">${album.title}</span>
            <span class="album-release-year">${album.releaseYear}</span>
          </li>`
  });
  return htmlString + "</ul>";
}

function sortByName(a,b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

function sortByNumber(a,b) {
  return a.releaseYear - b.releaseYear;
}
















/////// Calling the functions ////////////////

var url = './bands.json';
loadJson(url);
