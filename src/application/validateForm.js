/**
 * Returns number of existing triggers for user.
 * @return {number} triggers the number of active triggers for this user
 */
function getTriggersQuantity() {
    var numberOfTriggers = ScriptApp.getProjectTriggers().length;
    var isShared = false;

    return {
        number: numberOfTriggers,
        isShared: isShared
    };
}