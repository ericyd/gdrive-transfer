/*
  This function parses the submitted form values and passes them to getFolders()
*/

var $ = jQuery = require('jquery');
var picker = require('./picker');
var getFolders = require('./getFolders');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js');

/*
   This function gets the folderId from the sharing URL given from Google Drive
   It passes that ID to the getFolders
*/

exports.get = function() {  
  // validate form
  // todo: create validator
  
  var newOwner = $("#newOwner").val();
  
  // open confirmation modal
  // if confirmed via modal, send to getFolders (binding in init.js)
  // if cancelled via modal, quit
  $("#newOwnerEmail").text(newOwner);
  $('#modal-confirm').modal({
    keyboard: false,
    show: true
  });
  
};

exports.confirm = function() {
  // When confirmed, hide description
  
  // Bootstrap button action binding
  var $btn = $("#transferFolderButton").button('loading');
  $("#description").hide("blind");
  $("#status").show("blind");
  $("#newOwner").prop('disabled', true);
  
  
  // Initialize transfer
  var selectedFolder = picker.getSelectedFolder();
  
  getFolders.run(selectedFolder);
  
};