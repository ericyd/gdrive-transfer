var $ = jQuery = require('jquery');


function transferFolder(folderId, folderName, folderArray, topFolderId) {
  
  google.script.run
    .withSuccessHandler(function(folderName) {            
        
        // decrements the counter so that copyFiles will fire only when all folders have been created
        counter = counter - 1;
        
        if (counter === 0) {
          document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<b>Done</b>';
          transferFiles(folderArray, topFolderId);
        }
    })
    .withFailureHandler(function(msg) {
      document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + "Failed to transfer folder.  This most likely occurred because you aren't the owner of one of the sub-folders";

      counter = counter - 1;
        
      if (counter === 0) {
        transferFiles(folderArray, topFolderId);
      }
    })
    .transferFolder(folderId, newOwner);
}