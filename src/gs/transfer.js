/**
 * Transfers single folder to new owner
 *
 * @param {string} folderId identifier of folder to transfer
 * @param {string} newOwner email address of new owner
 */
function transferFolder(folderId, newOwner) {
  var folder = DriveApp.getFolderById(folderId);
  var activeUser = Session.getActiveUser().getEmail();
  
  // Only attempt to transfer if you own the file
  if (folder.getOwner().getEmail() == activeUser) {
    folder.setOwner(newOwner);
  }
  
  return;
}

/**
 * Transfers all files within a folder to new owner
 *
 * @param {string} folderId identifier of folder with files to transfer
 * @param {string} newOwner email address of new owner
 */
function transferFiles(folderId, newOwner) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var activeUser = Session.getActiveUser().getEmail();
  
  while (files.hasNext()) {
    var file = files.next();
     
    // Only attempt to transfer if you own the file
    if (file.getOwner().getEmail() == activeUser) {
      file.setOwner(newOwner);
    }
  } 
  
  return;
}