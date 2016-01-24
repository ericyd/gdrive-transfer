<!-- No need for jQuery here!-->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

<script>


$(document).ready(function() {
  $("#working").hide();
  $("#notes").hide();
  $("#status").hide();
  $("#troubleshooting").hide();
  $("#important").hide();
  $("#complete").hide();

});


  
// Global variables
var counter = 0;
var newOwner = "";
var folderArray = [];
   
/*
   This function gets the folderId from the sharing URL given from Google Drive
   It passes that ID to the getFolders
*/

document.getElementById("copyFolderButton").onclick = function() {
      
  /* First, parse the folder URL to get the folder ID */
       
  // Regular expression - find string beginning with "id="
  // http://www.w3schools.com/jsref/jsref_regexp_source.asp
  var regex = /id=/; 
       
  // Set a temporary variable to the value passed into the "folderId" field
  var fId = thisForm.folderId.value;
       
  // Get the index of the string at which the folderId starts
  var idStart = fId.search(regex);
  var foldersStart = fId.search("folders");
  if (idStart > 0) {
    // Slice the string starting 3 indices after "id=", which means that it takes away "id=" and leaves the rest
    fId = fId.slice(idStart+3);  
  } else if (foldersStart > 0) {
    fId = fId.slice(foldersStart + 8);  
  }
       
  // Find the ampersand in the remaining string, which is the delimiter between the folderId and the sharing privileges
  var amp = fId.indexOf("&");
       
  // Slice the string up to the ampersand
  if (amp > 0) {
    fId = fId.slice(0,amp);
  }
       
  // Set the folderId element within thisForm (retrieved from doGet) to the new, sliced fId variable
  thisForm.folderId.value = fId;
  
  $('#screen').css({"display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
  $('body').css({"overflow":"hidden"}); //default is "visible"
  $('#holdon').css({"display": "block"});
  
  getValues(thisForm);
}  



function getValues(thisForm) {  
  // Get values of folder Ids and pass them to other functions
  google.script.run
  .withSuccessHandler(function(results) {
    
    var startFolder = results[0];
         
    newOwner = results[1];
        
    var folderName = results[2];

    $('#holdon').css({"display": "none"}); 

    document.getElementById("dialog-confirm").innerHTML = '<p>You are about to transfer the folder "<b>' + folderName + '</b>" to the user "<b>' + newOwner + '</b>". Are you sure you would like to proceed?</p><p><b>NOTE: This cannot be undone</b>!</p>';
    
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height:300,
      modal: true,
      closeOnEscape: false,
      buttons: {
        "OK": function() {
          $("#description").hide("blind");
          $("#working").show("blind");
          $("#notes").show("blind");
          $("#status").show("blind");
    
          document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<br />Successfully got started transferring "' + folderName + '" to "' + newOwner + '".';
    
          getFolders(startFolder, folderArray, folderName, newOwner);
    
          $( this ).dialog( "close" );
          $('body').css({"overflow":"visible"}); //default is "visible"
          $('#screen').css({"display": "none"});
        },
        Cancel: function() {
          $('body').css({"overflow":"visible"}); //default is "visible"
          $('#screen').css({"display": "none"});
          $( this ).dialog( "close" );
          
        }
      }
    });
    
  })
  .withFailureHandler(function(msg) {
    // Respond to failure conditions here.
    document.getElementById("working").style.display = "none";
    $('#holdon').css({"display": "none"});
    $('body').css({"overflow":"visible"}); //default is "visible"
    $('#screen').css({"display": "none"});
    $("#notes").show();
    $("#status").show();
    document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<br />' + 'Failure: ' + msg;
  })
  .getValues( thisForm );
}






/* 
   This function gets all the sub-folders within your folder
   then loops through the array of returned folderIds and creates them
*/

function getFolders(folderId, folderArray, folderName, newOwner) { 
  // Add the top folder to the folderArray
  var pair = [];
  pair.push(folderId);
  pair.push(folderName);
  
  folderArray.push(pair);

  google.script.run
    // folderArray is an array of folderId strings
    .withSuccessHandler(function(folderArray) {

      // increments the counter of folders
      counter = folderArray.length;
      document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<br />Transferring folders ... ';
      
      // Iterate through the Folder Array
      for (i = 0; i < folderArray.length; i++) {
        transferFolder(folderArray[i][0], folderArray[i][1], folderArray, folderArray[0][0]);
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




/* 
   This function creates a folder in your Google Drive.
   folderId is the ID of the folder to be copied
   topFolderId is the new folder within GoogleDrive that the copy will be put into
*/

function transferFolder(folderId, folderName, folderArray, topFolderId) {
  
  google.script.run
    .withSuccessHandler(function(folderName) {            
        
        // decrements the counter so that copyFiles will fire only when all folders have been created
        counter = counter - 1;
        
        if (counter == 0) {
          document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + '<b>Done</b>';
          transferFiles(folderArray, topFolderId);
        }
    })
    .withFailureHandler(function(msg) {
      document.getElementById("notes").innerHTML = document.getElementById("notes").innerHTML + "Failed to transfer folder.  This most likely occurred because you aren't the owner of one of the sub-folders";

      counter = counter - 1;
        
      if (counter == 0) {
        transferFiles(folderArray, topFolderId);
      }
    })
    .transferFolder(folderId, newOwner);
}



/* 
   This copies all the files from each folder ID that has been appended to the fromIds and toIds arrays
*/

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
      .transferFiles(folderId, newOwner)
}



</script>



