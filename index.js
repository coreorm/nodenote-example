var nodeNote = require('nodenote');

// example: call twitter and get the error json :D
function Example()
{
    // it's best to add observer before sending notifications
    nodeNote.addObserver('httpCall', Processor.call1);
    nodeNote.addObserver('httpCall', Processor.call2);
    nodeNote.addObserver('dataIsReady', Processor.call3);
    // we can even use notification to benchmark
    nodeNote.addObserver('startTimer', Processor.startTimer);
    nodeNote.addObserver('endTimer', Processor.endTimer);

    var url = 'http://localhost:8080/';

    var http = require('http');

    // benchmark
    nodeNote.sendNotification('startTimer');
    http.get(url, function(res) {
        nodeNote.sendNotification('httpCall', res, {
            'url': url
        });
    }).end();

    // second call, send similar note
    url = 'http://localhost:8080/2';

    // benchmark again
    nodeNote.sendNotification('startTimer');
    http.get(url, function(res) {
        nodeNote.sendNotification('httpCall', res, {
            'url': url
        });
    }).end();

}

/**
 * we can actually define a proper object
 * with functions to process and catch
 * notifications.
 * @type {{}}
 */
var Processor = {
    'call1': function(note)
    {
        var res = note.object;
        res.setEncoding('utf8');
        console.log('STATUS: ' + res.statusCode);
        // and we can use user info too
        console.log('User info: ', note.getUserInfo());

    },
    'call2': function(note)
    {
        var res = note.object;
        res.on('data', function (data) {
            // and you can send another notification!
            nodeNote.sendNotification('dataIsReady', data);
            // and stop timer
            nodeNote.sendNotification('endTimer');
        });
    },
    'call3': function(note)
    {
        var data = note.object;
        console.log("Response: ", data, "\n");
    },
    'startTimer':function()
    {
        var d = new Date;
        console.log('start:' + d.getUTCSeconds() + '.' + d.getMilliseconds());
    },
    'endTimer':function()
    {
        var d = new Date;
        console.log('end:' + d.getUTCSeconds() + '.' + d.getMilliseconds());
    }

};

// then observe
//Processor.observe();

// then fire it and see what happens
Example();
