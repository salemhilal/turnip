var loopback = require('loopback'),
    boot = require('loopback-boot'),
    app = module.exports = loopback(),
    bodyParser = require('body-parser');

// Passport configurators
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// attempt to build the providers/passport config
var config = {};
try {
	config = require('../providers.json');
} catch (err) {
	console.trace(err);
	process.exit(1); // fatal
}

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --
app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.url);
  next();
});

// boot scripts mount components like REST API
boot(app, __dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(loopback.token({
  model: app.models.accessToken
}));

app.use(loopback.cookieParser('cookieSecret'));
app.use(loopback.session({
  secret: 'sessionSecret',
  saveUninitialized: true,
  resave: true
}));
passportConfigurator.init();

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});


// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));

for (var s in config) {
	var c = config[s];
	c.session = c.session !== false;
	passportConfigurator.configureProvider(s, c);
}

// Handles what to do once the user has logged in
app.get('/auth/account', function(req, res) {
  res.cookie('user-access-token', req.signedCookies['access_token']);
  res.cookie('user-id', req.user.id);
  res.redirect('/turnip/login');
});

// Convenience endpoint to help with keeping users logged in
app.get('/loggedin', function(req, res) {
  if(req.user) { res.send('true'); } else { res.send('false'); }
});

// Any routes that don't match should be passed to the client.
// This needs to be after all other routes, especially the API.
// We need the /app prefix so that real things, like /auth,
// don't get caught by the html5 router.
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
