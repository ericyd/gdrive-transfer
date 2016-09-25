/**
 * Set a flag in the userProperties store that will cancel the current transfer folder process 
 */
function setStopFlag() {
    return PropertiesService.getUserProperties().setProperty('stop', 'true');
}