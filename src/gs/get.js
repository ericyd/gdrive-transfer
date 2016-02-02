// Returns complete list of folders
function getFolders(folderId, folderArray, newOwner) {
  
  var startFolder = DriveApp.getFolderById(folderId);
  // adding the editor first makes sure that 
  // all the transferred folders are added to the right parent folder
  startFolder.addEditor(newOwner);
  var folders = startFolder.getFolders();
  
  
  // iterate through children
  while (folders.hasNext()) {
    
    // get next folder from iterator, and retrieve its path
    var nextFolder = folders.next();
    var fullPath = getFullPath("", nextFolder.getId());
    fullPath = fullPath + nextFolder.getName();
    var pair = [];
    
    // push the Id, then the path, then push the pair to folderArray
    pair.push(nextFolder.getId());
    pair.push(fullPath);
    folderArray.push(pair);
    
    // if child has children, recurse
    if (nextFolder.getFolders().hasNext() ) {
      getFolders(nextFolder.getId(), folderArray, newOwner);
    }
  }
  
  return folderArray;
}