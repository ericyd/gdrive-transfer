/*
    This script transfers a single folder
    
    Basic process:
    Get a folder ID and name from folderArray via shift()
    Pass that to google.script.run.transferFolder()
    On success, pass the same ID and Name to transferFiles()
    When transferFiles completes, send the new array, post-shift(), back to transferFolders
    
*/


var $ = jQuery = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js');
var transferFiles = require('./transferFiles');

exports.transfer = function (folderArray) {
  
  var newOwner = $("#newOwner").val();
  var pair = folderArray.shift();
  var folderId = pair[0];  
  
  
  $("#" + folderId).html("Transferring folder <i class='fa fa-spinner fa-spin'></i>").addClass("disabled");
  
  
  
  google.script.run
    .withSuccessHandler(function() {            
      
      // If transfer was successful, transferFiles for folder
      transferFiles.files(folderId, folderArray);
      
    })
    .withFailureHandler(function(msg) {
      
      // If transfer failed, generate error message and still transferFiles for folder
      var errorMsg = "<b>Error:</b> Failed to transfer folder.  This most likely occurred because you aren't the owner of one of the sub-folders.<br /><b>Error message:</b> " + msg + ".";
      $("#errors").append("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + errorMsg + "</div>");
        
      transferFiles.files(folderId, folderArray);
      
    })
    
    .transferFolder(folderId, newOwner);
};