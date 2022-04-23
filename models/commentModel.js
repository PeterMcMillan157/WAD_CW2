const nedb = require('nedb');

class Comment {

    // method to create a new object of the comment class
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

   // method to seed the database with a test comment
    init() {
        this.db.insert({
            customer_name: 'Test',
            email_address: 'test@testing.com',
            comment: 'Test comment.',
            date: new Date().toISOString().split('T')[0]
        });
        //for later debugging
        console.log('db entry test comment inserted');
    }

    //method to retrieve comments from database
    getComments() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
        this.db.find({}, function(err, entries) {
        //if error occurs reject Promise
        if (err) {
        reject(err);
        //if no error resolve the promise and return the data
        } else {
        resolve(entries);
        //to see what the returned data looks like
        console.log('Comments received: ', entries);
        }
        })
        })
        }

        // method to add a new comment
        addComment(customer_name, email_address, comment) {
            var entry = {
                    customer_name: customer_name,
                    email_address: email_address,
                    comment: comment,
                    date: new Date().toISOString().split('T')[0]
                    }
            console.log('comment added', entry);
            this.db.insert(entry, function(err, doc) {
                    if (err) {
                        console.log('Error inserting document', subject);
                        } else {
                        console.log('document inserted into the database', doc);
                    }
            }) 
         }       
}

    //make the module visible outside
    module.exports = Comment;