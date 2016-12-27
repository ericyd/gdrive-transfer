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
        


        // TODO: this app won't make a new copy, so there won't be a new file returned.  Log the results in a different way
        /*****************************
         * Transfer each (files and folders are both represented the same in Google Drive)
         */
        newPermissions = transferFile(item, newOwner);

        if (item.mimeType == "application/vnd.google-apps.folder") {
            properties.remaining.push(item.id);
        }

        cleanUpParents(item);

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




        /*****************************
         * Update current runtime and user stop flag
         */
        timers.update(userProperties);
    }
}

/**
 * There is an issue in Google Drive where it will create references in My Drive
 * to every file that has been transferred to you
 * https://productforums.google.com/forum/#!topic/drive/ohL9YQarCec
 * 
 * This function removes parents if they are the root drive.
 * Since this doesn't get called for the top-level folder (which is transferred in initialize()),
 * this will only happen for child folders and files
 */

function cleanUpParents(file) {
    var numParents = file.parents.length;
    var indexOfRoot;

    if (numParents > 1) {
        for (i = 0; i < numParents; i++) {
            if (file.parents[i].isRoot) {
                indexOfRoot = i;
            }
        }
        file.parents.splice(index, 1);
    }
}