const express = require('express');
const bodyParser = require('body-parser');

const postRoute = require('./routes/posts');//importing our routes
const userRoute = require("./routes/user.js");//importing our routes
const imageRoute = require('./routes/images.js');


const app = express();//app object of express with this object we can access http methods 

//middleware
app.use(bodyParser.json());
//do get request with localhost:3000/uploads/1716897415629.png url and we will get the image file in response
app.use("/uploads", express.static('uploads'));//static method has directory as input. static means not changes

app.use("/posts", postRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);

module.exports = app;//module.exports is object in Nodejs that holds the exported values and functions from module









//What is models :- This is the layer of the application that directly interacts with the database. It represents the data structure of your application, including tables, columns, relationships, and constraints. like schema 

//What is migrations :- Migrations allow you to version-control your database schema and apply changes in a consistent and trackable manner can be used to do CRUD operations in database, similar to how version control systems like Git manage changes to code.

//npx sequelize model:generate --name Post --attributes title:string,content:text,imageUrl:string,categoryId:integer,userId:integer. we used this command to create models and migrations for the mysql databse. 

//we ran migrations by npx sequelize db:migrate command but before that in config.json we gave database name and mysql database password in developement key object. as we run migrations so it will make changes in mysql database. it created tables there which were specified by our model.

//seeders :- Database seeding is populating a database with an initial set of data. It is common to load seed data such as initial user accounts or dummy data upon initial setup of an application.
//for this we used command  npx sequelize seed:generate --name category-seeder and did some code changes in up and down function in seeder file installed in seeders directory.
//and used this command to run seeders npx sequelize db:seed --seed 20240529160107-category-seeder. and we see that initial data is being created in categories table in mysql 