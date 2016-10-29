/**
 * Loops through array of files.items,
 * Applies Drive function to each (i.e. transfer),
 * Logs result,
 * Get current runtime and decide if processing needs to stop. 
 * 
 * @param {Array} items the list of files over which to iterate
 */
function processFileList(items, newOwner, timeZone, userProperties, timers, ss) {
    var item
      , newPermissions;
    
    while (items.length > 0 && !timers.timeIsUp && !timers.stop) {
        /*****************************
         * Get next file from passed file list.
         */
        item = items.pop();
        


        // TODO: this app won't make a new copy, so there won't be a new file returned.  Log the results in a different way
        /*****************************
         * Transfer each (files and folders are both represented the same in Google Drive)
         */
        newPermissions = transferFile(item, newOwner);




        /*****************************
         * Log result
         */
        log(ss, [
            !newPermissions.message ? "Transferred" : "Error, " + newPermissions,
            item.title,
            '=HYPERLINK("https://drive.google.com/open?id=' + item.id + '","'+ item.title + '")',
            item.id,
            Utilities.formatDate(new Date(), timeZone, "MM-dd-yy hh:mm:ss aaa")
        ]);




        /*****************************
         * Update current runtime and user stop flag
         */
        timers.update(userProperties);
    }
}