/* 
   This transfers ownership of all the files in a single function
   
   todo: maybe break up into each individual folder?
*/

var $ = jQuery = require('jquery');
require('../../node_modules/jquery-ui/effect-blind.js');
var getFolders = require('./getFolders');
var transferFolder = require('./transferFolder');

exports.files = function(folderId, folderArray) {
    
    var newOwner = getFolder.getNewOwner();
    
    
    
    $("#" + folderId).html("Transferring files <i class='fa fa-spinner fa-spin'></i>").addClass("disabled");
    
    
    
    google.script.run
      .withSuccessHandler(function() {
        // Respond to success conditions here
        $("#" + folderId).html("Complete").addClass("bg-success");
        
        if (folderArray.length > 0) {
          // Call with new folderArray
          transferFolder.transfer(folderArray);
          
        } else {
          // Done!
          $("#troubleshooting").show('blind');
          
        }
      })
      
      .withFailureHandler(function(msg) {
        // Generate error message
        var errorMsg = "<b>Error:</b> Failed to transfer files in one folder. The may be because you don't own all files, or because the folder contains a synced file (e.g. PDF, image, HTML file, etc.).<br /><b>Error message:</b> " + msg + ".";
        $("#errors").append("<div class='alert alert-danger' role='alert'>" + errorMsg + "</div>");
        
        if (folderArray.length > 0) {
          // Call with new folderArray
          transferFolder.transfer(folderArray);
          
        } else {
          // Done!
          $("#troubleshooting").show('blind');
          
        }
        
      })
      
      .transferFiles(folderId, newOwner);
}