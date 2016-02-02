var $ = jQuery = require('jquery');
var transferFolder = require('./transferFolder');
/* 
    This function retrieves the folders as an array and 
    passes them to transferFolder individually
   
    Note: order doesn't matter, as long as the top folder is transferred first
    the folder structure is not affected in this process, so no need to preserve hierarchy of folders while calling the function
*/

var newOwner;

exports.getNewOwner = function() {
  return newOwner;
}

exports.run = function(selectedFolder) { 
  var folderArray = [];
  newOwner = theForm.newOwner.value;
  
  var folderId = selectedFolder.id;
      
  var folderName = selectedFolder.name;
  
  
  // Add the top folder to the folderArray
  var pair = [];
  pair.push(folderId);
  pair.push(folderName);
  
  folderArray.push(pair);

  google.script.run
    // folderArray is an array of arrays
    // each element of folderArray has 2 elements
    // the first element is the folder ID
    // the second element is a string representing the folder path
    .withSuccessHandler(function(folderArray) {
      var topFolderId = folderArray[0][0];
      $("#troubleshooting").append("<a href='https://drive.google.com/open?id=" + topFolderId + "' target='_blank'>https://drive.google.com/open?id=" + topFolderId + "</a>")
      
      
      
      
      // Update status for user
      $("#status-title").html("Transferring folders <i class='fa fa-spinner fa-spin'></i>");
      
      // build status-table rows
      var statusTable = "";
      for (i = 0; i < folderArray.length; i++) {

        statusTable += "<tr>";
        // path
        statusTable += "<td>" + folderArray[i][1] + "</td>";
        // id
        statusTable += "<td id='" + folderArray[i][0] + "'><i>Waiting...</i></td>";
        statusTable += "</tr>";

        $(statusTable).hide().appendTo("#status-table").show('blind');

      }
      
      transferFolder.transfer(folderArray);
      
      
    })
    .withFailureHandler(function(msg) {
      var errormsg = "<div class='alert alert-danger' role='alert'><b>Error:</b> There was an error creating folder structure.<br />";
      errormsg += "<b>Error message:</b> " + msg + ".<br>";
      errormsg += "Please try again. Make sure you have correct permissions to copy this folder, and please input the entire sharing URL, not just the folder ID</div>";
      $("#errors").append(errormsg);
      $("#status-title").html("Error");
      
    })
    .getFolders(folderId, folderArray, newOwner);
}