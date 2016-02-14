/*
  This contains all the initialization code and event bindings
*/

var $ = jQuery = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js');
require('../../node_modules/jquery-ui/effect-blind.js');
var getValues = require('./getValues');
var picker = require('./picker');

$(function() {
  $("#status").hide();
  $("#troubleshooting").hide();
  $("#complete").hide();
  $("#please-review").hide();
  $("#newOwner").prop('disabled', false);
});

$("#thisForm").submit(function( event ) {
  getValues.get();
  event.preventDefault();
});

$("#selectFolderButton").click(function() {
  picker.showPicker();
});

$("#confirm-button").click(function() {
  getValues.confirm();
});