/* 
   This transfers ownership of all the files in a single function
   
   todo: maybe break up into each individual folder?
*/

var $ = jQuery = require('jquery');
require('../../node_modules/jquery-ui/effect-blind.js');

exports.files = function(folderArray, topFolderId) {
    
    var pair = folderArray.shift();
    var folderId = pair[0];
    var folderName = pair[1];
    
    $("#" + folderId).html("Transferring files <i class='fa fa-spinner fa-spin'></i>").addClass("disabled");
    
    google.script.run
      .withSuccessHandler(function(folderName) {
        // Respond to success conditions here
        $("#" + folderId).html("Complete").addClass("bg-success");
        
        if (folderArray.length > 0) {
          // Recurse
          transferFiles(folderArray, topFolderId);
        } else {
          // Done!
          $("#troubleshooting").append("<a href='https://drive.google.com/open?id=" + topFolderId + "' target='_blank'>https://drive.google.com/open?id=" + topFolderId + "</a>").show('blind');
        }
      })
      .withFailureHandler(function(msg) {
        // Respond to failure conditions here.
        var errorMsg = "<b>Error:</b> Failed to transfer files in one folder. The may be because you don't own all files, or because the folder contains a synced file (e.g. PDF, image, HTML file, etc.).<br /><b>Error message:</b> " + msg + ".";
        $("#errors").append("<div class='alert alert-danger' role='alert'>" + errorMsg + "</div>");
        
        if (folderArray.length > 0) {
          // Recurse
          transferFiles(folderArray, topFolderId);
        } else {
          // Done!
          $("#troubleshooting").append("<a href='https://drive.google.com/open?id=" + topFolderId + "' target='_blank'>https://drive.google.com/open?id=" + topFolderId + "</a>").show('blind');
        }
        
      })
      .transferFiles(folderId, newOwner);
}