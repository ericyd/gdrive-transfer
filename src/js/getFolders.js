var $ = jQuery = require('jquery');
var transferFolder = require('./transferFolder');
/* 
   This function retrieves the folders as an array and 
   passes them to transferFolder individually
*/

exports.run = function(selectedFolder) { 
  var folderArray = [];
  var newOwner = theForm.newOwner.value;
  
  var folderId = selectedFolder.id;
      
  var folderName = selectedFolder.name;
  
  
  // Add the top folder to the folderArray
  var pair = [];
  pair.push(folderId);
  pair.push(folderName);
  
  folderArray.push(pair);

  google.script.run
    // folderArray is an array of folderId strings
    .withSuccessHandler(function(folderArray) {

      // increments the counter of folders
      var counter = folderArray.length;
      document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<br />Transferring folders ... ';
      
      // Iterate through the Folder Array
      for (i = 0; i < folderArray.length; i++) {
        transferFolder.transfer(folderArray[i][0], folderArray[i][1], folderArray, folderArray[0][0]);
      }
    })
    .withFailureHandler(function(msg) {
      document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<br />' + 'failed getting sub-folders: ' + msg;
      
      // increments the counter of folders
      counter = folderArray.length;
      
      // Iterate through the Folder Array
      for (i = 0; i < folderArray.length; i++) {
        transferFolder(folderArray[i][0], folderArray[i][1], folderArray, folderArray[0][0]);
      }
      
    })
    .getFolders(folderId, folderArray, newOwner);
}