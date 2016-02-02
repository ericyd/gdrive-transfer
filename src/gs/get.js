// Returns complete list of folders
function getFolders(folderId, folderArray, newOwner) {
  
  var startFolder = DriveApp.getFolderById(folderId);
  // adding the editor first makes sure that 
  // all the transferred folders are added to the right parent folder
  startFolder.addEditor(newOwner);
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