let mainElement = document.querySelector("main");
let url = "./bands.json";

// Handles the render of the layout
renderByName = bands => {
  let completeListOfBands = bands.map(function(band, i) {
    let memberslist = renderMembers(band.members);
    let albumslist = renderAlbums(band.albums);
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
    </div>`;
  });

  mainElement.innerHTML = completeListOfBands.join(""); //putting all the bands as a string back
};

// Fetching the data from the .json file
loadJson = url => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(whenJSONLoad)

    .catch(function(err) {
      console.info(err);
    });
};

// Render the bands members alphabetically
renderMembers = members => {
  let htmlString = "<h4>Members</h4><ul>";
  members.sort(sortByName).forEach(member => {
    htmlString += `

          <li>
            <span class="member-name">${member.name}</span>
            <span class="member-instrument">${member.instrument}</span>
          </li>`;
  });

  return htmlString + "</ul>";
};

// render albums depending of the year
renderAlbums = albums => {
  let htmlString = "<h4>Albums</h4><ul>";
  albums.sort(sortByNumber).forEach(album => {
    htmlString += `

          <li>
            <span class="album-name">${album.title}</span>
            <span class="album-release-year">${album.releaseYear}</span>
          </li>`;
  });

  return htmlString + "</ul>";
};

// Sorting names alphabetically
sortByName = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

//Sorting from smaller to bigger
sortByNumber = (a, b) => {
  return a.releaseYear - b.releaseYear;
};

whenJSONLoad = bands => {
  renderByName(bands);

  let search = document.querySelector("input");

  search.addEventListener("keyup", () => {
    if (search.value === "") {
      throw "No valid input";
    } else {
      let newBands = bands.filter(band => {
        if (band.name.toLowerCase().indexOf(search.value) > -1) return band;
      });

      renderByName(newBands);
    }
  });
};

/////// Main function call ////////////////

loadJson(url);
