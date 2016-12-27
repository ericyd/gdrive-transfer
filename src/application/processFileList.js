/**
 * Loops through array of files.items,
 * Applies Drive function to each (i.e. transfer),
 * Logs result,
 * Get current runtime and decide if processing needs to stop. 
 * 
 * @param {Array} items the list of files over which to iterate
 */
function processFileList(items, newOwner, timeZone, userProperties, timers, ss) {
    var item;
    var newPermissions;
    
    while (items.length > 0 && !timers.timeIsUp && !timers.stop) {
        /*****************************
         * Get next file from passed file list.
         */
        item = items.pop();
        


        /*****************************
         * Transfer each (files and folders are both represented the same in Google Drive)
         */
        if (item.mimeType == "application/vnd.google-apps.document" ||
            item.mimeType == "application/vnd.google-apps.folder" ||
            item.mimeType == "application/vnd.google-apps.spreadsheet" ||
            item.mimeType == "application/vnd.google-apps.presentation" ||
            item.mimeType == "application/vnd.google-apps.drawing" ||
            item.mimeType == "application/vnd.google-apps.form" ||
            item.mimeType == "application/vnd.google-apps.script" ) {
                newPermissions = transferFile(item, newOwner);
                /*****************************
                 * Log result
                 */
                log(ss, [
                    !newPermissions.message ? "Transferred" : "Error, " + newPermissions.message,
                    item.title,
                    '=HYPERLINK("https://drive.google.com/open?id=' + item.id + '","'+ item.title + '")',
                    item.id,
                    Utilities.formatDate(new Date(), timeZone, "MM-dd-yy hh:mm:ss aaa")
                ]);

                cleanUpParents(item);

        // skip all steps if it isn't a 'native' google file; log that the file was skipped
        } else {
                log(ss, [
                    'Skipped, cannot transfer this file type',
                    item.title,
                    '=HYPERLINK("https://drive.google.com/open?id=' + item.id + '","'+ item.title + '")',
                    item.id,
                    Utilities.formatDate(new Date(), timeZone, "MM-dd-yy hh:mm:ss aaa")
                ]);
        }

        if (item.mimeType == "application/vnd.google-apps.folder") {
            properties.remaining.push(item.id);
        }


        /*****************************
         * Update current runtime and user stop flag
         */
        timers.update(userProperties);
    }
}
