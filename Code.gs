/***********************************************
doGet function required by Google Script Web App
***********************************************/

/**
 * Serves HTML of the application for HTTP GET requests.
 * If folderId is provided as a URL parameter, the web app will list
 * the contents of that folder (if permissions allow). Otherwise
 * the web app will list the contents of the root folder.
 *
 * @param {Object} e event parameter that can contain information
 *     about any URL parameters provided.
 */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
 
  template.thisForm = e.parameter.thisForm;
  
  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('Transfer ownership for a Google Drive folder')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}


/**
 * Get contents of folder and copy to new folder
 * If sub folders exist, it will recursively copy sub-folders too
 */

// Returns the values from the form for folderId and newOwner
function getValues(theForm) {
  var folderId = theForm.folderId;
  var folder = DriveApp.getFolderById(folderId);
  var folderName = folder.getName();
  var newOwner = theForm.newOwner;
  var results = [];
  results.push(folderId);
  results.push(newOwner);
  results.push(folderName);
  
  // adding the editor first makes sure that 
  // all the transferred folders are added to the right parent folder
  folder.addEditor(newOwner);
  
  return results;
}

// Returns complete list of folders
function getFolders(folderId, folderArray) {
  var startFolder = DriveApp.getFolderById(folderId);
  var folders = startFolder.getFolders();
  
  while (folders.hasNext()) {
    var nextFolder = folders.next();
    var fullPath = getFullPath("", nextFolder.getId());
    fullPath = fullPath + nextFolder.getName();
    var pair = [];
    pair.push(nextFolder.getId());
    pair.push(fullPath);
    folderArray.push(pair);
    
    if (nextFolder.getFolders().hasNext() ) {
      getFolders(nextFolder.getId(), folderArray);
    }
  }
  
  return folderArray;
}


// Transfers folder with folderId (string) to newOwner (string)
function transferFolder(folderId, newOwner) {
  var folder = DriveApp.getFolderById(folderId);
  var folderName = folder.getName();
  var activeUser = Session.getActiveUser().getEmail();
  
  // Only attempt to transfer if you own the file
  if (folder.getOwner().getEmail() == activeUser) {
    folder.setOwner(newOwner);
  }
  
  return folderName;
}


// Transfers files from folderId (string) to newOwner (string)
function transferFiles(folderId, newOwner) {
  var folder = DriveApp.getFolderById(folderId);
  var folderName = folder.getName();
  var files = folder.getFiles();
  var activeUser = Session.getActiveUser().getEmail();
  
  while (files.hasNext()) {
    var file = files.next();
     
    // Only attempt to transfer if you own the file
    if (file.getOwner().getEmail() == activeUser) {
      file.setOwner(newOwner);
    }
  } 
  
  return folderName;
}



// fullPath is a string that begins empty and gets appended 
function getFullPath(fullPath, folderId) {
  var parents = DriveApp.getFolderById(folderId).getParents();
  var parent = parents.next();
  
  if (parent.getName() != "My Drive") {
    fullPath = parent.getName() + " > " + fullPath;
    
    if (parent.getParents().hasNext()) {
      fullPath = getFullPath(fullPath, parent.getId());
    }
  }
  return fullPath;
}