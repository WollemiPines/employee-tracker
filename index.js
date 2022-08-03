const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'Big-shark420',
    database: 'school_people'
  },
  console.log(`Connected to the school_people database.`)
);

const introPage = () => {
    return  inquirer.prompt([  
    {
      type: 'list',
      name: 'intro_page',
      message: 'Hi, welcome to the school people database, where you can...',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    },]
    )
    .then(response => {
        switch(response.intro_page){
            case 'view all departments': 
                console.log("view all departments");
                db.query('SELECT ALL name AS departments FROM department', function (err, results) { 
                console.table(results);});
                break;
            case 'view all roles':
                console.log("view all roles");
                db.query('SELECT ALL title AS roles FROM role', function (err, results) { 
                console.table(results);});
                break;
            case 'view all employees':
                console.log("view all employees");
                db.query('SELECT ALL id, first_name, last_name, role_id FROM employee', function (err, results) { 
                console.table(results);});
                break;
            case 'add a department':
                break;
            case 'add a role':
                break;
            case 'add an employee':
                break;
            case 'update an employee role':
                break;
            default: console.log("Please select an option")
                    introPage();
        }
    })
    }
    //.then((response) =>{console.info(response.intro_page)})
    // db.query('SELECT COUNT(id) AS total_employees FROM employee', function (err, results) { 
    //     console.log(results);
    // })

// // Query database using COUNT() and GROUP BY
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//   console.log(results);
// });

// // Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//   console.log(results);
// });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

introPage();