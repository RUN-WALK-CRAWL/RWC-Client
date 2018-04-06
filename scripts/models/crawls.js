'use strict';

//GLOBAL VARIABLES
var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'http:';
ENV.productionApiUrl = 'https://pub-crawl-codefellows.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = 'https://pub-crawl-codefellows.herokuapp.com';

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
    $.get(`${ENV.apiUrl}/search/${ctx.params.lat}/${ctx.params.lng}/${ctx.params.stops}/${ctx.params.price}`)
      .then( data => {
        Crawl.all = [];
        JSON.parse(data.pub).restaurants.forEach(crawl => Crawl.create(crawl));
        JSON.parse(data.bar).restaurants.forEach(crawl => Crawl.create(crawl));
        Crawl.filter(ctx);
        next(ctx);
      })
      .catch(err => console.error(err.status, err.statusText));
  };

  Crawl.create = crawl => {
    let image, rating;
    if(!crawl.restaurant.thumb) {image = 'http://tutaki.org.nz/wp-content/uploads/2016/04/no-image-available.png';}
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


  Crawl.calcDistance = (lat1, lat2, lng1, lng2) => {
    let x = lat2 - lat1;
    let y = lng2 - lng1;
    let distance = Math.sqrt(x*x + y*y);
    return distance;
  };

  Crawl.filter = (ctx) => {
    //SORT CRAWL.ALL BY DISTANCE USING ALGORITM??
    Crawl.all.sort();
    Crawl.all = Crawl.all.filter(crawl => crawl.price_range <= parseInt(ctx.params.price));
    Crawl.selected = [Crawl.all[0]];
    for (let i = 0; i < app.crawlCount-1; i++) {
      let distance1 = Crawl.calcDistance(Crawl.all[i].latitude, Crawl.all[i+1].latitude, Crawl.all[i].longitude, Crawl.all[i+1].longitude);
      let distance2 = Crawl.calcDistance(Crawl.all[i].latitude, Crawl.all[i+2].latitude, Crawl.all[i].longitude, Crawl.all[i+2].longitude);
      if (distance1 < distance2) {Crawl.selected.push(Crawl.all[i+1]);}
      else {
        Crawl.all.splice(i+1,1);
        i--;
      }
    }
    return Crawl.selected;

  };


  Crawl.saveRoute = (ctx, routeName) =>{
    console.log(`${ENV.apiUrl}/api/v1/crawls/${ctx.params.id}/${routeName}`);
    $.post(`${ENV.apiUrl}/api/v1/crawls/${ctx.params.id}/${routeName}`, ctx.params)
      .then(console.log("saved successfully!!"))
      .catch(console.error);
  };
  module.Crawl = Crawl;

})(app);
