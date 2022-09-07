const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");

// Prompt user for choices
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Select from the following choices...",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      const { choice } = answer;

      switch (choice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee":
          updateEmployee();
          break;
        default:
          db.end();
      }
    });
};

// Display departments
const viewAllDepartments = () => {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err,res) => {
    if(err) throw err;
    console.table('Departments:', res);
    promptUser();
  })
}

// Display roles
const viewAllRoles = () => {
  const sql = 'SELECT * FROM role';
  db.query(sql, (err,res) => {
    if(err) throw err;
    console.table('Roles:', res);
    promptUser();
  })
}

// Display employees
const viewAllEmployees = () => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err,res) => {
    if(err) throw err;
    console.table('Employees:', res);
    promptUser();
  })
}

promptUser();
