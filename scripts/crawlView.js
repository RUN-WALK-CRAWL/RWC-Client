'use strict';

(function (module) {
  const crawlView={};

  crawlView.initHomePage =()=>{
    $('.container').hide();
    $('.home-view').show();
    $('#start-button').on('click', page('/create'));
  }
  crawlView.initCreatePage=(username)=>{
    $('.container').hide();
    $('.create-view').show();
    $('.create-form').on('submit', function(event) {
      event.preventDefault();
      
      let crawl = {
        username: username.value || '',
        location: event.target.location.value,
        stops: event.target.maxStops.value,
        distance: event.target.maxDistance.value
      };
      module.Crawl.create(crawl);
    })
  }
  crawlView.initUserProfile=(username)=>{
    $('.container').hide();
    //need a load function to populate the users saved routes
    //could simply be a stack of rectangles displaying the name of the route
    $('.user-profile-view').show();
    $('.create-user-route').on('click',page('/create/:username'))
  }

  module.crawlView = crawlView;
})(app)

$('.create-form').on('submit', Crawl.search);