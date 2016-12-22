/**
 * Created by michaelfalk on 2016-12-19.
 */
Template.threadHeader.events({
    'tap #back' : function() {
        Session.set('whichHeader', 'header');
        Session.set("whichPage", 'smsMsgsTemplate');
    }
});

Template.smsMsgsTemplate.events({
    "tap .msgInstance" : function(msgInstance) {
        var number = $(msgInstance.currentTarget).attr('data');
        Session.set('number', number);

        Session.set('whichPage', 'messageThread');
        Session.set('whichHeader', 'threadHeader');

        // Session.set('openThread', true);

        // $('#messageBox').hide();
    }
});