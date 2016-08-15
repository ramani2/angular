var express 			=   require('express');
var app 				=   express();
var mustacheExpress	=	require('mustache-express');
var winston			=	require('winston');

app.use(express.static(__dirname + '/public'));

// Register '.html' extension with The Mustache Express
app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
		json: false,
		filename: 'log.log', 
		level: 'error' 
		}),
	new winston.transports.Console()
  ],
  exitOnError: false
});

logger.log('info', 'some msg');

app.get('/', function (req, res) {
	res.render('index', { title: 'Test App'});
    //res.sendFile(__dirname + '/view/index.html');
	//res.send('Hello World!');
});

app.get('/media', function (req, res) {
	res.render('media', { title: 'Media Queries'});
});

app.get('/api', function (req, res) {
	/*res.set({
		'Content-Type': 'text/cache-manifest'
	});*/
	res.render('html5_apis', { title: 'HTML5 APIs'});
});

app.get('/event_source', function (req, res) {
	res.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache'
	});
	
	res.send("data: The server time is: "+ new Date() +"\n\n");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});