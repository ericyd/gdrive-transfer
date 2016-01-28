/* 
   This transfers ownership of all the files from each folder ID
*/

var $ = jQuery = require('jquery');


function transferFiles(folderArray, topFolderId) {
    
    var pair = folderArray.shift();
    var folderId = pair[0];
    var folderName = pair[1];
    
    document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<br />Transferring files in "' + folderName + '" ... ';
    
    google.script.run
      .withSuccessHandler(function(folderName) {
        // Respond to success conditions here.
        document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<b>Done</b>';
        
        if (folderArray.length > 0) {
          transferFiles(folderArray, topFolderId);
        } else {
          document.getElementById("working").style.display = "none";
          document.getElementById("complete").style.display = "block";
          document.getElementById("troubleshooting").innerHTML = document.getElementById("troubleshooting").innerHTML + "<a href='https://drive.google.com/open?id=" + topFolderId + "' target='_blank'>https://drive.google.com/open?id=" + topFolderId + "</a>";
          document.getElementById("troubleshooting").style.display = "block";
        }
      })
      .withFailureHandler(function(msg) {
        // Respond to failure conditions here.
        document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + "Failed to transfer files in one folder. The may be because you don't own all files, or because the folder contains a synced file (e.g. PDF, image, HTML file, etc.)";
        
        if (folderArray.length > 0) {
          transferFiles(folderArray, topFolderId);
        } else {
          document.getElementById("working").style.display = "none";
          document.getElementById("complete").style.display = "block";
          document.getElementById("troubleshooting").innerHTML = document.getElementById("troubleshooting").innerHTML + "<a href='https://drive.google.com/open?id=" + topFolderId + "' target='_blank'>https://drive.google.com/open?id=" + topFolderId + "</a>";
          document.getElementById("troubleshooting").style.display = "block";
          
        }
        
      })
      .transferFiles(folderId, newOwner);
}