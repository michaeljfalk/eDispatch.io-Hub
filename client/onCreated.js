/**
 * Created by michaelfalk on 2016-12-19.
 */

Template.smsMsgsTemplate.onCreated(function () {
    this.subscribe("remote-messages", {
        onReady: function() {
            Session.set('remote-messagesReady', true);
        }
    });
});

Template.messageThread.onCreated(function() {
    Session.set('msgDate', '1000-01-01');

    $('#header').addClass('threadOpen');
});