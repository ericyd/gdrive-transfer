/**
 * Create the spreadsheet used for logging progress of the transfer
 * 
 * @param {string} today - Stringified version of today's date
 * @param {string} srcId - ID of the source folder
 * 
 * @return {Object} metadata for logger spreadsheet, or error on fail 
 */
function createLoggerSpreadsheet(today, srcId) {
    try {
        return Drive.Files.copy(
            {
            "title": "Transfer Folder Log " + today,
            "parents": [
                {
                    "kind": "drive#fileLink",
                    "id": srcId
                }
            ]
            },
            "1hJP-sjo9416KO965r9IMhJGRDkmZuGrtpOb8T_F950g"
        );   
    }
    catch(err) {
        return err.message;
    }
}