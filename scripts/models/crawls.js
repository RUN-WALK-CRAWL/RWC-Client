'use strict';

//GLOBAL VARIABLES
var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'insert cloud API server URL here';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function Crawl(object) {
    this.res_id = object.res_id;
    this.name = object.name;
    this.address = object.address;
    this.latitude = object.latitude;
    this.longitude = object.longitude;
    this.price_range = object.price_range;
    this.price = object.price;
    this.rating = object.rating;
    this.thumbnail = object.thumbnail;
  }

  Crawl.prototype.toHtml = function() {
    let template = Handlebars.compile($('#list-template').text());
    return template(this);
  };

  Crawl.all = [];
  Crawl.selected = [];

  Crawl.search = (ctx, next) => {
    console.log('searching...');
    $.get(`${ENV.apiUrl}/search/${ctx.params.lat}/${ctx.params.lng}/${ctx.params.stops}/${ctx.params.distance}/`)
      .then( data => {
        JSON.parse(data.pub).restaurants.forEach(crawl => Crawl.create(crawl));
        JSON.parse(data.bar).restaurants.forEach(crawl => Crawl.create(crawl));
        Crawl.filter();
        next();
      })
      .catch(err => console.error(err.status, err.statusText));
  };

  Crawl.create = crawl => {
    let image, rating;
    if(!crawl.restaurant.thumb) {image = 'http://via.placeholder.com/200x200';}
    else {image = crawl.restaurant.thumb;}

    if(crawl.restaurant.user_rating.aggregate_rating === '0') {rating = 'No Reviews';}
    else {rating = crawl.restaurant.user_rating.aggregate_rating;}
    let newCrawl = {
      res_id: crawl.restaurant.R.res_id,
      name: crawl.restaurant.name,
      address: crawl.restaurant.location.address,
      latitude: crawl.restaurant.location.latitude,
      longitude: crawl.restaurant.location.longitude,
      price_range: crawl.restaurant.price_range,
      price: '$'.repeat(crawl.restaurant.price_range),
      rating: rating,
      thumbnail: image
    };
    Crawl.all.push(new Crawl(newCrawl));
  };

  Crawl.filter = () => {
    //SORT CRAWL.ALL BY DISTANCE USING ALGORITM??
    // Crawl.all.sort();

    Crawl.selected = Crawl.all.slice(0, app.crawlCount);
  };

  Crawl.saveRoute = crawl =>
    $.post(`${ENV.apiUrl}/api/v1/crawls`, crawl)
      .then(() => {})
      .catch();

  module.Crawl = Crawl;

})(app);