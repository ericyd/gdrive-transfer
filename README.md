Google Drive Transfer Ownership
==================


This is a Google Drive Web app hosted at the [Chrome Web Store](https://chrome.google.com/webstore/detail/transfer-ownership/ndbdlpeegehlbhgnpifancfbnnehoofa). 
This app will transfer ownership of a Google Drive folder, including ownership of all sub-folders and files.  This extends the normal Google Drive functionality because Google Drive only allows you to transfer folders or files one at a time.  Transferring ownership of a parent folder, for example, does not transfer ownership of the children files and folders.  This app fills that gap by recursively transferring ownership of all files and folders within a single parent folder.

## Usage

1. Select your folder with the Google Picker
2. Enter the new owner's email address
3. Click "Transfer Folder" and wait for the script to complete!

## Notes

* This cannot be undone!  Do not transfer a folder to an email address you do not know or recognize!!!
* This script will send the new owner an email **for each folder and each file within the main folder**.  This can result in a huge number of emails to the new owner, but unfortunately there is no way to suppress this behavior programmatically.
* If you do transfer it to the wrong person, immediately make a copy of the folder using my [Copy Folder tool](https://chrome.google.com/webstore/detail/copy-folder/kfbicpdhiofpicipfggljdhjokjblnhl).
* This script can take a long time to execute based on the folder size.  For very large folders, transfer times greater than 1 hour are common.
* Any folders or files that you do not currently own will not be transferred.

## Limitations

Google Drive prohibits Transfer of Ownership in some circumstances.  These include:

1. Transferring ownership of files or folders you don't own.
2. Transferring ownership of "synced" files.  Examples of "synced" docs include uploaded PDFs, images, or plain-text files such as HTML.  If a file is not a Google file (e.g. Docs, Spreadsheets, Slides), the ownership cannot be transferred.
3. Transferring ownership to someone outside your organization.  For example, if your email address is at "@gmail.com" and you attempt to transfer to a "@company.com" email, it will fail.

If you attempt to transfer a folder and it (or any of its children files or folders) meets the first or second "prohibited" criteria, the web app will throw an error but continue transferring the eligible files and folders.  If you attempt to transfer to someone outside your organization, the web app will freeze.

## Privacy

This app does not change sharing permissions on any files or folders, nor does provide visibility of any files or folders to anyone except the owner and the new owner.  The transfer is done entirely through Google Drive and will not change the privacy of your files in any way, except for transferring ownership to the specified new owner.

## Bugs? Comments? Questions?

Contact the author at eric_yd@yahoo.com
