const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/restaurantAppControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')


// route to 'about' page
router.get("/", function(req, res) {
    res.redirect('/about.html');
    })

// route to page where user selects menus
router.get('/menu', function(req, res) {res.redirect('/menu.html');})

// route to lunch menu display
router.get('/lunch', controller.entries_list_lunch)

// route to dinner menu display
router.get('/dinner', controller.entries_list_dinner)

// route to contact form
router.get('/contact', controller.contact_us);
router.post('/contact', controller.post_new_comment);

//route to staff login page
router.get('/login', controller.staff_login)
router.post('/login', login, controller.handle_login);

//route to logged in landing page
//requires verification
router.get("/loggedin",verify, controller.loggedIn_landing);

//route to view comments
//requires verification
router.get("/viewcomments",verify, controller.view_comments);

// route to add new dish 
// requires verification
router.get("/adddish",verify, controller.new_dish_form);
router.post("/adddish",verify, controller.add_new_Dish);

// route to delete dish
// requires verification
router.get("/delete",verify, controller.get_dish_to_delete);
router.post("/delete",verify, controller.delete_Dish);
router.get("/deleted", verify, controller.deleted);

// route to search page to find dish to edit
// requires verification
router.get("/geteditdish",verify, controller.get_dish_to_edit);
router.post("/geteditdish",verify, controller.find_dish);

// route to edit dish form
// requires verification
router.get("/editdish",verify, controller.edit_Dish_Form);
router.post("/editdish",verify, controller.edit_Dish);

//route to edit linch menu screen
//requires verification
router.get("/editlunchmenu", verify, controller.editLunchMenusForm);
router.post("/editlunchmenu",verify, controller.editLunchMenu);

//route to eidt dinner menu screen
//requires verification
router.get("/editdinnermenu", verify, controller.editDinnerMenusForm);
router.post("/editdinnermenu",verify, controller.editDinnerMenu);

// route to logout
//requires verifcation
router.get("/logout",verify, controller.logout);

// route to take if user request non-existent page
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('Sorry, the page you requested could not be found.');
    })

// route to take if error occurs
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Oops, something went wrong.  Try again.');
        })


module.exports = router; 