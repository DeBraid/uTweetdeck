(function initCleanerTweetdeckIIFE () {
    var s_ajaxListener = new Object();
    s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
    s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;

    // runs each XHR events
    s_ajaxListener.callback = function() {
        var tweet = $('.tweet');

        if (tweet.length > 0) {
            console.log('uTweetdeck: Swabbing the decks!');
            removeProfilePics();
            shrinkImages();
            makeHomeColumnWider();
        } else {
            console.log('uTweetdeck: Wait for it...');
            return;
        };
        
    }


    function makeHomeColumnWider () {
        var homeInput = $('#home-column-width');
        var newHtml = '<input type="text" placeholder="400" id="home-column-width" style="width: 45px; float: right; margin-top: 1em;">' +
            '<span class="attribution txt-mute txt-sub-antialiased pull-right" style="margin-right: 0.5em;">Width</span>'; 

        if (homeInput.length == 0) {        
            $('.column-type-home h1').append(newHtml);
        };
        var newWidth = homeInput.val() || '400', 
            width = newWidth + 'px';
        
        $('.column-type-home').css({ 
            width :  width
        });
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