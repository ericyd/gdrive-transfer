/**
 * Try to transfer file to new owner.
 * Success:
 *   1. Log success in spreadsheet with file ID
 * Failure:
 *   1. Log error in spreadsheet with source ID
 * 
 * @param {Object} file File Resource with metadata from source file
 */

function transferFile(file, newOwner) {
    // TODO: get the active user and pass it to this function so I don't need to call this for every file
    if (DriveApp.getFileById(file.id).getOwner().getEmail() === Session.getActiveUser().getEmail() &&
        file.id !== PropertiesService.getUserProperties().getProperty('propertiesDocId')) {

        try {
            return Drive.Permissions.insert(
            {
                "role": "owner",
                "type": "user",
                "value": newOwner
            },
            file.id,
            {
                'sendNotificationEmails': 'false'
            });
        } catch (err) {
            log(null, [err.message, err.fileName, err.lineNumber]);
            return err;
        }
    }
    return {message: "you aren't the owner of this file/folder"};
}