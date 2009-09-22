// load the specific API you want
google.load("maps", "2");

function initialize() {
  var map = new google.maps.Map2(document.getElementById("map"));
  map.setCenter(new google.maps.LatLng(49.29196, 19.94800), 13);
  map.addControl(new google.maps.SmallMapControl());
  map.addControl(new google.maps.MapTypeControl());

  directionsPanel = document.getElementById("route");
  directions = new google.maps.Directions(map, directionsPanel);
  directions.load("from: Zakopane, Poland to: Nowy Targ, Poland");
}

// call initialize when the page has been loaded
google.setOnLoadCallback(initialize);
