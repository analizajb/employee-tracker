const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const { TimeoutError } = require('rxjs');
const db = require('./db/connection');
require('console.table');

// Function declaration: hoisting.
function promptUser() {
    inquirer
        .prompt ([
        // Obj notation
        { 
         message: 'What would you like to do?',
         name: 'choice',
         type: 'list',
         choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        },
    ])
    .then((answers) => {
        let choice = answers.choice;
        if (choice === 'View all departments') {
            viewAllDepts();
        } else if (choice === 'View all roles') {
            viewAllRoles();
        } else if (choice === 'View all employees') {
            viewAllEmployees();
        } else if (choice === 'Quit') {
            quitPrompts();
        }
    }) 
}

function viewAllDepts() {
    db.query (
        'SELECT * FROM department',
        (error, results) => {
            if (error) {
                throw error;
            }
            console.table(results);
            promptUser();
        }
    )
}

function viewAllRoles() {
    db.query (
        'SELECT r.title AS Roles, r.salary AS "Salary", d.name AS "Departments" FROM roles r JOIN department d ON d.id = r.department_id ORDER BY Departments desc;',
        (error, results) => {
            if (error) {
                throw error;
            }
            console.table(results);
            promptUser();
        }
    )
}

function viewAllEmployees() {
    // This is a function
    db.query (
        'SELECT employee.first_name AS "Name" FROM employees;',
        (error, results) => {
            if (error) {
                throw error;
            }
            console.table(results);
            promptUser();
        }
    )
};

function addDepartment() {
    // Code to follow
}
function addRole() {
    // Code to follow
}
function addEmployee() {
    // Code to follow
}
function updateEmpRole() {

}




function quitPrompts() {
    console.table("Goodbye!")
    process.exit()
}

promptUser();
