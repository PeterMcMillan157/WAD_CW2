const res = require('express/lib/response');
const nedb = require('nedb');

class Dish {

    // method to create a new dish database object
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    //method to seed the database with some sampe records
    init() {
        this.db.insert({
            name: 'Fish & Chips',
            description: 'fried battered cod served with chips',
            ingredients: 'Cod fillets,flour,cornstarch,salt,black pepper,beer,water,potatoes',
            allergy_advice: 'May contain Gluten',
            price: '6.00',
            on_lunch_menu: '1',
            on_dinner_menu: '0'
        });
        //for later debugging
        console.log('db entry Fish & Chips inserted');

        this.db.insert({
            name: 'Quiche Lorraine',
            description: 'Egg custard quiche with bacon,cheese and caramelised onions in a flaky pie crust',
            ingredients: 'Flour,butter,water,eggs, bacon,gruyere cheese',
            allergy_advice: 'Not suitable for customers with lactose intolerance',
            price: '7.00',
            on_lunch_menu: '1',
            on_dinner_menu: '0'
        });
        //for later debugging
        console.log('db entry Quiche Lorraine inserted');

        this.db.insert({
            name: 'Cheeseburger with Bacon',
            description: 'Angus beef burger with cheddar cheese and smoked bacon Ingredients:Onion,garlic,minced beef,egg,pepper,cheddar cheese,bacon,lettuce,tomato',
            ingredients: 'Onion,garlic,minced beef,egg,pepper,cheddar cheese,bacon,lettuce,tomato',
            allergy_advice: 'Not suitable for customers with lactose intolerance',
            price: '9.00',
            on_lunch_menu: '1',
            on_dinner_menu: '0'
        });
        //for later debugging
        console.log('db entry Cheeseburger inserted');

        this.db.insert({
            name: 'Beef Lasagne',
            description: 'Sheets of pasta with a minced beef and tomato ragu Ingredients:Olive oil,minced beef,onions,garlic,flour,tomato,thyme,cheddar cheese',
            ingredients: 'Onion,garlic,minced beef,flour,tomato',
            allergy_advice: 'May contain Gluten',
            price: '10.00',
            on_lunch_menu: '0',
            on_dinner_menu: '1'
        });
         //for later debugging
         console.log('db entry Lasagne inserted');

        this.db.insert({
            name: 'Sirloin Steak',
            description: '12oz steak served with chips, fresh garden peas and onion rings Ingredients:Beef, potatoes, vegetable oil, peas, onions',
            ingredients: 'Angus beef burger with cheddar cheese and smoked bacon Ingredients:Onion,garlic,minced beef,egg,pepper,cheddar cheese,bacon,lettuce,tomato',
            allergy_advice: ' ',
            price: '15.00',
            on_lunch_menu: '0',
            on_dinner_menu: '1'
        });


        //for later debugging
        console.log('db entry Sirloin Steak inserted');

            
        }


         // method to remove a dish, specified by id, from the lunch menu      
        editlunch(id) {
            this.db.update(
                {_id: id}, 
                {$set: {
                   on_lunch_menu: '0' }},
                {}
               ,function(err, doc) {
                   if (err) {
                       console.log('Error updating document', subject);
                       } else {
                       console.log('document updated in the database', doc);
                   }
           }) 
        }     
    
        // method to remove a dish, specified by id, from the dinner menu   
        editDinner(id) {
            this.db.update(
                {_id: id}, 
                {$set: {
                   on_dinner_menu: '0' }},
                {}
               ,function(err, doc) {
                   if (err) {
                       console.log('Error updating document', subject);
                       } else {
                       console.log('document updated in the database', doc);
                   }
           }) 
        }     

        // method to retrieve all dishes from the database
        getDishes() {
            //return a Promise object, which can be resolved or rejected
            return new Promise((resolve, reject) => {
            this.db.find({on_lunch_menu: '0', on_dinner_menu: '0' }, function(err, entries) {
            //if error occurs reject Promise
            if (err) {
            reject(err);
            //if no error resolve the promise and return the data
            } else {
            resolve(entries);
            //to see what the returned data looks like
            console.log('getDishes() returns: ', entries);
            }
            })
            })
            }

        // method to retrieve all dishes on the current lunch menu from the database
        getLunchDishes() {
            //return a Promise object, which can be resolved or rejected
            return new Promise((resolve, reject) => {
            this.db.find({ on_lunch_menu: '1' }, function(err, entries) {
            //if error occurs reject Promise
            if (err) {
            reject(err);
            //if no error resolve the promise and return the data
            } else {
            resolve(entries);
            //to see what the returned data looks like
            console.log('getLunchEntries() returns: ', entries);
            }
            })
            })
            }

            // method to retrieve all dishes on the current dinner menu from the database
            getDinnerDishes() {
                //return a Promise object, which can be resolved or rejected
                return new Promise((resolve, reject) => {
                this.db.find({ on_dinner_menu: '1' }, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                reject(err);
                //if no error resolve the promise and return the data
                } else {
                resolve(entries);
                //to see what the returned data looks like
                console.log('getDinnerEntries() returns: ', entries);
                }
                })
                })
                }
            
            // method to retrieve a single dish, specified by dishname, from the database
            findDish(dishname) {
                //return a Promise object, which can be resolved or rejected
                return new Promise((resolve, reject) => {
                this.db.findOne({ name: dishname }, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                reject(err);
                //if no error resolve the promise and return the data
                } else {
                resolve(entries);
                //to see what the returned data looks like
                console.log('findDish(dishname) returns: ', entries);
                 }
                })
                })
                } 

            // method to add a dish with the attributes specified in the parameters to the database
            addDish(name, description, ingredients, allergy_advice, price, on_lunch_menu,on_dinner_menu) {
                    var entry = {
                            name: name,
                            description: description,
                            ingredients: ingredients,
                            allergy_advice: allergy_advice,
                            price: price,
                            on_lunch_menu: on_lunch_menu,
                            on_dinner_menu: on_dinner_menu,
                            }
                    console.log('dish added', entry);
                    this.db.insert(entry, function(err, doc) {
                            if (err) {
                                console.log('Error inserting document', subject);
                                } else {
                                console.log('document inserted into the database', doc);
                                }
                        }) 
                     }   

                // method to update a dish, specified by if, to the values specified in the other parameters
                editDish(id,name, description, ingredients, allergy_advice, price, on_lunch_menu,on_dinner_menu) {
                        this.db.update(
                             {_id: id}, 
                             {$set: {
                                name: name,
                                description: description, 
                                ingredients : ingredients,
                                allergy_advice: allergy_advice,
                                price: price, 
                                on_lunch_menu: on_lunch_menu, 
                                on_dinner_menu: on_dinner_menu}},
                             {}
                            ,function(err, doc) {
                                if (err) {
                                    console.log('Error updating document', subject);
                                    } else {
                                    console.log('document updated in the database', doc);
                                }
                        } 
                        )  
                        
                     }   

                     // method to delete the dish specified by the dish parameter from the databas
                     deleteDish(dish) {
                         console.log(dish);
                         var removal = {
                             name: dish
                         }
                        this.db.remove(removal, function(err, doc) {
                                if (err) {
                                    console.log('Error deleting document', subject);
                                    } else {
                                    console.log('document deleted from the database', doc);
                                }
                        }) 
                      }  

                  

            }
//make the module visible outside
module.exports = Dish;

