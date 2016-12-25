/**
 * Created by michaelfalk on 2016-12-19.
 */

Template.smsMsgsTemplate.onCreated(function () {
    this.subscribe('smsVoiceMessages');
});

Template.messageThread.onCreated(function() {
    $('#header').addClass('threadOpen');
});