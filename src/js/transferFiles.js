/* 
   This transfers ownership of all the files in a single function
   
   todo: maybe break up into each individual folder?
*/

var $ = jQuery = require('jquery');
require('../../node_modules/jquery-ui/effect-blind.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js');
var transferFolder = require('./transferFolder');

exports.files = function(folderId, folderArray) {
    
    var newOwner = $("#newOwner").val();
    
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
          $("#please-review").show('blind');
          $("#complete").show('blind');
          $("#status-title").html("Transfer of ownership complete");
          
        }
        
      })
      
      .withFailureHandler(function(msg) {
          
        $("#" + folderId).html("Complete").addClass("bg-success");
        
        if ($("#errors").text() == "") {
            // Generate error message
            var errorMsg = "<b>Error:</b> Failed to transfer one or more files. The may be because you don't own all files, or because the folder contains a synced file (e.g. PDF, image, HTML file, etc.).<br /><b>Error message:</b> " + msg + ".";
            $("#errors").append("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + errorMsg + "</div>");
        }
        
        if (folderArray.length > 0) {
          // Call with new folderArray
          transferFolder.transfer(folderArray);
          
         
         
        } else {
          // Done!
          $("#troubleshooting").show('blind');
          $("#please-review").show('blind');
          $("#complete").show('blind');
          $("#status-title").html("Transfer of ownership complete");
          
        }
        
      })
      
      .transferFiles(folderId, newOwner);
}