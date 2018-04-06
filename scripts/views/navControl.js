'use strict';

$( document ).ready(function() {
  $( '.menu' ).hide();
  $( '.hamburger' ).click(function() {
    $( '.menu' ).slideToggle( 'slow', function() {
    });
  });
  $( '.cross' ).click(function() {
    $( '.menu' ).slideToggle( 'slow', function() {
      $( '.hamburger' ).show();
    });
  });
});

$(document).on('click', '.card', function () {
  $(this).toggleClass('hover');
});

$('#logout').on('click', () => {
  localStorage.token = false;
  localStorage.user_id = 0;
  app.crawlView.initHomePage();
});