/*
  This contains all the initialization code and event bindings
*/

var $ = jQuery = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js');
require('../../node_modules/jquery-ui/effect-blind.js');
var getValues = require('./getValues');

$(document).ready(function() {
  $("#working").hide();
  $("#notes").hide();
  $("#status").hide();
  $("#troubleshooting").hide();
  $("#important").hide();
  $("#complete").hide();

});