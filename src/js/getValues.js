/*
  This function parses the submitted form values and passes them to getFolders()
*/

var $ = jQuery = require('jquery');
var picker = require('./picker');
var picker = require('./getFolders');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js');

/*
   This function gets the folderId from the sharing URL given from Google Drive
   It passes that ID to the getFolders
*/

exports.get = function() {  
  // validate form
  // todo: create validator
  
  // open confirmation modal
  $("#newOwnerEmail").text(newOwner);
  $('#modal-confirm').modal({
    keyboard: false,
    show: true
  });
  
  // if confirmed via modal, send to getFolders
  // if cancelled via modal, quit
  
};

exports.confirm = function() {
  var selectedFolder = picker.getSelectedFolder();
  
  getFolders.run(selectedFolder);
  
}