// set up dish database and load initial records into it
const dishDAO = require('../models/dishModel');
//const db = new dishDAO("dish.db");
const db = new dishDAO();
db.init();

// x is a variable that will store details of a dish the user wants to edit
// declared here so that it can be used in a different method to the one 
// that sets its value
var x


// set up comment database and load initial records into it
const commentDAO = require('../models/commentModel');
//const db3 = new commentDAO("comment.db");
const db3 = new commentDAO();

db3.init();

// method to list dihes on lunch menu
exports.entries_list_lunch = function(req, res) {
    db.getLunchDishes()
    .then((list) => {
        res.render('menus', {
            'title': 'Lunch Menu',
            'entries': list
        });
        console.log('promise resolved');
    })
    .catch((err) => {
        console.log('promise rejected', err);
    })

    } 

// method to list dishes on dinner menu
exports.entries_list_dinner = function(req, res) {
    db.getDinnerDishes()
    .then((list) => {
        res.render('menus', {
            'title': 'Dinner Menu',
            'entries': list
        });
        console.log('promise resolved');
    })
    .catch((err) => {
        console.log('promise rejected', err);
    })
        } 

// method to render contact form
exports.contact_us = function(req, res) {
    res.render('newComment', {
        'title': 'Contact Us'
        })
     } 

// method to insert comments into comment db
exports.post_new_comment = function(req, res) {
    console.log('processing new comment controller');
    if (!req.body.customer_name) {
    response.status(400).send("Name must be supplied.");
    return;
    }
    db3.addComment(req.body.customer_name, req.body.email_address, req.body.comment);
    res.render('commentReceived');
    }

// method to display staff login page
exports.staff_login = function(req, res) {
    res.render('user/stafflogin', {
        'title': 'Staff Login'
        })
    } 
// method to display logged in landing page
exports.loggedIn_landing = function (req, res) {
    res.render("user/actionSelect")
    };

//method to handle logging out
exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
    };

//method to remove dish from lunch menu     
exports.editLunchMenu = function (req, res) {
    db.editlunch(req.body.remove);
    res.render("user/lunchDishRemoved");
    };

// method to remove dish from dinner menu    
exports.editDinnerMenu = function (req, res) {
    db.editDinner(req.body.remove);
        res.render("user/dinnerDishRemoved");
    };
 
//method to find a single dish
//dish is stored in variable x
exports.find_dish = function(req, res) {
    db.findDish(req.body.name)
        .then((list) => {
            res.render('user/dishToEdit', {
            'title': 'Search Results',
            'entries': list
            });
        x=list;
        console.log('promise resolved');
        console.log(x);
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })

    } 

// method to view previously posted comments
exports.view_comments = function(req, res) {
    db3.getComments()
        .then((list) => {
        res.render('user/comments', {
                    'title': 'Comments received',
                    'entries': list
                });
            console.log('promise resolved');
            })
            .catch((err) => {
                console.log('promise rejected', err);
            })
                } 

 // method to display new dish form           
exports.new_dish_form = function(req, res) {
        res.render('user/newDish', {
                    'title': 'Add new dish'
                        })
                     }  
                     
 // method to add a new dish                    
exports.add_new_Dish = function(req, res) {
        console.log('processing new dish controller');
        if (!req.body.name || !req.body.description || !req.body.ingredients || !req.body.price){
                response.status(400).send("Input for all required fields must be supplied.");
                return;
                }
        db.addDish(req.body.name, req.body.description, req.body.ingredients, req.body.allergy_advice, req.body.price, req.body.on_lunch_menu, req.body.on_dinner_menu,);
            res.render('user/dishAdded');
            }

// method to display search page
exports.get_dish_to_edit = function(req, res) {
    res.render('user/getDish', {
                'title': 'Enter name of dish to edit'
                })
            }

// method to display details of dish to be edited
exports.edit_Dish_Form = function(req, res) {
    res.render('user/editDish', {
                'title': 'Edit dish details',
                'entry': x
                })
            }

//method to update dish
//if no value was supplied by the user then the value of x is used to update the dish 
//otherwise the supplied value is used           
exports.edit_Dish = function(req, res) {
        var editName
        var editDescription
        var editIngredients
        var editAllergyAdvice
        var editPrice
        var editOnLunchMenu
        var editOnDinnerMenu
        if (!req.body.name) {
            editName = x.name;
            } else {
                    editName = req.body.name;
                    }
        if (!req.body.description) {
            editDescription = x.description;
            } else {
                    editDescription = req.body.description;
                     }
        if (!req.body.ingredients) {
            editIngredients = x.ingredients;
            } else {
                    editIngredients = req.body.ingredients;
                     }
            if (!req.body.allergy_advice) {
                editAllergyAdvice = x.allergy_advice;
                } else {
                     editAllergyAdvice = req.body.allergy_advice;
                     }
            if (!req.body.price) {
                editPrice = x.price;
                } else {
                editPrice = req.body.price;
                }
                if (!req.body.on_lunch_menu) {
                    editOnLunchMenu = x.on_lunch_menu;
                     } else {
                    editOnLunchMenu = req.body.on_lunch_menu;
                     }
                if (!req.body.on_dinner_menu) {
                    editOnDinnerMenu = x.on_dinner_menu;
                    } else {
                    editOnDinnerMenu = req.body.on_dinner_menu;
                     }
        db.editDish(x._id, editName, editDescription, editIngredients, editAllergyAdvice, editPrice, editOnLunchMenu, editOnDinnerMenu);
        res.render('user/dishEdited');
                }
               
// method to display screen prompting for dish to be deletes
exports.get_dish_to_delete = function(req, res) {
        res.render('user/getDish', {
                    'title': 'Enter name of dish to delete'
                })
        }

// method to delete dish     
exports.delete_Dish = function(req, res) {
        console.log('processing new dish controller');
        db.deleteDish(req.body.name);
         console.log('Deleted dish')
        res.redirect('/deleted');
         }

//method to display screen confirming dish was deleted
exports.deleted = function(req, res){
        res.render('user/dishDeleted');
            }

// method to handle login and redirect to landing page
exports.handle_login = function (req, res) {
        res.render("user/actionSelect");
   }

// method to display edit lunch menu form
exports.editLunchMenusForm = function (req, res) {
         db.getLunchDishes()
            .then((list) => {
                res.render('user/editMenus', {
                    'title': 'Edit Lunch Menu',
                    'entries': list
                });
            console.log('promise resolved');
            })
            .catch((err) => {
                console.log('promise rejected', err);
            })
        }
            
// method to display edit dinner menu form
exports.editDinnerMenusForm = function (req, res) {
         db.getDinnerDishes()
             .then((list) => {
                 res.render('user/editMenus', {
                     'title': 'Edit Lunch Menu',
                     'entries': list
                 });
            console.log('promise resolved');
             })
             .catch((err) => {
                 console.log('promise rejected', err);
             })
         } 