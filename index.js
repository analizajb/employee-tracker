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
         choices: [
         'View all departments',  
         'View all roles', 
         'View all employees', 
         'Add a department', 
         'Add a role', 
         'Add an employee', 
         'Update an employee role', 
         'Quit'
         ]
        },
    ])
    .then((answers) => {
        let choice = answers.choice;
        if (choice === 'view all departments') {
            viewAllDepts();
        } else if (choice === 'view all roles') {
            viewAllRoles();
        } else if (choice === 'view all employees') {
            viewAllEmployees();
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
        'SELECT * FROM role',
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
        'SELECT * FROM employee',
        (error, results) => {
            if (error) {
                throw error;
            }
            console.table(results);
            promptUser();
        }
    )
};

function 



function quitPrompts() {
    console.table("Goodbye!")
    process.exit()
}

promptUser();
