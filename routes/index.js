 var express = require('express');
 var app = express();

 var notification = require('../api/notifications.js');
 var admission = require('../api/admission.js');
 var dining = require('../api/dining.js');
 var scholarship = require('../api/scholarship.js');
 var transport = require('../api/transport.js');
 var news = require('../api/news.js');
 var event = require('../api/events.js');



// //////Set All Routes For Fronthand
// module.exports = function(app, route){
// app.get("/transport", function(res,req)
// {   
//     console,log("Successfully Render");
//     res.render("transport");
// });

// }

module.exports = function(app) {
 app.get('/', function(req, res) {
   res.render('login');
 });
app.get('/page/dashbord', function(req, res) {
   res.render('dashboard');
 });

 app.get('/page/transports',transport.openTransport);

  app.get('/page/scholarships',scholarship.openScholarship);

 app.get('/page/dining',dining.openDining);

 app.get('/page/news',news.openNews);

 app.get('/page/events', event.openEvent);

 app.get('/page/viewscholarships',scholarship.viewScholarship);

app.get('/page/viewstransport',transport.viewTransport);

 app.get('/page/viewsdining', dining.viewDining);

 app.get('/page/viewsevent', event.viewEvent);

app.get('/page/viewnews', news.viewNews);

 app.get('/page/admission',admission.openAdmission);


 app.get('/page/notification',notification.openHome);

 app.get('/page/viewadmission',admission.viewAdmission);

 
//  app.get('/page/viewnotification',function(req, res){
//    res.render('viewnotification');
//  });

app.get('/page/viewnotification',notification.viewNotification);

 app.get('/page/test',function(req, res){
  res.render('testtable');
});

app.get('/page/driver',function(req, res){
  res.render('allDrivers');
});



 app.use(express.static('public'));
app.use('/public',express.static('public'));
};
