var $ = jQuery = require('jquery');

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