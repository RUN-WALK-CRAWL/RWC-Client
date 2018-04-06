'use strict';

var app = app || {};

(function(module) {

  const crawlView = {};

  crawlView.handleNav = () => {
    $('#nav-home').show();
    $('#nav-create').show();
    if(localStorage.token === 'true'){
      $('.guest').hide();
      $('.user').show();
    } else {
      $('.user').hide();
      $('.guest').show();
    }
    $('.menu').hide();
  };

  crawlView.initHomePage =()=>{
    $('.container').hide();
    crawlView.handleNav();
    $('#nav-home').hide();
    $('#nav-create').hide();
    $('#background').show();
    $('.home-view').show();
  };

  crawlView.initSearchView = (ctx) => {
    app.map.clearMarkers();
    $('.container').hide();
    crawlView.handleNav();
    $('#nav-create').hide();
    $('.create-view').show();
    let user_id;
    if (ctx.params.id) user_id = ctx.params.id;
    else if (localStorage.user_id) user_id = localStorage.user_id;
    else user_id = '0';
    $('#create-form').on('submit', function(event) {
      event.preventDefault();
      module.crawlCount = event.target.maxStops.value;
      page(`/search/${app.latLng[0]}/${app.latLng[1]}/${event.target.maxStops.value}/${event.target.price.value}/${user_id}`);
    });
  };

  crawlView.initRouteView = (ctx) => {
    $('.container').hide();
    crawlView.handleNav();
    if(localStorage.token ==='false') {$('.user').hide();}
    $('.route-view').show();
    $('#save-route-button').on('click',()=>app.Crawl.saveRoute(ctx,$('#route-name-field').val()));
    $('#list-container').empty();
    app.map.setMarkers();
    app.Crawl.selected.forEach(location => $('#list-container').append(location.toHtml()));
  };

  crawlView.initUserProfile = ctx => {
    //NEW
    crawlView.handleNav();
    $('#nav-profile').hide();
    $('.container').hide();
    let id;
    if (ctx) {id = ctx.id;}
    else {id = localStorage.user_id;}
    $.get(`${ENV.apiUrl}/api/v1/crawls/${id}`)
      .then(res => {
        $('.user-profile-view').show();
        $('.user-profile-view').empty();
        let template = Handlebars.compile($('#user-template').text());
        $('.user-profile-view').append(template(res));
        $('.create-user-route').on('click',()=>page(`/search/${ctx.id}`));
      });
    //need a load function to populate the users saved routes
    //could simply be a stack of rectangles displaying the name of the route
  };

  crawlView.initAboutPage =()=>{
    $('.container').hide();
    crawlView.handleNav();
    $('.about-view').show();
  };

  module.crawlView = crawlView;

})(app);