/**
 * Created by eric on 5/18/16.
 */
/**
 * Find prior transfer folder instance.
 * Find propertiesDoc and logger spreadsheet, and save IDs to userProperties, which will be used by loadProperties.
 *
 * @param selectedFolder object containing information on folder selected in app
 * @returns {{spreadsheetId: string, destId: string, resuming: boolean}}
 */

function resume(selectedFolder) {

    var priorTransfer = findPriorTransfer(selectedFolder.srcId);

    setUserPropertiesStore(priorTransfer.spreadsheetId, priorTransfer.propertiesDocId, selectedFolder.newOwner, "true");

    return {
        spreadsheetId: priorTransfer.spreadsheetId,
        newOwner: selectedFolder.newOwner,
        resuming: true
    };
}