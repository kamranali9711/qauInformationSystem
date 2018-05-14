const express = require('express');
var router = express.Router();
var app = express();

//Define routes for user
var user = require('../api/user.js');
router.post('/register', user.register);
router.post('/login', user.login);
router.get('/user', user.getAll);
router.delete('/user/:id', user.delete);

//Define routes for Events
var events = require('../api/events.js');
router.post('/events/add', events.add);
router.get('/events', events.getAll);
//router.post('/events/uploadimage', events.uploads);
router.get('/events/delete/:id', events.delete);
router.get('/events/edit/:id', events.edit);
router.post('/event/editevent',events.editEvent);

//Define routes for notification
var notification = require('../api/notifications.js');
router.post('/notification/add', notification.add);
router.get('/notification',notification.getAll);
router.get('/notification/delete/:id',notification.delete);
router.get('/notification/edit/:id',notification.edit);
router.post('/notification/editNotification',notification.editNotification);




//Define routes for Admission
var admission = require('../api/admission.js');
router.post('/admission/add', admission.add);
router.get('/admission',admission.getAll);
router.get('/admission/delete/:id',admission.delete);
router.get('/admission/edit/:id',admission.edit);
router.post('/admission/editAdmission',admission.editAdmission);



//Define routes for News
var news = require('../api/news.js');
router.post('/news/add', news.add);
 router.get('/news', news.getAll);
// router.post('/events/uploadimage', events.uploads);
 router.get('/news/delete/:id', news.delete);
 router.get('/news/edit/:id', news.edit);
 router.post('/news/editnews',news.editNews);


//Define the routes for transport
var routes = require('../api/transport.js');
router.post('/routes/add',routes.add);
router.get('/routes', routes.getAll);
router.get('/routes/delete/:id', routes.delete);
router.get('/routes/edit/:id', routes.edit);
router.post('/routes/editTransport',routes.editTransport);


//Define the routes for Dining
var dining = require('../api/dining.js');
router.post('/dining/add',dining.add);
router.get('/dining', dining.getAll);
router.get('/dining/delete/:id', dining.delete);
router.get('/dining/edit/:id', dining.edit);


//Define the routes for Departments
var department = require('../api/department.js');
router.post('/department/add',department.add);
router.get('/department', department.getAll);
router.delete('/department/delete/:id', department.delete);
router.put('/department/edit/:id', department.edit);


//Define the routes for Departments
var scholarship = require('../api/scholarship.js');
router.post('/scholarship/add',scholarship.add);
router.get('/scholarship', scholarship.getAll);
router.get('/scholarship/delete/:id', scholarship.delete);
router.get('/scholarship/edit/:id', scholarship.edit);
router.post('/scholarship/editScholarship',scholarship.editScholarship)

//Define the routes for Departments
var hurt = require('../api/programs.js');
router.post('/hurt/add',hurt.add);
// router.get('/scholarship', scholarship.getAll);
// router.delete('/scholarship/delete/:id', scholarship.delete);
// router.put('/scholarship/edit/:id', scholarship.edit);


app.use(express.static('public'));
app.use('/public',express.static('public'));

//////Set All Routes For Fronthand

// app.get("/transport", function(res,req)
// {   
//     console,log("Successfully Render");
//     res.render("transport");
// });

module.exports = router;