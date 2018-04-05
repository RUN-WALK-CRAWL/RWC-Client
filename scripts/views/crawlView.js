'use strict';

var app = app || {};

(function(module) {

  const crawlView = {};

  crawlView.initHomePage =()=>{
    $('.container').hide();
    if(localStorage.token){
      $('.user').show();
      $('.guest').hide();
    }
    else{
      $('.user').hide();
      $('.guest').show();
    } 
    $('#background').show();
    $('.home-view').show();
  };

  crawlView.initSearchView = (ctx) => {
    //Hide containers, etc.
    $('.container').hide();
    $('#background').show();
    $('.create-view').show();
    $('#create-form').on('submit', function(event) {
      event.preventDefault();
      //saving search parameters to database
      // let search = {
      //   // username: username.value || '',
      //   location: event.target.location.value,
      //   stops: event.target.maxStops.value,
      //   distance: event.target.maxDistance.value
      // };
      // module.Crawl.saveRoute(search);

      //using search parameters to make ajax request and move to results page
      var radius;
      if ($('#max-distance').val() === '0.25') {radius = 100;}
      if ($('#max-distance').val() === '0.5') {radius = 200;}
      if ($('#max-distance').val() === '0.75') {radius = 300;}
      if ($('#max-distance').val() === '1.0') {radius = 400;}
      if ($('#max-distance').val() === '1.25') {radius = 500;}
      if ($('#max-distance').val() === '1.5') {radius = 600;}
      module.crawlCount = event.target.maxStops.value;
      page(`/search/${app.latLng[0]}/${app.latLng[1]}/${parseInt($('#max-stops :selected').text())}/${radius}/`);
    });
  };

  crawlView.initRouteView = (ctx) => {
    $('.container').hide();
    $('#background').hide();
    if(localStorage.token) $('#save-route-button').show();
    if(!localStorage.token) $('#save-route-button').hide();
    $('.route-view').show();
    $('#save-route-button').on('click',app.Crawl.saveRoute(ctx));
    $('#list-container').empty();
    app.map.setMarkers();
    app.Crawl.selected.forEach(location => $('#list-container').append(location.toHtml()));
  };

  crawlView.initUserProfile = (username)=>{
    $('.container').hide();
    //need a load function to populate the users saved routes
    //could simply be a stack of rectangles displaying the name of the route
    $('.user-profile-view').show();
    $('.create-user-route').on('click',page('/search'));
  };

  module.crawlView = crawlView;

})(app);