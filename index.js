const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const { response } = require('express');

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
                return  addRoleFn();
                break;

            case 'add an employee':
                return inquirer.prompt([ {
                    type: 'text',
                    name: 'emp_firstN',
                    message: 'What is their First Name?'
                },{
                    type: 'text',
                    name: 'emp_lastN',
                    message: 'What is their Last Name?'
                },
                {   type: 'text',
                    name: 'emp_role',
                    message: 'What is their role?'
                },{
                    type: 'text',
                    name: 'emp_manager',
                    message: 'Who is their manager?'
                },]).then(response => {
                    let empFN = response.emp_firstN;
                    let empLN = response.emp_lastN;
                    let empRole = response.emp_role;
                    let empMan = response.emp_manager;
                    db.query(`INSERT INTO employee(first_name, last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager)
                    VALUES (?, ?, ?)`,[empFN, empLN, getRoleIdByTitle("'Principal'")]);
                    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
                AS department, role.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
                LEFT JOIN role on employee.role_id = role.id 
                LEFT JOIN department on role.department_id = department.id 
                LEFT JOIN employee manager on manager.id = employee.manager_id;`, function (err, results) {
                        console.table(results);
                        returnFun();
                        if (err) {
                        return console.error(err.message);
                    }
                });
            });

            case 'update an employee role':
                returnFun();
                break;

            default: console.log("Please select an option")
                    introPage();
        }
    })
    }

    async function addRoleFn(){
        inquirer.prompt([ {
            type: 'text',
            name: 'role_add',
            message: 'What is the role called?'
        },{
            type: 'text',
            name: 'salary_add',
            message: 'What is the salary?'
        },
        {   type: 'text',
            name: 'related_department',
            message: 'What is related department?'
        },]); 
         async function res1(response) {

            let newRole = await response.role_add;
            let newSal = await response.salary_add;
            let relDept = await response.related_department;
            let newRes = await getDeptByName("'"+ relDept + "'")

             db.query(`INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`,[newRole, newSal, newRes])
            
             db.query(`SELECT role.title, role.id, role.salary, department.name AS department FROM role
            RIGHT JOIN department on role.department_id = department.id;`, function (err, results) {
                console.table(results);
                returnFun();
                if (err) {
                    return console.error(err.message);
                       }
            })}
            res1();
};

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

function getDeptById(deptId){
    db.query('SELECT name FROM department WHERE id=id;' , function (err, results) { 
        return results[0].name;
        if (err){
            return console.error(err.message);  }
    })}

function getDeptByName(deptName){
    db.query('SELECT * FROM department WHERE department.name= '+ deptName+';' , function (err, results) { 
return results[0].id;

        if (err){
            return console.error(err.message);  }
    })}

function getRoleIdByTitle(roleTitle){
    db.query('SELECT id FROM role WHERE role.title= '+ roleTitle+';' , function (err, results) { 
return results[0].id;
        if (err){
            return console.error(err.message);  }
})}


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

introPage();