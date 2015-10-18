var s = document.createElement('script');
s.src = chrome.extension.getURL('cleanertweetdeck.js');
s.onload = function() {
	console.log('loading content script');
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);