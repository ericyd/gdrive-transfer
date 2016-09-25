/**
 * save srcId, destId, spreadsheetId to userProperties.
 * 
 * This is used when resuming, in which case the IDs of the logger spreadsheet and 
 * properties document will not be known.
 */
function setUserPropertiesStore(spreadsheetId, propertiesDocId, newOwner, resuming) {
    var userProperties = PropertiesService.getUserProperties();
    // TODO: remove destId from this, add newOwner
    userProperties.setProperty("newOwner", newOwner);
    userProperties.setProperty("spreadsheetId", spreadsheetId);
    userProperties.setProperty("propertiesDocId", propertiesDocId);
    userProperties.setProperty("trials", 0);
    userProperties.setProperty("resuming", resuming);
    userProperties.setProperty('stop', 'false');
} 