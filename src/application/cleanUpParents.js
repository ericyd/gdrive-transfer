
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
    Logger.log('cleaing reference to root parent');
    var rootID;

    for (i = 0; i < file.parents.length; i++) {
        if (file.parents[i].isRoot) {
            rootID = file.parents[i].id;
        }
    }

    try {
        Drive.Files.patch(
            {},
            file.id,
            {
                'removeParents': rootID
            }
        );

    } catch (e) {
        Logger.log(e);
    }
}