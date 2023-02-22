const inquirer = require("inquirer")
const fs = require('fs')
const mysql = require('mysql2');
const express = require('express');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'workplace_db'
  },
  console.log(`Connected to the workplace_db database.`)
);


// let Depts =[]
// let Roles = []
// let Employees = []

const promptUser = async () => {
    const data = await inquirer
    
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'Select an action:',
        choices: ['View All Depts','View All Roles','View All Employees', 'Add A Dept', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
      },
      {
        type: 'input',
        name: 'dept',
        message: 'Please Enter Department Name:',
        when: (Depts) => Depts.options === 'Add A Dept',
      },
  
      {
        type: 'input',
        name: 'role',
        message: 'Please Enter Role Name:',
        when: (Roles) => Roles.options === 'Add a Role',
      },
  
      {
        type: 'input',
        name: 'employee',
        message: 'Please Enter Employee Full Name:',
        when: (Employees) => Employees.options === 'Add an Employee',
      },
    ])

    if (data.options === "View All Depts") {
        // show dept table including dept names and ids
        db.query('SELECT * FROM department', function (err, results) {
          console.table(results);
        });
        ///
      } else if (data.options === "View All Roles") {
        // show roles table including job title, role id, dept, salary
        db.query('SELECT * FROM role', function (err, results) {
          console.table(results);
        });

      } else if (data.options === "View All Employees") {
        //show employees table including employee ids, first names, last names, job titles, departments, salaries, and managers
        db.query('SELECT * FROM employee', function (err, results) {
          console.table(results);
        });

      } else if (data.options === "Add a Dept") {
        Depts.push(data.dept)
        console.log(Depts)

      } else if (data.options === "Add a Role") {
        Roles.push(data.role)
        console.log(Roles)

      } else if (data.options === "Add an Employee") {
        Employees.push(data.employee)
        console.log(Employees)
      } 
}

promptUser()



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//inquirer prompt 

    //options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

//if user selects view all dept: formatted table showing department names and department ids will appear

// if user selects view all roles: formatted table showing job title, role id, the department that role belongs to, and the salary for that role will appear

// if user selects view all employees: formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// if user selects option to to add a department: they are prompted to enter the name of the department and that department is added to the database

// if user selects option to add a role: they are prompted to enter the name, salary, and department for the role and that role is added to the database

// if user selects option to add an employee: they are prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// if user selects option to update an employee role: they are prompted to select an employee to update and their new role and this information is updated in the database

