/**
 * Returns array folderArray containing the top folder and all descendent folders
 * Each element of folderArray is a two-element array
 * The first element is {string} a folder ID, the second element is {string} the folder's path name
 * 
 *
 * @param {string} folderId identification string for top folder
 * @param {array} folderArray array whose elements are also arrays, 
 *    each one containing two elements: {string} a folder ID and {string} the folder path name
 * @param {string} newOwner email address identifying new owner of folder
 * @param {array} continuationTokens array of {string} continuation tokens to resume unfinished iterators
 *    
 */
function getFolders(folderId, folderArray, newOwner, continuationTokens) {
    
    var children,       // {FolderIterator}
        nextChild,      // {Folder}
        fullPath,       // {string}
        grandChildren,  // {FolderIterator}
        pair,           // {array}
        currTime,       // {number}
        timeIsUp,       // {boolean}
        results = [];   // {array}
    
    // Google Apps Scripts have a maximum execution time of 6 minutes
    var MAX_RUNNING_TIME = 5.7 * 60 * 1000;   // 5.7 minutes in milliseconds
    var startTime = (new Date()).getTime();
    
    
    
    // if no tokens exist, get iterator from @param folderId
    if (continuationTokens.length === 0) {
        
        // adding the editor first makes sure that 
        // all the transferred folders are added to the right parent folder
        children = DriveApp.getFolderById(folderId).addEditor(newOwner).getFolders();
                
    } else {
        
        children = DriveApp.continueFolderIterator( continuationTokens.pop() );
        
    }
    
    
    
    while ( children.hasNext() && !timeIsUp ) {
        
        // set variables for current iteration
        currTime = (new Date()).getTime();
        nextChild = children.next();
        grandChildren = nextChild.getFolders();
        fullPath = getFullPath("", nextChild.getId());
        fullPath = fullPath + nextChild.getName();
        pair = [];
        
        
        // create pair of (Id, path), then push the pair to folderArray
        pair.push(nextChild.getId());
        pair.push(fullPath);
        folderArray.push(pair);
        
        currTime = (new Date()).getTime();
        timeIsUp = (currTime - startTime >= MAX_RUNNING_TIME);
        
        
        // if child has children, save continuation token and begin iterating through children
        if ( grandChildren.hasNext() ) {
            
            continuationTokens.push( children.getContinuationToken() );
            
            children = grandChildren;
        
        // if no folders remain in iterator and continuationTokens exist, children = iterator of parent folder    
        } else if ( !children.hasNext() && continuationTokens.length > 0) {
            
            // traverse up the tree until an interator hasNext
            while ( !children.hasNext() ) {
            
                children = DriveApp.continueFolderIterator( continuationTokens.pop() );
            
            }
            
        }
        
    }
    
    
    
    if ( timeIsUp ) {
        
        continuationTokens.push( children.getContinuationToken() );
        
    }
    
    
    
    return results.push( folderArray, continuationTokens );
    
}










/**
 * Returns OAuth token for use with Google Picker
 */
function getOAuthToken() {
    return ScriptApp.getOAuthToken();
}