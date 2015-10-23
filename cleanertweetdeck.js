(function initCleanerTweetdeckIIFE () {
    var s_ajaxListener = new Object();
    s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
    s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;

    s_ajaxListener.callback = function() {
        // runs on XHR events
        var tweet = $('.tweet');

        if (!tweet) {
            console.log('___ uTweetdeck ___: Wait for it...');
            return;
        } else {
            console.log('___ uTweetdeck ___: Swabbing the decks!');
            removeProfilePics();
            shrinkImages();

        };
        
    }

    function shrinkImages () {
        var pics = $('.js-column .tweet .js-media-preview-container');

        pics.css({ 
            'max-height' : '25px', 
            overflow : 'hidden' 
        });
    }

    function removeProfilePics () {
        $('.tweet-avatar.avatar.pull-right').remove();
        $('.tweet').css({ 'padding-left': '5px' });
    }

    XMLHttpRequest.prototype.open = function(a, b) {
        if (!a) var a = '';
        if (!b) var b = '';
        s_ajaxListener.tempOpen.apply(this, arguments);
        s_ajaxListener.method = a;
        s_ajaxListener.url = b;
        if (a.toLowerCase() == 'get') {
            s_ajaxListener.data = b.split('?');
            s_ajaxListener.data = s_ajaxListener.data[1];
        }
    }

    XMLHttpRequest.prototype.send = function(a, b) {
        if (!a) var a = '';
        if (!b) var b = '';
        s_ajaxListener.tempSend.apply(this, arguments);
        if (s_ajaxListener.method.toLowerCase() == 'post') s_ajaxListener.data = a;
        s_ajaxListener.callback();
    }
})();