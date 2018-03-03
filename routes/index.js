 var express = require('express');
 var app = express();



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

 app.get('/page/transports', function(req, res) {
    
   res.render('transport');
 });

  app.get('/page/scholarships', function(req, res) {
   res.render('scholarship');
 });

 app.get('/page/dining', function(req, res) {
   res.render('dining');
 });

 app.get('/page/news', function(req, res) {
   res.render('news');
 });

 app.get('/page/events', function(req, res) {
   res.render('events');
 });

 app.get('/page/viewscholarships', function(req, res) {
   res.render('viewscholarship');
 });

app.get('/page/viewstransport', function(req, res) {
   res.render('viewtransport');
 });

 app.get('/page/viewsdining', function(req, res) {
   res.render('viewdining');
 });

 app.get('/page/viewsevent', function(req, res) {
   res.render('viewevent');
 });

app.get('/page/viewnews', function(req, res) {
   res.render('viewnews');
 });

 app.get('/page/admission', function(req, res){
   res.render('admission');
 });


 app.get('/page/notification',function(req, res){
   res.render('notification');
 });

 app.get('/page/viewadmission',function(req, res){
   res.render('viewadmission');
 });

 
 app.get('/page/viewnotification',function(req, res){
   res.render('viewnotification');
 });

 app.get('/page/test',function(req, res){
  res.render('testtable');
});



 app.use(express.static('public'));
app.use('/public',express.static('public'));
};
