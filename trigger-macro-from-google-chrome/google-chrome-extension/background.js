/****************
 * 
 * Script for Keyboard Maestro to trigger macros based on loaded
 * URL or Title.
 * 
 * This requires that Keyboard Maestro's Web Server is enabled
 * and the macro being triggered has a "Public Web Trigger" 
 * trigger enabled.
 * 
 * Created by Mike Grace starting on 2022-11-18
 * 
 ***************/


/***********************
 * Listen to every tab update event and filter for loading and completed
 * events to match specific URLs and page titles.
 * ********************/
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // LOADING PAGE
    //////////////////////
    if (changeInfo.status == 'loading' && /^http/.test(tab.url)) {
        
        // partial match of URL
        if (tab.url.includes('//example.com/')) {
            macro('A85C7184-CAED-4613-A7B1-1FE157A45E57'); // Google Chrome Trigger
        
        // exact match of title
        } else if (tab.title == 'Keyboard Maestro Discourse - Discussion forum for Keyboard Maestro, the powerful macro program for macOS') {
            macro('A85C7184-CAED-4613-A7B1-1FE157A45E57'); // Google Chrome Trigger
        }

    
    // DONE LOADING PAGE
    //////////////////////
    } else if (changeInfo.status == 'complete' && /^http/.test(tab.url)) {
        
        // exact match of URL
        if (tab.url == 'https://wiki.keyboardmaestro.com/Home_Page') {
            macro('A85C7184-CAED-4613-A7B1-1FE157A45E57', tab.url); // Google Chrome Trigger
        }
      
    }
});


/***********************
 * Call macro using web server trigger. Response will get blocked
 * by CORS policy and that is ok since we only care about getting
 * the call out.
 * ********************/
function macro(macroUUID, value='') {
  fetch(`http://localhost:4490/action.html?macro=${macroUUID}&value=${value}`, {mode: 'no-cors'})
    .then(function(response) {
        return response;
    }).then(function(data) {
        // do nothing
    }).catch(function() {
        // do nothing
    });
}


