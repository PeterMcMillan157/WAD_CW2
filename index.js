const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.use(express.urlencoded({extended: true})); 

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/restaurantAppRoutes');
app.use('/', router); 


//app.listen(3000, () => {
//console.log('Server started on port 3000. Ctrl^c to quit.');
//})

app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    
