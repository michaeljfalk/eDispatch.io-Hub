remote = DDP.connect('https://edispatch.io');

SmsVoiceMessages = new Mongo.Collection('remote-messages', remote);
remote.subscribe('remote-messages');