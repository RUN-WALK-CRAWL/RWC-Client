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

