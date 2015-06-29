require('colors');

var express = require('express'),
  bodyParser = require('body-parser'),
  errorhandler = require('errorhandler'),
  api = require('./lib/routes/index'),
  auth = require('./lib/http/auth.js');

var app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser());
app.use(errorhandler());

app.post('/api/user/login', auth, api.user.validateLogin);
app.post('/api/user', auth, api.user.createUser);
app.put('/api/user', auth, api.user.updateUser);
app.get('/api/listusers', auth, api.user.listUsers);
app.get('/api/user/:user', auth, api.user.getUser);
app.delete('/api/remove/:user', auth, api.user.removeUser);

app.post('/api/vm', auth, api.vm.createVm);
app.delete('/api/vm/:id', auth, api.vm.deleteVm);
app.get('/api/vm/:id', auth, api.vm.vmDetails);
app.get('/api/vm', auth, api.vm.vmList);

app.get('/api/image', auth, api.vm.imageList);

app.get('/api/config/getlogo', api.conf.getLogo);
app.get('/api/config/clearlogo', api.conf.clearLogo);
app.post('/api/config/savelogo', api.conf.updateLogo);

var port = process.env.PORT || 8080;

console.log('(SYSTEM) Cloudy Panel'.green);

app.listen(port, function () {
  console.log('(PLAIN) Server listening on port %d.'.green, port);
});
