console.log('remote-collections.js');
remote = DDP.connect('https://edispatch.io');
SmsVoiceMessages = new Mongo.Collection("smsVoiceMessages", remote);
Users = new Mongo.Collection("users", remote);
remote.subscribe('smsVoiceMessages');
remote.subscribe('users');

connectToBackendServer = function(url) {
    Meteor.connection = DDP.connect(url);
    Accounts.connection = Meteor.connection;
    _.each(['subscribe', 'methods', 'call', 'apply', 'status', 'reconnect',
            'disconnect'],
        function (name) {
            Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);
        });
    Meteor.users = new Meteor.Collection('users');
    var token = Accounts._storedLoginToken();
    if(token) {
        Meteor.loginWithToken(token, function(err){
            if(err) {
                console.log(err);
                Session.set("whichPage", 'login');
                return false;
            } else {
                var data = Meteor.users.findOne(Meteor.userId());
                Session.set('userName', data.profile.first_name+' '+data.profile.last_name);
                Session.set('companyName', data.profile.company);

                Session.set('remote-messagesReady', true);
                Session.set('whichHeader', 'header');
                Session.set("whichPage", 'smsMsgsTemplate');
                console.log('Logged In With Token');
                return true;
            }
        });
    } else {
        console.log('Need to login');
        Session.set("whichPage", 'login');
        return false;
    }
};