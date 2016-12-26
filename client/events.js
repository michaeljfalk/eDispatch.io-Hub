/**
 * Created by michaelfalk on 2016-12-19.
 */

Template.login.events({
    'click #login-button' : function(e, t) {
        var reg_phone = t.find('#login_name').value,
            phone = $.trim(reg_phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')),
            reg_password = t.find('#password_entry').value;

        try {Meteor.loginWithPassword(phone, reg_password, function(err){
            if (err) {
                switch (err.error) {
                    case 403:
                        alert(err.message);
                        break;
                }
            } else {
                // The user has been logged in.
                var data = Meteor.users.findOne(Meteor.userId());
                Session.set('userName', data.profile.first_name+' '+data.profile.last_name);
                Session.set('companyName', data.profile.company);

                Session.set('currentUserId', Meteor.userId());
                Session.set('remote-messagesReady', true);
                Session.set('whichHeader', 'header');
                Session.set("whichPage", 'smsMsgsTemplate');
                $('#newMsg').removeClass('hidden');
            }
        });
        } catch(e) {
            alert(e.message);
        }
    }
});

Template.header.events({
    "tap #newMsg" : function() {
        Session.set('number', undefined);
        Session.set('whichHeader', 'threadHeader');
        Session.set("whichPage", 'messageThread');
    }
});

Template.threadHeader.events({
    'tap #back' : function() {
        Session.set('whichHeader', 'header');
        Session.set("whichPage", 'smsMsgsTemplate');

        $('#newMsg').removeClass('hidden');
    },
    'tap #plus' : function() {
        navigator.contacts.pickContact(function (contact) {
            Session.set('chosenContact', contact);
            Session.set('chooseANumber', true);
        }, function (err) {
            Session.set('number', undefined);
            Session.set('whichHeader', 'header');
            Session.set("whichPage", 'smsMsgsTemplate');
        });
    },
    'blur #contact' : function(e) {
        // if (e.which == 13) {
            e.preventDefault();
            Session.set('number', $('#contact').val());

            Session.set('chosenContact', contact);
            Session.set('chooseANumber', false);
        // }
    }
});

Template.smsMsgsTemplate.events({
    "tap .msgInstance" : function(msgInstance) {
        var number = $(msgInstance.currentTarget).attr('data');

        Meteor.call('markAsRead', number);
        Session.set('number', number);
        Session.set('whichPage', 'messageThread');
        Session.set('whichHeader', 'threadHeader');
    }
});

Template.messageThread.events({
    "tap .numberInstance" : function(e) {
        Session.set('number', $(e.currentTarget).attr('id'));
        Session.set('chosenContact', undefined);
        Session.set('chooseANumber', false);
    },
    "tap #sndMsg" : function() {
        var msgObj = $('#messageText'),
            msgText = msgObj.val(),
            smsOptions =  {
                to: Session.get('number'),
                feedBack: false,
                type: 'sms',
                message: msgText
            };

        Meteor.call('sendMsg', smsOptions, function (err) {
            if (err) {
                alert("There was an error sending the message: "+ err.message);
            } else {
                msgObj.val('');
            }
        });
    }
});