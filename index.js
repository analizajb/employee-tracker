const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const { TimeoutError } = require('rxjs');
const db = require('./db/connection');
require('console.table');

// Function declaration: hoisting.
function promptUser() {
    inquirer.prompt (
        [
            // Obj notation
            { 
            message: 'What would department would you like to view?',
            name: 'choice',
            type: 'list',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
        },
           
        ]
    )
    .then((
        answers
    ) => {
        let choice = answers.choice;
        if (choice === 'view all employees') {
            viewAllEmployees();
        } else if (choice === 'quit') {
            quitPrompts();
        }
    }) 
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
}

function viewDeptEmp() {
    db.query (
        'SELECT * FROM',
        (error, results) => {
            if (error) {
                throw error;
            }
            console.table(results);
            promptUser();
        }
    )
}


function quitPrompts() {
    console.table("Goodbye!")
    process.exit()
}

promptUser();
