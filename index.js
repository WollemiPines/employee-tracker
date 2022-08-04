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
                db.query('SELECT department.id, department.name FROM department', function (err, results) { 
                console.table(results);
                returnFun();});
                break;

            case 'view all roles':
                db.query(`SELECT role.title, role.id, role.salary, department.name AS department FROM role
                RIGHT JOIN department on role.department_id = department.id;`, function (err, results) { 
                console.table(results);
                returnFun();
                if (err) {
                    return console.error(err.message);}});
                break;

            case 'view all employees':
                db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
                AS department, role.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
                LEFT JOIN role on employee.role_id = role.id 
                LEFT JOIN department on role.department_id = department.id 
                LEFT JOIN employee manager on manager.id = employee.manager_id;`, function (err, results) { 
                console.table(results);
                returnFun();
                if (err) {
                    return console.error(err.message);}});
                break;

            case 'add a department':
                return inquirer.prompt([ {
                    type: 'text',
                    name: 'dept_add',
                    message: 'What is the deptartment called?'
                },]).then(response => {
                    let newDept = response.dept_add;
                    console.log(newDept);
                    db.query(`INSERT INTO department(name)
                    VALUES (?)`,[newDept], function (err, results) { 
                    db.query("SELECT * FROM department", function (err, results) {
                        console.table(results);
                        returnFun();
                        if (err) {
                        return console.error(err.message);}} );
                    if (err) {
                        return console.error(err.message);}})});
                    break;

            case 'add a role':
                returnFun();
                break;

            case 'add an employee':
                returnFun();
                break;

            case 'update an employee role':
                returnFun();
                break;

            default: console.log("Please select an option")
                    introPage();
        }
    })
    }

const returnFun = () => {
    return  inquirer.prompt([  
        {
          type: 'list',
          name: 'rtn_fun',
          message: 'Whats next?',
          choices: ['Return', 'Quit']
        },]
        ).then(response => {
            if(response.rtn_fun === 'Return'){
                introPage();
            }
            else if (response.rtn_fun === 'Quit'){
                process.exit();
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