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