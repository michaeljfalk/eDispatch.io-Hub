/**
 * Created by michaelfalk on 2016-12-19.
 */
phoneUtil = require('libphonenumber-js');

Session.set('remote-messagesReady', false);
Session.set('whichHeader', 'header');
Session.set("whichPage", 'smsMsgsTemplate');

// incomingSound = new buzz.sound("/res/audio/incoming.mp3", {preload: true,
//     autoplay: true,
//     loop: false
// });
//
// outgoingSound = new buzz.sound("/res/audio/outgoing.mp3", {preload: true,
//     autoplay: true,
//     loop: false
// });

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    $.mobile.loading().hide();
    Keyboard.shrinkView(true);
    // $('#device-platform').html(device.platform);
    // $('#device-version').html(device.version);
    // $('#device-cordova').html(device.cordova);
    // $('#device-model').html(device.model);
    // $('#device-uuid').html(device.uuid);

    // /**
    //  * This callback will be executed every time a geolocation is recorded in the background.
    //  */
    // var callbackFn = function(location) {
    //     console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
    //
    //     // Do your HTTP request here to POST location to your server.
    //     // jQuery.post(url, JSON.stringify(location));
    //
    //     /*
    //      IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    //      and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
    //      IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    //      */
    //     backgroundGeolocation.finish();
    // };
    //
    // var failureFn = function(error) {
    //     console.log('BackgroundGeolocation error');
    // };
    //
    // // BackgroundGeolocation is highly configurable. See platform specific configuration options
    // backgroundGeolocation.configure(callbackFn, failureFn, {
    //     desiredAccuracy: 10,
    //     stationaryRadius: 20,
    //     distanceFilter: 30,
    //     interval: 60000
    // });
    //
    // // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    // backgroundGeolocation.start();
    //
    // // If you wish to turn OFF background-tracking, call the #stop method.
    // // backgroundGeolocation.stop();
}

Meteor.startup(function () {
    console.log('isCordove: true');
    // $.mobile.loading().hide();
});