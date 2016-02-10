var PythonShell = require('python-shell');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var routes = require('./routes')(io);
var socketEvents = require('./socketevents');
var PythonShell = require('python-shell');

// initialize body-parser
// bodyparser parses the body from a HTTP POST to a JSON object
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;

var router = express.Router();

// middleware for all requests
// if there is a new request, it has to pass this middleware
// POST to /api/message -> this function -> router.route(/message)
// GET to /api/message -> this function -> router.route(/message)
// just for i dont know ... logging?
router.use(function (req, res, next) {
    // ToDo: Logging.

    console.log('new request.');
    next(); // dont stop, go to the next route
})

// initialize root route (0.0.0.0:1337/api)
router.get('/', routes.index);

// initialize message route (0.0.0.0:1337/api/message)
router.route('/beepon')
    .post(routes.on);

router.route('/beepoff')
    .post(routes.off);

// define that /api is the root route
app.use('/api', router);

// start server
server.listen(port);

console.log('texta api started on port ' + port);