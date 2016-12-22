/**
 * Created by michaelfalk on 2016-12-19.
 */


Template.messageThread.onRendered(function() {
    var msgTimer = setTimeout(function(){
        var msgDiv = $('#messageThreadBox');
        msgDiv.animate({scrollTop: msgDiv.prop("scrollHeight")}, 0);
        clearTimeout(msgTimer);
    }, 250);
});