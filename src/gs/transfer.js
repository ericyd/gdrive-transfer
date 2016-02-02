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