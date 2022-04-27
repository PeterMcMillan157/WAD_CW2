Instructions to run this web app:

1. Navigate to the directory where files are stored.
2. rum the npm init command
3. Install the following packages via the npm install command:
express
path
bcrypt
bootstrap
cookie-parser
dotenv
jsonwebtoken
mustache-express
nedb
4. Create a .env file at the root of the project and provide a random string
value for ACCESS_TOKEN_SECRET.
5. Enter "node index" into the terminal.
6. Open a web browser and navigate to localhost:3000.
7. Login to the app with these credentials:
username: admin
password: Rest4ur4ntUs3r!
8. Alternatively access the live version at: https://wadcoursework.herokuapp.com/about.html

Features implemented:

Non logged in users can:

View the "About Page"
View lunch and dinner menus
Leave comments

Logged in users can:

View comments left
Add new dishes
Delete dishes
Edit dishes
Edit lunch and dinner menus

Changes from design document:

Added option to view comments in logged in section as the comments feature was useless without it.
Added ability to delete dishes following feedback.
Changed appaearance of edit menus screen as this page couldn't be made to function as intended with the original design.
 
 
