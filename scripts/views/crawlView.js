'use strict';

var app = app || {};

(function(module) {

  const crawlView = {};

  crawlView.initHomePage =()=>{
    $('.container').hide();
    $('#nav-home').hide();
    $('#nav-create').hide();
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
    $('#nav-home').show();
    $('#background').show();
    $('.create-view').show();
    $('#create-form').on('submit', function(event) {
      if(!event.target.maxStops.value || !event.target.price.value) {alert('Please fill out both your desired number of stops and your max budget!');
        event.preventDefault();
        return;}
      event.preventDefault();

      //using search parameters to make ajax request and move to results page
      module.crawlCount = event.target.maxStops.value;
      page(`/search/${app.latLng[0]}/${app.latLng[1]}/${parseInt($('#max-stops :selected').text())}/${event.target.price.value}/`);
      event.target.maxStops.value = '';
      event.target.price.value = '';
    });
  };

  crawlView.initRouteView = (ctx) => {
    $('.container').hide();
    $('#background').hide();
    // if(localStorage.token) $('#save-route-button').show();
    // if(!localStorage.token) $('#save-route-button').hide();
    $('.route-view').show();
    // $('#save-route-button').on('click',app.Crawl.saveRoute(ctx));
    $('#list-container').empty();
    app.map.setMarkers();
    app.Crawl.selected.forEach(location => $('#list-container').append(location.toHtml()));
  };

  // crawlView.initUserProfile = (username)=>{
  //   $('.container').hide();
  //   //need a load function to populate the users saved routes
  //   //could simply be a stack of rectangles displaying the name of the route
  //   $('.user-profile-view').show();
  //   $('.create-user-route').on('click',page('/search'));
  // };

  crawlView.initAboutPage =()=>{
    $('.container').hide();
    $('.user').hide();
    $('#background').show();
    $('.about-view').show();
  };

  module.crawlView = crawlView;

})(app);