Meteor.publish("smsVoiceMessages", function () {
    return SmsVoiceMessages.find({ type: "sms", type: "call" });
});

Meteor.onConnection(function(connection) {
    console.log('Connection ID: '+connection.id);
});