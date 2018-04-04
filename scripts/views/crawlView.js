'use strict';

var app = app || {};

(function(module) {

  const crawlView = {};
  crawlView.initSearchView = (ctx) => {
    //Hide containers, etc.
    console.log(ctx);
    $('#create-form').on('submit', function(event) {
      event.preventDefault();
      var radius;
      if ($('#max-distance').val() === '0.25') {radius = 100;}
      if ($('#max-distance').val() === '0.5') {radius = 200;}
      if ($('#max-distance').val() === '0.75') {radius = 300;}
      if ($('#max-distance').val() === '1.0') {radius = 400;}
      if ($('#max-distance').val() === '1.25') {radius = 500;}
      if ($('#max-distance').val() === '1.5') {radius = 600;}
      module.crawlCount=event.target.maxStops.value;
      page(`/search/${app.latLng[0]}/${app.latLng[1]}/${parseInt($('#max-stops :selected').text())}/${radius}/`);
    });
  };

  crawlView.initRouteView = (ctx) => {
    console.log(ctx);
  };
  module.crawlView = crawlView;
})(app);