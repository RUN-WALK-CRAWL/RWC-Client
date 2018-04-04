'use strict';

var app = app || {};

(function(module) {

  $('#create-form').on('submit', function(event) {
    event.preventDefault();

    var radius;
    if ($('#max-distance').val() === '0.25') {
      radius = 400;
    }
    if ($('#max-distance').val() === '0.5') {
      radius = 800;
    }
    if ($('#max-distance').val() === '0.75') {
      radius = 1200;
    }
    if ($('#max-distance').val() === '1.0') {
      radius = 1600;
    }
    if ($('#max-distance').val() === '1.25') {
      radius = 2000;
    }
    if ($('#max-distance').val() === '1.5') {
      radius = 2400;
    }

    let search = {
      lat: app.latLng[0],
      lng: app.latLng[1],
      stops: parseInt($('#max-stops :selected').text()),
      distance: radius
    };
    console.log(search);
  });
  module.crawlView = crawlView;
})(app);