var loopback = require('loopback'),
    boot = require('loopback-boot'),
    app = module.exports = loopback();

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

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));

passportConfigurator.init();

passportConfigurator.setupModels({
	userModel: app.models.user,
	userIdentityModel: app.models.userIdentity,
	userCredentialModel: app.models.userCredential
});

// passportConfigurator.setupModels();
for (var s in config) {
	var c = config[s];
	c.session = c.session !== false;
	passportConfigurator.configureProvider(s, c);
}

// Any routes that don't match should be passed to the client.
// This needs to be after all other routes, especially the API. 
// We need the /app prefix so that real things, like /auth, 
// don't get caught by the html5 router.
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// If they go to the homepage, load the app.
app.get('/', function(req, res) { 
  res.redirect('/app');
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
