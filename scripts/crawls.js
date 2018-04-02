'use strict';

const SERVER_URL = 'http://localhost:3000';

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
    data => console.log(data),
    err => console.error(err.status, err.statusText));