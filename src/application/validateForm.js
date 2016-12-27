/**
 * Returns number of existing triggers for user.
 * @return {number} triggers the number of active triggers for this user
 */
function validateForm(selectedFolder) {
    var numberOfTriggers = ScriptApp.getProjectTriggers().length;
    var isShared = isEmailInEditors(selectedFolder.srcId, selectedFolder.newOwner);

    return {
        number: numberOfTriggers,
        isShared: isShared
    };
}

function isEmailInEditors(fileId, email) {
    var editors = DriveApp.getFileById(fileId).getEditors();
    var viewers = DriveApp.getFileById(fileId).getViewers();
    var i;
    for (i = 0; i < editors.length; i++) {
        if (editors[i].getEmail() === email) return true;
    }

    for (i = 0; i < viewers.length; i++) {
        if (viewers[i].getEmail() === email) return true;
    }

    return false;
}