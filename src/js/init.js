/*
  This contains all the initialization code and event bindings
*/

var $ = jQuery = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js');
require('../../node_modules/jquery-ui/effect-blind.js');
var getValues = require('./getValues');
var picker = require('./picker');

$(document).ready(function() {
  $("#status").hide();
  $("#troubleshooting").hide();
  $("#complete").hide();
});

$("#thisForm").submit(function( event ) {
  // Bootstrap button action binding
  var $btn = $("#transferFolderButton").button('loading');
  $("#description").hide("blind");
  $("#status").show("blind");
  getValues.get();
  event.preventDefault();
});

$("#selectFolderButton").click(function() {
  picker.showPicker();
})

$("#confirm-button").click(function() {
  getValues.confirm();
})