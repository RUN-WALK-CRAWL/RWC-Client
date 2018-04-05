var app = app || {};

(function(module) {
  // let google;
  var stylesArray = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'all',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ];

  var mapOptions = {
    zoom: 15,
    styles: stylesArray,
    center: new google.maps.LatLng(47.618217, -122.351832),
    mapTypeId: google.maps.MapTypeId.STREET,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    }
  };
  

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // module.setMarkers(map);


  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      input.placeholder = 'Enter a location';
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(5);
    }
    let lat = (place.geometry.location.lat());
    let lng = (place.geometry.location.lng());
    module.latLng = [];
    module.latLng.push(lat);
    module.latLng.push(lng);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });

  var marker = new google.maps.Marker({
    position: {lat: 47.6062, lng: -122.3321},
    icon: '/../../../../images/005-pin.png',
    infowindow: new google.maps.InfoWindow({
      content: `Starting Point!`
    }),
    map: map,
  });

  let allMarkers;

  map.setMarkers = () => {
    allMarkers = [marker];
    app.Crawl.selected.forEach((location,i) => {
      let myLatLng = new google.maps.LatLng(parseFloat(location.latitude),parseFloat(location.longitude));
      let newMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        icon: '/../../../../images/bar-icon.png',
        map: map,
        infowindow: new google.maps.InfoWindow({
          content: `<h3><b>Stop ${i+1}</b></h3>` + `<p>${location.name}</p>` + `<p><em>${location.address}</em></p>`
        })
      });
      allMarkers.push(newMarker);
      newMarker.setPosition(myLatLng);
      newMarker.setVisible(true);
      newMarker.addListener('click', function() {
        map.hideAllOpenInfoWindows();
        newMarker.infowindow.open(map, newMarker);
      });
    });
    let bounds = new google.maps.LatLngBounds();
    console.log(allMarkers);
    allMarkers.forEach(marker => {bounds.extend(marker.getPosition());});
    map.fitBounds(bounds);
  };

  map.hideAllOpenInfoWindows = map => {
    allMarkers.forEach(marker => {
      marker.infowindow.close(map, marker);
    });
  };

  module.map = map;
})(app);
