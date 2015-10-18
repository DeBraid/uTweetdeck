// var s = document.createElement('script');
// s.src = chrome.extension.getURL('cleanertweetdeck.js');
// (document.head||document.documentElement).appendChild(s);
// s.onload = function() {
//     s.parentNode.removeChild(s);
// };

var s = document.createElement('script');
// TODO: add "cleanertweetdeck.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('cleanertweetdeck.js');
s.onload = function() {
	console.log('loading content script');
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);