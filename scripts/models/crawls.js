'use strict';

//GLOBAL VARIABLES
var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'insert cloud API server URL here';
ENV.developmentApiUrl = 'insert local API server URL here';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

const SERVER_URL = 'http://localhost:3000';



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

Crawl.create = crawl =>
    $.post(`${ENV.apiUrl}/api/v1/crawls`, crawl)
      .then(() => {})
      .catch();

Crawl.search = (event) => {
  event.preventDefault();
  console.log('searching...');
  $.get(`${SERVER_URL}/search`)
    // { count: '10',
    //     lat: '47.608013',
    //     lon: '-122.335167',
    //     radius: '100',
    //     establishment_type: 283,
    //     category: 11,
    //     sort: 'real_distance',
    //     order: 'asc'
    //   })
    .then(
      data =>JSON.parse(data).restaurants.forEach(crawl => console.log(
        ` Id: ${[crawl.restaurant.R.res_id]}
            Name: ${crawl.restaurant.name}
            Address: ${crawl.restaurant.location.address}
            Latitude: ${crawl.restaurant.location.latitude}
            Longitude: ${crawl.restaurant.location.longitude}
            Price Range: ${crawl.restaurant.price_range}
            Rating: ${crawl.restaurant.user_rating.aggregate_rating}
            Thumbnail: ${crawl.restaurant.thumb}`)),
      err => console.error(err.status, err.statusText));

};
