/**
 * Created by michaelfalk on 2016-12-19.
 */


console.log('client_side.js');

phoneUtil = require('libphonenumber-js');

Session.set('remote-messagesReady', false);
Session.set('whichHeader', 'header');
Session.set("whichPage", 'login');

Session.set('userName', '');
Session.set('companyName', '');

Session.set('chosenContact', undefined);
Session.set('chooseANumber', false);

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $.mobile.loading().hide();
    Keyboard.shrinkView(true);

    window.addEventListener('keyboardDidShow', function () {
        updateScroll();
    });
}

Meteor.startup(function () {
    connectToBackendServer('https://edispatch.io');

    //Hide the loading spinner
    $.mobile.loading().hide();

    //Push Notifications
    var credentials = {
        accessKeyId: "edispatch-io",
        secretAccessKey: "fakeSecret"
    };

    snsPush = new SNSPush(credentials,"arn");
});