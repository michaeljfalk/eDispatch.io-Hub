/**
 * Created by michaelfalk on 2016-12-19.
 */
updateScroll = function (){
    var element = document.getElementById("messageThreadBox");
    element.scrollTop = element.scrollHeight;
};

formattedDateTime = function(data, tor) {
    var formattedDate = moment(data).format('YYYY-MM-DD'),
        today = moment(new Date).format('YYYY-MM-DD'),
        yesterday = moment(new Date).subtract(1, 'days').format('YYYY-MM-DD'),
        time = '';

    if (tor === 'dateTime') {
        time = ' @ '+moment(data).format('h:mm a');
    }

    switch (formattedDate) {
        case today:
            if (tor === 'time') {
                return moment(data).format('h:mm a');
            }
            if (tor === 'date') {
                return 'Today';
            }
            if (tor === 'dateTime') {
                return 'Today'+time;
            }
            break;
        case yesterday:
            return 'Yesterday'+time;
            break;
        default:
            return moment(formattedDate).format('ddd, MMM D');
            break;
    }
};

getLatestMsg = function(number) {
    return SmsVoiceMessages.findOne({from: number}, {sort: {isoDate: -1}, limit: 1}); //TODO eventually make this only fetch messages pertaining to this user/company but for dev purposes fetch all for now
};

Template.body.helpers({
    whichPage : function() {
        return Session.get('whichPage');
    },
    whichHeader : function() {
        return Session.get('whichHeader');
    }
});

Template.header.helpers({
    openThread : function() {
        return Session.get('openThread');
    },
    title : function() {
        return 'eDispatch.io';
    },
    currentlyLoggedIn : function(rt) {
        if (rt === 'company') {
            return Session.get('companyName');
        }
        if (rt === 'user') {
            return Session.get('userName');
        }
    }
});

Template.threadHeader.helpers({
    threadName : function() {
        var number = Session.get('number');
        // if (phoneUtil.isValidNumber(number) === true) {
            return phoneUtil.format(number, 'National');
        // } else {
        //     return 'Unknown Number';
        // }
    },
    hasNumber : function() {
        return typeof Session.get('number') != 'undefined';
    }
});

Template.registerHelper('whoFrom', function(doc) {
    if (typeof doc != 'undefined') {
        if (typeof doc.from != 'undefined') {
            if (phoneUtil.isValidNumber(doc.from) === true) {
                return phoneUtil.format(doc.from, 'National');
            } else {
                return 'Unknown Number';
            }
        } else {
            // if (phoneUtil.isValidNumber(doc) === true) {
                return phoneUtil.format(doc, 'National');
            // } else {
            //     return 'Unknown Number';
            // }
        }
    }
});

Template.smsMsgsTemplate.helpers({
    uniqueUser : function() {
        if (Session.equals('remote-messagesReady', true)) {
            var data,
                distinctData,
                uniqueDate;

            data = SmsVoiceMessages.find({type: 'sms'}, {sort: {isoDate: -1}}).fetch(); //TODO eventually make this only fetch messages pertaining to this user/company but for dev purposes fetch all for now

            distinctData = _.uniq(data, false, function (d) {
                return d.from
            });

            uniqueDate = _.pluck(distinctData, "from");

            return uniqueDate;
        }
    },
    isInProgress : function(doc) {
        if (doc.status === 'in-progress') {
            return 'pulse'
        } else if (doc.status === 'completed') {
            return '';
        }
    },
    msgSafeID : function(number) {
        return number.replace('+','');
    },
    formatMsgDate : function(doc, type) {
        var msg = getLatestMsg(doc),
            date_sent = msg.isoDate;

        return formattedDateTime(date_sent, type);
    },
    msgPreview : function(latest) {
        var data = getLatestMsg(latest);
        return data.body;
    },
    isRead : function(doc) {
        var data = getLatestMsg(doc);
        if (!data.read) {
            return 'unread';
        }
    },
    getLatestMsgType : function(number) {
        var data = SmsVoiceMessages.findOne({from: number}, {sort: {isoDate: -1}, limit: 1}); //TODO eventually make this only fetch messages pertaining to this company but for dev purposes fetch all for now

        switch (data.type) {
            case 'sms':
                return 'fa-comments-o';
                break;
            case 'call':
                return 'fa-phone';
                break
        }
    }
});

Template.messageThread.helpers({
    makeID : function(number) {
        return number.replace(/\D/g,'');
    },
    chooseNumber : function() {
        return Session.get('chooseANumber');
    },
    chosenNumber : function() {
        var data =  Session.get('chosenContact');

        return data.phoneNumbers;
    },
    watcher : function() {
        var data = SmsVoiceMessages.find(); //TODO eventually make this only fetch messages pertaining to this company but for dev purposes fetch all for now

        data.observeChanges({
            added: function(id, fields) {
                var scrollTimer = setInterval(timer, 250);
                function timer() {
                    var element = document.getElementById("messageThreadBox");
                    element.scrollTop = element.scrollHeight;
                    clearInterval(scrollTimer);
                }
            },
            changed: function(id, fields) {
            }
        });
    },
    msgDate : function() {
        if (Session.equals('remote-messagesReady', true)) {
            var number = Session.get('number'),
                data,
                distinctData,
                uniqueDates,
                projection = { "from": 1, "body": 1, "status": 1, "direction": 1, "isoDate": 1, "sent_date": 1, "sent_time": 1, "read": 1, "type": 1 };


            if (typeof number != 'undefined') {
                var selector = { "from": number, "type": "sms" };

                data = SmsVoiceMessages.find(selector, {fields: projection, sort: {sent_date: -1, sent_time: 1}, limit: 30}).fetch(); //TODO eventually make this only fetch messages pertaining to this company but for dev purposes fetch all for now

                distinctData = _.uniq(data, false, function (d) {
                    return d.sent_date;
                });

                uniqueDates = _.pluck(distinctData, "sent_date");

                return uniqueDates.reverse();
            }
        }
    },
    setNewDate : function(date) {
        Session.set('msgDate', date);
    },
    checkDate : function(date) {
        var msgDate = Session.get('msgDate');

        if (date != msgDate) {
            return true;
        }

        if (date === msgDate) {
            return false;
        }
    },
    formatMsgDate : function(date, type) {
        return formattedDateTime(date, type);
    },
    twilMsg : function(doc) {
        var number = Session.get('number'),
            data,
            projection = { "from": 1, "body": 1, "status": 1, "direction": 1, "isoDate": 1, "sent_date": 1, "sent_time": 1, "read": 1, "type": 1 };

        if (typeof number != 'undefined') {
            var selector = { "from": number, "sent_date": doc, "type": "sms" };

            data = SmsVoiceMessages.find(selector, {fields: projection, sort: {sent_time: 1}}); //TODO eventually make this only fetch messages pertaining to this company but for dev purposes fetch all for now

            return data;
        }
    },
    whichDirection : function(doc) {
        if (doc.direction === 'inbound') {
            return "bounceInLeft";
        }
        if (doc.direction === 'outbound-api') {
            return "bounceInRight";
        }
    },
    bubbleClass : function(doc) {
        if (doc.direction === 'inbound') {
            return 'from-them';
        }
        if (doc.direction === 'outbound-api') {
            return 'from-me';
        }
    },
    floatSide : function(doc) {
        if (doc.direction === 'inbound') {
            return 'floatLeft';
        }
        if (doc.direction === 'outbound-api') {
            return 'floatRight';
        }
    },
    msgStatus : function(doc) {
        return doc.status;
    },
    formatedTime : function(doc) {
        return moment(doc.isoDate).format('h:mm a');
    }
});

Template.footer.helpers({
    connectedStatus : function() {
        var connectStatus = remote.status().status;

        switch (connectStatus) {
            case 'connected' :
                return 'fa-plug';
                break;
            case 'connecting' :
                return 'fa-cog fa-spin';
                break;
            case 'failed' :
                return 'fa-exclamation-triangle';
                break;
            case 'waiting' :
                return 'fa-cog fa-spin';
                break;
            case 'offline' :
                return 'fa-exclamation-triangle';
                break;
        }
    }
});