/**
 * Created by michaelfalk on 2016-12-19.
 */

Template.login.onRendered(function() {
    $('#newMsg').addClass('hidden');
});

Template.messageThread.onRendered(function() {
    Session.set('msgDate', '1000-01-01');

    var msgTimer = setTimeout(function(){
        updateScroll();
        clearTimeout(msgTimer);
    }, 250);

    var messageTextObj = $('#messageText');

    messageTextObj.autogrow();

    $('.wordWrap').bind( "taphold", function(event) {
        $(event.target).parent('div').prev('div').fadeIn(400);
    }).bind( "mouseup", function(event) {
        $(event.target).parent('div').prev('div').fadeOut(400);
    });

    $('.msgBubble').bind( "taphold", function(event) {
        $(event.target).prev('div').fadeIn(400);
    }).bind( "mouseup", function(event) {
        $(event.target).prev('div').fadeOut(400);
    });

    messageTextObj.focus(function() {
        updateScroll();
    });
});