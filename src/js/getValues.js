/*
  This function parses the submitted form values and passes them to getFolders()
*/

var $ = jQuery = require('jquery');
var picker = require('./picker');
var picker = require('./getFolders');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js');

// Global variables
var counter = 0;
   
/*
   This function gets the folderId from the sharing URL given from Google Drive
   It passes that ID to the getFolders
*/

exports.get = function() {  
  // validate form
  // todo: create validator
  
  // open confirmation modal
  $("#modal-message").html('<p>You are about to transfer the folder "<b>' + folderName + '</b>" to the user "<b>' + newOwner + '</b>". Are you sure you would like to proceed?</p><p><b>NOTE: This cannot be undone</b>!</p>');
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