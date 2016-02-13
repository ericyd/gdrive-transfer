var $ = jQuery = require('jquery');
var transferFolder = require('./transferFolder');
/* 
    This function retrieves the folders as an array and 
    passes them to transferFolder individually
   
    Note: order doesn't matter, as long as the top folder is transferred first
    the folder structure is not affected in this process, so no need to preserve hierarchy of folders while calling the function
*/

exports.run = collectInfo();

function collectInfo(selectedFolder) {
  
  var folderArray = [];
  var newOwner = $("#newOwner").val();
  var folderId = selectedFolder.id;
  
  
  // Add the top folder to the folderArray
  var pair = [folderId, selectedFolder.name];
  folderArray.push(pair);
  
  
  return getFolders(folderId, folderArray, newOwner, []);
  
}

function getFolders(folderId, folderArray, newOwner, continuationTokens) { 
  google.script.run
    
    .withSuccessHandler(function(results) {
      
      // folderArray is an array of arrays
      // each element of folderArray has 2 elements
      // the first element is the folder ID
      // the second element is a string representing the folder path
      var folderArray = results[0];
      var continuationTokens = results[1];
      
      // if any continuation tokens exist, recurse
      if ( continuationTokens.length !== 0 ) {
        
        getFolders(folderId, folderArray, newOwner, continuationTokens);
      
      // process data and pass to transferFolder  
      } else {
        
        var topFolderId = folderArray[0][0];
        $("#troubleshooting").append("<a href='https://drive.google.com/open?id=" + topFolderId + "' target='_blank'>https://drive.google.com/open?id=" + topFolderId + "</a>")
        
  
        // Update status for user
        $("#status-title").html("Transferring folders <i class='fa fa-spinner fa-spin'></i>");
        
        
        // build status-table rows
        var statusTable;
        
        for (i = 0; i < folderArray.length; i++) {
  
          statusTable = "";
          statusTable += "<tr>";
          statusTable += "<td>" + folderArray[i][1] + "</td>"; // path
          statusTable += "<td id='" + folderArray[i][0] + "'><i>Waiting...</i></td>"; // id
          statusTable += "</tr>";
  
          $(statusTable).hide().appendTo("#status-table").show('blind');
  
        }
        
        transferFolder.transfer(folderArray);
        
        return;
        
      }
      
      
    })
    .withFailureHandler(function(msg) {
      var errormsg = "<div class='alert alert-danger' role='alert'><b>Error:</b> There was an error retrieving folder structure.<br />";
      errormsg += "<b>Error message:</b> " + msg + ".<br>";
      errormsg += "Please try again. Make sure you have correct permissions to transfer this folder, and that you are using Google Chrome or Chromium</div>";
      $("#errors").append(errormsg);
      $("#status-title").html("Error");
      
    })
    .getFolders(folderId, folderArray, newOwner, []);
}