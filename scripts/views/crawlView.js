'use strict';

var app = app || {};

(function(module) {

  const crawlView = {};

  crawlView.initHomePage =()=>{
    $('.container').hide();
    // if(localStorage.token){
    //   $('.user').show();
    //   $('.guest').hide();
    // }
    // else{
    //   $('.user').hide();
    //   $('.guest').show();
    // } 
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
      event.preventDefault();
      //saving user id # for retrieval later
      // if(ctx.params.id){
      //   let id = localStorage.setItem('user-id', ctx.params.id);
      // } 
      
      //using search parameters to make ajax request and move to results page
      module.crawlCount = event.target.maxStops.value;
      page(`/search/${app.latLng[0]}/${app.latLng[1]}/${parseInt($('#max-stops :selected').text())}/${event.target.price.value}`);
      event.target.maxStops.value = '';
      event.target.price.value = '';
    });
  };

  crawlView.initRouteView = () => {
    $('.container').hide();
    $('#background').hide();
    // if(localStorage.token) $('#save-route-button').show();
    // if(!localStorage.token) $('#save-route-button').hide();
    $('.route-view').show();
    $('#save-route-button').on('click',app.Crawl.saveRoute);
    $('#list-container').empty();
    app.map.setMarkers();
    app.Crawl.selected.forEach(location => $('#list-container').append(location.toHtml()));
  };

  crawlView.initUserProfile = (ctx)=>{
    console.log(ctx);
    $('.container').hide();
    //need a load function to populate the users saved routes
    //could simply be a stack of rectangles displaying the name of the route
    $('.user-profile-view').show();
    let template = Handlebars.compile($('#user-template').text());
    $('.user-profile-view').append(template(ctx));
    //$('.create-user-route').on('click',page(`/search/${ctx.id}`));
  };

  crawlView.initAboutPage =()=>{
    $('.container').hide();
    $('.user').hide();
    $('#background').show();
    $('.about-view').show();
  };

  module.crawlView = crawlView;

})(app);