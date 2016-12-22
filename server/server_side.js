Meteor.publish('remote-messages', function() {
    return SmsVoiceMessages.find();
});

Meteor.onConnection(function(connection) {
    console.log('Connection ID: '+connection.id);
});

Meteor.methods({
    markAsRead: function(id) {
        SmsVoiceMessages.update({_id: id}, {$set: {read: true}}, {upsert: false});
    }
});