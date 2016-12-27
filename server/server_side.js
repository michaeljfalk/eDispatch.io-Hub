Meteor.publish("smsVoiceMessages", function () {
    return SmsVoiceMessages.find({ type: "sms", type: "call" });
});

Meteor.onConnection(function(connection) {
    console.log('Connection ID: '+connection.id);

//     Push.Configure({
//         apn: {
//             certData: Assets.getText('res/certs/pushCert.pem'),
//             keyData: Assets.getText('res/certs/pushCert.pem'),
//             passphrase: 'Dinner42@home',
//             production: false
//             // gateway: 'gateway.push.apple.com'
//         },
//         gcm: {
//             apiKey: 'Dinner42@home'
//         }
//         // production: true,
//         // 'sound' true,
//         // 'badge' true,
//         // 'alert' true,
//         // 'vibrate' true,
//         // 'sendInterval': 15000, Configurable interval between sending
//         // 'sendBatchSize': 1, Configurable number of notifications to send per batch
//         // 'keepNotifications': false,
// //
//     });
//
//     Push.send({
//         from: 'Test',
//         title: 'Hello',
//         text: 'World',
//         badge: 12,
//         query: {}
//     });
});