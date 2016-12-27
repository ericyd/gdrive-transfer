/**
 * Create document that is used to store temporary properties information when the app pauses.
 * Create document as plain text.
 * This will be deleted upon script completion.
 * 
 * @param {string} srcId - the ID of the source folder
 * @return {Object} metadata for the properties document, or error on fail.
 */
function createPropertiesDocument(srcId) {
    try {
        var propertiesDoc = DriveApp.getFolderById(srcId).createFile('DO NOT DELETE OR MODIFY - will be deleted after transferring completes', '', MimeType.PLAIN_TEXT);
        propertiesDoc.setDescription("This document will be deleted after the folder transfer is complete.  It is only used to store properties necessary to complete the transfer procedure");
        return propertiesDoc.getId(); 
    }
    catch(err) {
        return err.message;
    }
}
    