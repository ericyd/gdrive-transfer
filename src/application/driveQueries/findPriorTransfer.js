/**
 * Created by eric on 5/18/16.
 */
/**
 * Returns transfer log ID and properties doc ID from a paused folder transfer.
 */
function findPriorTransfer(folderId) {
    // find DO NOT MODIFY OR DELETE file (e.g. propertiesDoc)
    var query = "'" + folderId + "' in parents and title contains 'DO NOT DELETE OR MODIFY' and mimeType = 'text/plain'";
    var p = Drive.Files.list({
        q: query,
        maxResults: 1000,
        orderBy: 'modifiedDate,createdDate'

    });


    // find transfer log
    query = "'" + folderId + "' in parents and title contains 'Transfer Folder Log' and mimeType = 'application/vnd.google-apps.spreadsheet'";
    var s = Drive.Files.list({
        q: query,
        maxResults: 1000,
        orderBy: 'title desc'
    });

    return {
        'spreadsheetId': s.items[0].id,
        'propertiesDocId': p.items[0].id
    };
}