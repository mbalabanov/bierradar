'use strict';

let citiesPages = [["Akron", 1], ["Albuquerque", 2], ["Amarillo", 1], ["Anaheim", 1], ["Anchorage", 1], ["Arlington", 1], ["Atlanta", 2], ["Augusta", 1], ["Aurora", 1], ["Austin", 3], ["Bakersfield", 1], ["Baltimore", 2], ["Baton Rouge", 1], ["Birmingham", 1], ["Boise", 1], ["Boston", 1], ["Buffalo", 1], ["Cape Coral", 1], ["Chandler", 1], ["Charlotte", 1], ["Chattanooga", 1], ["Chesapeake", 1], ["Chicago", 4], ["Chula Vista", 1], ["Cincinnati", 2], ["Cleveland", 2], ["Colorado Springs", 2], ["Columbus", 2], ["Corpus Christi", 1], ["Dallas", 2], ["Denver", 5], ["Des Moines", 1], ["Detroit", 1], ["Durham", 1], ["El Paso", 1], ["Elk Grove", 1], ["Fayetteville", 1], ["Fontana", 1], ["Fort Lauderdale", 1], ["Fort Wayne", 1], ["Fort Worth", 1], ["Fremont", 1], ["Fresno", 1], ["Frisco", 1], ["Garland", 1], ["Gilbert", 1], ["Glendale", 1], ["Grand Prairie", 1], ["Greensboro", 1], ["Henderson", 1], ["Hialeah", 1], ["Honolulu", 1], ["Houston", 2], ["Huntington Beach", 1], ["Huntsville", 1], ["Indianapolis", 2], ["Irvine", 1], ["Irving", 1], ["Jacksonville", 1], ["Jersey City", 1], ["Kansas City", 2], ["Knoxville", 1], ["Laredo", 1], ["Las Vegas", 1], ["Lexington", 1], ["Lincoln", 1], ["Little Rock", 1], ["Long Beach", 1], ["Los Angeles", 2], ["Louisville", 2], ["Lubbock", 1], ["Madison", 2], ["McKinney", 1], ["Memphis", 1], ["Mesa", 1], ["Miami", 1], ["Milwaukee", 2], ["Minneapolis", 3], ["Mobile", 1], ["Modesto", 1], ["Montgomery", 1], ["Moreno Valley", 1], ["Nashville", 2], ["New Orleans", 1], ["New York", 1], ["Newark", 1], ["Newport News", 1], ["Norfolk", 1], ["North Las Vegas", 1], ["Oakland", 1], ["Oceanside", 1], ["Oklahoma City", 1], ["Omaha", 1], ["Ontario", 1], ["Orlando", 1], ["Overland Park", 1], ["Oxnard", 1], ["Peoria", 1], ["Philadelphia", 2], ["Phoenix", 1], ["Pittsburgh", 12], ["Plano", 1], ["Port St. Lucie", 1], ["Portland", 6], ["Providence", 1], ["Raleigh", 2], ["Rancho Cucamonga", 1], ["Reno", 1], ["Richmond", 2], ["Riverside", 1], ["Rochester", 1], ["Sacramento", 2], ["Saint Paul", 2], ["Salem", 2], ["Salt Lake City", 1], ["San Antonio", 1], ["San Bernardino", 1], ["San Diego", 5], ["San Francisco", 2], ["San Jose", 1], ["Santa Ana", 1], ["Santa Clarita", 1], ["Santa Rosa", 1], ["Scottsdale", 1], ["Seattle", 4], ["Shreveport", 1], ["Sioux Falls", 1], ["Spokane", 1], ["St. Louis", 1], ["St. Petersburg", 1], ["Stockton", 1], ["Tacoma", 2], ["Tallahassee", 1], ["Tampa", 1], ["Tempe", 1], ["Toledo", 1], ["Tucson", 1], ["Tulsa", 1], ["Vancouver", 1], ["Virginia Beach", 1], ["Washington", 2], ["Wichita", 1], ["Winston–Salem", 1], ["Worcester", 1], ["Yonkers", 1]];
let statesPages = [["Alabama", 3], ["Alaska", 3], ["Arizona", 7], ["Arkansas", 3], ["California", 45], ["Colorado", 22], ["Connecticut", 5], ["Delaware", 2], ["Florida", 16], ["Georgia", 5], ["Hawaii", 2], ["Idaho", 4], ["Illinois", 13], ["Indiana", 9], ["Iowa", 5], ["Kansas", 6], ["Kentucky", 3], ["Louisiana", 3], ["Maine", 6], ["Maryland", 6], ["Massachusetts", 9], ["Michigan", 19], ["Minnesota", 10], ["Mississippi", 1], ["Missouri", 8], ["Montana", 5], ["Nebraska", 3], ["Nevada", 3], ["New Hampshire", 4], ["New Jersey", 6], ["New Mexico", 5], ["New York", 21], ["North Carolina", 16], ["North Dakota", 1], ["Ohio", 16], ["Oklahoma", 3], ["Oregon", 15], ["Pennsylvania", 18], ["Rhode Island", 2], ["South Carolina", 4], ["South Dakota", 2], ["Tennessee", 6], ["Texas", 18], ["Utah", 3], ["Vermont", 3], ["Virginia", 13], ["Washington", 22], ["West Virginia", 2], ["Wisconsin", 11], ["Wyoming", 2]];
let typesPages = [["Bar", 1], ["Brewpub", 120], ["Large", 4], ["Micro", 209], ["Nano", 1], ["Regional", 12], ["Planning", 37]];

let resultsArea = document.getElementById('resultsArea');
let filterArea = document.getElementById('filterArea');
let paginationAreaStart = document.getElementById('pagination-start');
let paginationAreaEnd = document.getElementById('pagination-end');

document.getElementById('getAlphabeticalPaged').addEventListener('click', function () { getAlphabeticalPaged(1, 397, 'name', '') });
document.getElementById('getBySearch').addEventListener('click', getBySearch);
document.getElementById('searchField').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) { getBySearch() }
});

async function getAlphabeticalPaged(currentPage = 1, pagesAvailable = 10, type = 'name') {

  resultsArea.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

  await axios
    .get('https://api.openbrewerydb.org/breweries?sort=' + 'name&page=' + currentPage)
    .then(response => generateOutput(response, 'getAlphabeticalPaged', 'name', currentPage, pagesAvailable))
    .then(showFilter(type))
    .then(setActiveButton('getAlphabeticalPaged'))
    .catch(error => console.error(error));
}

async function getByCity(currentPage = 1, pagesAvailable = 10, city = 'san_diego') {

  resultsArea.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

  await axios
    .get('https://api.openbrewerydb.org/breweries?by_city=' + city + '&sort=' + 'name&page=' + currentPage)
    .then(response => generateOutput(response, 'getByCity', city, currentPage, pagesAvailable))
    .then(showFilter(city))
    .then(setActiveButton('getByCity'))
    .catch(error => console.error(error));
}

async function getByState(currentPage = 1, pagesAvailable = 10, state = 'california') {

  resultsArea.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

  await axios
    .get('https://api.openbrewerydb.org/breweries?by_state=' + state + '&sort=name&page=' + currentPage)
    .then(response => generateOutput(response, 'getByState', state, currentPage, pagesAvailable))
    .then(showFilter(state))
    .then(setActiveButton('getByState'))
    .catch(error => console.error(error));
}

async function getByType(currentPage = 1, pagesAvailable = 10, type = 'micro') {

  resultsArea.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

  await axios
    .get('https://api.openbrewerydb.org/breweries?by_type=' + type + '&sort=name&page=' + currentPage)
    .then(response => generateOutput(response, 'getByType', type, currentPage, pagesAvailable))
    .then(showFilter(type))
    .then(setActiveButton('getByType'))
    .catch(error => console.error(error));
}

async function getBySearch() {

  let searchterm = document.getElementById('searchField').value.toLowerCase().replace(/ /g, "_");

  if (searchterm) {

    resultsArea.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

    await axios
      .get('https://api.openbrewerydb.org/breweries/search?query=' + searchterm)
      .then(response => generateOutput(response, 'getBySearch', searchterm, 1, 1))
      .then(showFilter(searchterm))
      .then(setActiveButton('getBySearch'))
      .then(clearSearch())
      .catch(error => console.error(error));
  }
}

function generateOutput(response, responseType, responseContent, currentPage = 1, pagesAvailable = 10) {
  let displayContent = '';
  let breweryData = response.data;

  if (breweryData.length != 0) {

    resultsArea.innerHTML = '';

    let street;
    let postal_code;
    let city;
    let state;
    let longitude;
    let latitude;

    for (let brewery of breweryData) {

      if (brewery.street) { street = brewery.street } else { street = "No street available" };
      if (brewery.postal_code) { postal_code = brewery.postal_code } else { postal_code = "no postalcode available" };
      if (brewery.city) { city = brewery.city } else { city = "no city available" };
      if (brewery.state) { state = brewery.state } else { city = "no state available" };
      if (brewery.longitude) { longitude = brewery.longitude } else { longitude = "no data" };
      if (brewery.latitude) { latitude = brewery.latitude } else { latitude = "no data" };

      displayContent += `
      <div class="col-md-6">
        <div class="card m-1 border-secondary">
          <img src="img/brewery-placeholder.jpg" class="card-img-top" alt="${brewery.name}">
          <div class="card-body">
            <h5 class="card-title">${brewery.name}</h5>
            <p class="card-text text-muted small">
              ${street}, ${postal_code}, ${city}, ${state}.<br/>
            </p>
            <p class="card-text mb-2 text-info small">
              <strong>Longitude:</strong> ${longitude}<br/><strong>Latitude:</strong> ${latitude}
            </p>
            <p class="card-text">
              <span class="badge bg-info text-capitalize">${brewery.brewery_type}</span>
            </p>
          </div>
          <div class="card-footer">
          `;

      if (brewery.website_url != null) {
        displayContent += `<a href="${brewery.website_url}" class="btn btn-sm btn-primary m-1" target="_blank">&#8674; Website</a>`;
      } else {
        displayContent += `<p class="text-danger"><small>No website available.</small></p>`;
      };

      if (brewery.longitude != null && brewery.latitude != null) {
        displayContent += `<a class="btn btn-secondary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#locationModal" data-bs-mapTitle="${brewery.name}" data-bs-address="${street}, ${postal_code}, ${city}" data-bs-longitude="${longitude}" data-bs-latitude="${latitude}">&#8674; Location</a>`;
      } else {
        displayContent += `<p class="text-danger"><small>No location data available.</small></p>`;
      };

      displayContent += `
          </div>
        </div>
      </div>`;

      resultsArea.innerHTML = displayContent;

    }

    if (pagesAvailable > 1) {
      generatePagination(responseType, responseContent, currentPage, pagesAvailable);
    } else {
      paginationAreaStart.innerHTML = '';
      paginationAreaEnd.innerHTML = '';
    }

    prepareMapLocationModal();

  } else {
    resultsArea.innerHTML = '<h3 class="text-center"><span class="badge bg-danger">No breweries found</span></h2>';
    paginationAreaStart.innerHTML = '';
    paginationAreaEnd.innerHTML = '';
  }

}

function generateMenuList(methodName, menuName, parameterList) {
  let menu = document.getElementById(menuName);
  let menuText = '';
  for (let item of parameterList) {
    let itemParameter = item[0].toLowerCase().replace(/ /g, "_");
    menuText += `<li><a class="dropdown-item brewery-dropdown" id="${methodName}-${item[0]}" data-bs-method="${methodName}(1, ${item[1]}, '${itemParameter}')">${item[0]} - ${item[1]} page(s)</a></li>`;
  }
  menu.innerHTML = menuText;
}

function addClickListenersToMenuItems() {
  document.querySelectorAll('.brewery-dropdown').forEach(item => {
    item.addEventListener('click', event => {

      let clickMethod = event.target.getAttribute('data-bs-method');

      let previousActiveMenuItem = document.querySelector('.brewery-dropdown.active');
      if (previousActiveMenuItem) { previousActiveMenuItem.classList.remove('active') };

      let menuItemID = event.target.getAttribute('id');
      document.getElementById(menuItemID).classList.add('active');

      Function(clickMethod)();
    })
  })
}

function generatePagination(responseType, responseContent, currentPage, pagesAvailable) {
  let paginationContent = '';
  let rangeStart = currentPage - 5;
  if (rangeStart < 1) { rangeStart = 1 };
  let rangeEnd = currentPage + 5;
  if (rangeEnd > pagesAvailable) { rangeEnd = pagesAvailable };

  if (currentPage != rangeStart) { paginationContent += `<li class="page-item"><a class="page-link" href="#" onclick="${responseType}(${currentPage - 1}, ${pagesAvailable}, '${responseContent}')">&laquo;</a></li>`; }

  for (let page = rangeStart; page <= rangeEnd; page++) {
    if (page == currentPage) {
      paginationContent += `<li class="page-item active"><a class="page-link" href="#" onclick="${responseType}(${page}, ${pagesAvailable},  '${responseContent}')">${page}</a></li>`;
    } else {
      paginationContent += `<li class="page-item"><a class="page-link" href="#" onclick="${responseType}(${page}, ${pagesAvailable}, '${responseContent}')">${page}</a></li>`;
    }
  }
  if (currentPage != rangeEnd) { paginationContent += `<li class="page-item"><a class="page-link" href="#" onclick="${responseType}(${currentPage + 1}, ${pagesAvailable}, '${responseContent}')">&raquo;</a></li>`; }

  paginationAreaStart.innerHTML = paginationContent;
  paginationAreaEnd.innerHTML = paginationContent;
}

function prepareMapLocationModal() {
  let locationModal = document.getElementById('locationModal');
  let largeMapButton = document.getElementById('largeMapButton');

  locationModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget;
    let mapName = button.getAttribute('data-bs-mapTitle');
    let modalLongitude = button.getAttribute('data-bs-longitude');
    let modalLatitude = button.getAttribute('data-bs-latitude');
    let modalAddress = button.getAttribute('data-bs-address');

    let modalTitle = locationModal.querySelector('.modal-title')
    let modalLocationMap = locationModal.querySelector('#locationMap');

    modalTitle.textContent = mapName;
    modalLocationMap.innerHTML = `<iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${modalLongitude}%2C${modalLatitude}%2C${modalLongitude}5%2C${modalLatitude}&amp;layer=mapnik&amp;marker=${modalLatitude}%2C${modalLongitude}" style="border: 1px solid black"></iframe>`;
    addressAreaModal.innerHTML = `<p>${mapName}, ${modalAddress}.</p>`;
    largeMapButton.innerHTML = `<a class="btn btn-primary" target="_blank" href="https://www.openstreetmap.org/?mlat=${modalLatitude}&amp;mlon=${modalLongitude}#map=16/${modalLatitude}/${modalLongitude}">Large Map</a>`;
  })

}

function showFilter(filterParameter) {
  filterArea.innerHTML = `<span class="badge bg-primary text-capitalize m-1">${filterParameter}</span>`
}

function clearSearch() {
  document.getElementById('searchField').value = '';
}

function setActiveButton(buttonID) {

  let previousActiveButton = document.querySelector('.btn-primary');
  previousActiveButton.classList.remove('btn-primary');
  previousActiveButton.classList.add('btn-secondary');
  let setActiveButton = document.querySelector('#' + buttonID);
  setActiveButton.classList.remove('btn-secondary');
  setActiveButton.classList.add('btn-primary');
}