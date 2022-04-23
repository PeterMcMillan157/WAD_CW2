const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;



class UserDAO {

    // method to create a new user database object
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

   
    // method to insert the admin user into the datase
    // password has been encrypted with b crypt
    init() {
        const that = this;
            var initialEntry = { 
            user: 'admin',
            password: '$2b$10$HYuOdb5ua0ZCYFJ.xkc4QeVPNcJ3rOUb9T.LQJ1fYJkLD9..224/e',
        };
        that.db.insert(initialEntry, function (err) {
            if (err){
                console.log("Unable to insert initial user.");   
            }
        });
 
        //for later debugging
        console.log('user admin created');  
        return that 
        }

        // method to create new user
        // not actually used in current version of the app
        createUser(username, password) {
            const that2 = this;
            bcrypt.hash(password, saltRounds).then(function(hash) {
                var entry = {
                    user: username,
                    password: hash,
                };
                that2.db.insert(entry, function (err) {
                if (err) {
                console.log("Can't insert user: ", username);
                }
                });
            });
        }
     
    //method to look up users
    // not currently used
    lookupUser(user, cb) {
        console.log(user);
        this.db.find({ 'user': user }, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                console.log(entries[0]);
                return cb(null, entries[0]);
            }
        });
    }
     }


            
const dao = new UserDAO();
dao.init();       
    
      

//make the object visible outside
module.exports = dao;