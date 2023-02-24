const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql2');
const express = require('express');
const cTable = require('console.table');

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.db_password,
    database: 'workplace_db'
  },
  console.log(`Successfully connected to the workplace_db database!`)
);


const promptUser = async () => {
    const data = await inquirer
    
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'Select an Action:',
        choices: ['View All Depts','View All Roles','View All Employees', 'Add a Dept', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
      }
    ])
  
    if (data.options === "View All Depts") {
        // show department table including dept names and ids
        db.query(
        'SELECT d.id as "Dept ID", d.name as "Department" \
        FROM department d ORDER BY d.id ASC', 

        function (err, results) {
          console.table(results);

          promptUser();
        });
        
      } else if (data.options === "View All Roles") {
        // show role table including job title, role id, dept, salary
        db.query(
        'SELECT r.title as "Job Title", r.id as "Role ID", d.name as "Department", r.salary as "Salary" \
        FROM role r \
        JOIN department d on r.department_id = d.id \
        ORDER BY r.title ASC', 

        function (err, results) {
          console.table(results);

          promptUser();
        });

      } else if (data.options === "View All Employees") {
        //show employees table including employee ids, first names, last names, job titles, departments, salaries, and managers
        db.query(
        'SELECT e.id as "EID", CONCAT(e.first_name," ", e.last_name) as "Employee Name", \
                r.title as "Title", d.name as "Department", r.salary as "Salary", e.manager_id as "Manager ID" \
        FROM employee e \
        LEFT JOIN role r on r.id = e.role_id \
        LEFT JOIN department d on d.id = r.department_id \
        ORDER BY e.id ASC', 

        function (err, results) {
          console.table(results);

          promptUser();
        });

      } else if (data.options === "Add a Dept") {
        inquirer.prompt( [
          {
            type: 'input',
            name: 'deptName',
            message: 'Enter Department Name:',
          }
        ])
        .then(response => {
          db.query(
            'INSERT INTO department (name) VALUE (?)', 
          [response.deptName],

          function (err, res) {
            if (err) throw err;
            console.log(`${response.deptName} has been added to the department table!`);

            promptUser();
            })
       });

      } else if (data.options === "Add a Role") {
        inquirer.prompt( [
          {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter Title of the Role:',
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter Salary of the Role',
          },
          {
            type: 'input',
            name: 'roleDeptID',
            message: 'Enter Department ID of Role:',
          }
        ])
        .then(response => {
        db.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
          [response.roleTitle, response.roleSalary, response.roleDeptID],

          function (err, res) {
            if (err) throw err;
          console.log(`The ${response.roleTitle} role has been added to the role table with a salary of $${response.roleSalary} and department ID of ${response.roleDeptID}!`);

          promptUser();
          })
        });

      } else if (data.options === "Add an Employee") {
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter Employees First Name:',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter Employees Last Name:',
          },
          {
            type: 'input',
            name: 'roleId',
            message: 'Enter Employees Role ID:',
          },
          {
            type: 'input',
            name: 'managerID',
            message: 'Enter Employee Managers ID:',
          }
        ])
        .then(response => {
        db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [response.firstName, response.lastName, response.roleId, response.managerID],
        
        function (err, res) {
          if (err) throw err;
          console.log(`${response.firstName} ${response.lastName} has been added to the employee table!`);

          promptUser(); 
        })
      })

      } else if (data.options === "Update an Employee Role") {
        inquirer.prompt( [
      {
        type: 'input',
        name: 'empID',
        message: 'Please Enter the ID of the Employee You Wish to Update',
      },
      {
        type: 'input',
        name: 'roleID',
        message: 'Please Enter Employees New Role ID:',
      }
      ])
      .then(response => {
      db.query(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [response.roleID, response.empID],

      function (err, res) {
        if (err) throw err;
        console.log(`Employee number ${response.empID}'s role has been updated!`);

    promptUser(); 
    })
  })
}}

promptUser()
