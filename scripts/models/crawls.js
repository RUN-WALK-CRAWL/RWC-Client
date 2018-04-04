'use strict';

//GLOBAL VARIABLES
var app = app || {};
const SERVER_URL = 'http://localhost:3000';

(function(module) {

  function Crawl(object) {
    this.res_id = object.res_id;
    this.name = object.name;
    this.address = object.address;
    this.latitude = object.latitude;
    this.longitude = object.longitude;
    this.price_range = object.price_range;
    this.rating = object.rating;
    this.thumbnail = object.thumbnail;
  }

  Crawl.all = [];

  Crawl.search = (ctx, next) => {
    console.log('searching...');
    $.get(`${SERVER_URL}/search/${ctx.params.lat}/${ctx.params.lng}/${ctx.params.stops}/${ctx.params.distance}/`)
      .then(
        data => {
          JSON.parse(data.bar).restaurants.forEach(crawl => {
            let newCrawl = {
              res_id: crawl.restaurant.R.res_id,
              name: crawl.restaurant.name,
              address: crawl.restaurant.location.address,
              latitude: crawl.restaurant.location.latitude,
              longitude: crawl.restaurant.location.longitude,
              price_range: crawl.restaurant.price_range,
              rating: crawl.restaurant.user_rating.aggregate_rating,
              thumbnail: crawl.restaurant.thumb
            };
            Crawl.all.push(new Crawl(newCrawl));
          });
          JSON.parse(data.pub).restaurants.forEach(crawl => {
            let newCrawl = {
              res_id: crawl.restaurant.R.res_id,
              name: crawl.restaurant.name,
              address: crawl.restaurant.location.address,
              latitude: crawl.restaurant.location.latitude,
              longitude: crawl.restaurant.location.longitude,
              price_range: crawl.restaurant.price_range,
              rating: crawl.restaurant.user_rating.aggregate_rating,
              thumbnail: crawl.restaurant.thumb
            };
            Crawl.all.push(new Crawl(newCrawl));
          });});
    // err => console.error(err.status, err.statusText)});
    next();
  };
  module.Crawl = Crawl;

})(app);