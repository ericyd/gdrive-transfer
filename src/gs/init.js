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