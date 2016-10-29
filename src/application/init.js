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
  
  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('Transfer a Google Drive folder')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}


/**
 * Initialize destination folder, logger spreadsheet, and properties doc.
 * Build/add properties to selectedFolder so it can be saved to the properties doc.
 * Set UserProperties values and save properties to propertiesDoc.
 * Add link for destination folder to logger spreadsheet.
 * Return IDs of created destination folder and logger spreadsheet
 * 
 * @param {object} selectedFolder contains srcId, srcParentId, newOwner, srcName
 */
function initialize(selectedFolder) {

    /*****************************
     * Declare variables used in project initialization 
     */
    var spreadsheet,    // {Object} instance of Spreadsheet class
        propertiesDocId,  // {Object} metadata for Google Document created to hold properties
        today = Utilities.formatDate(new Date(), "GMT-5", "MM-dd-yyyy"); // {string} date of transfer
    

    /*****************************
     * Create Files used in transfer process
     */
    spreadsheet = createLoggerSpreadsheet(today, selectedFolder.srcId);

    propertiesDocId = createPropertiesDocument(selectedFolder.srcId);

    

    
    /*****************************
     * Build/add properties to selectedFolder so it can be saved to the properties doc
     */
    // selectedFolder.destId = destFolder.id;
    selectedFolder.spreadsheetId = spreadsheet.id;
    selectedFolder.propertiesDocId = propertiesDocId;
    selectedFolder.leftovers = {}; // {Object} FileList object (returned from Files.list) for items not processed in prior execution (filled in saveState)
    selectedFolder.remaining = [selectedFolder.srcId];

    
    

    /*****************************
     * Set UserProperties values and save properties to propertiesDoc
     */
    setUserPropertiesStore(selectedFolder.spreadsheetId, selectedFolder.propertiesDocId, selectedFolder.newOwner, "false");
    saveProperties(selectedFolder);




    /*****************************
     * Add link to folder in logger spreadsheet
     */
    SpreadsheetApp.openById(spreadsheet.id).getSheetByName("Log").getRange(2,5).setValue('=HYPERLINK("https://drive.google.com/open?id=' + selectedFolder.srcId + '","'+ selectedFolder.srcName + '")');
    

    

    /*****************************
     * Return IDs of created destination folder and logger spreadsheet
     */
    return {
        spreadsheetId: selectedFolder.spreadsheetId,
        newOwner: selectedFolder.newOwner,
        resuming: false
    };
    
}


