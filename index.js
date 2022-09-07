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
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("Departments:", res);
    promptUser();
  });
};

// Display roles
const viewAllRoles = () => {
  const sql = `SELECT role.id, role.title as role, role.salary, department.name AS department 
    FROM role 
    LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("Roles:", res);
    promptUser();
  });
};

// Display employees
const viewAllEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, 
  IF (ISNULL(employee.manager_id)=1, 'null', CONCAT(manager.first_name, ' ', manager.last_name)) AS manager 
  FROM employee
  LEFT JOIN role on employee.role_id = role.id
  LEFT JOIN department on role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("Employees:", res);
    promptUser();
  });
};

// Add department
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: "Please enter the department name you'd like to add",
    }
  ])
  .then(answer => {
    const {department} = answer;
    const sql = `SELECT * FROM department where name = ?`;

    db.query(sql, department, (err, res) => {
      if(err) throw err;

      if(res.length) {
        console.log(`${department} already exists in the database.`);
        promptUser();
      } else {
        const add = `INSERT INTO department(name)
        VALUES (?)`;
        db.query(add, department, (err, res) => {
          if(err) throw err;
          console.log(`${department} has been successfully added to the database!`);
          promptUser();
        })
      }
    }) 
  })
}


promptUser();
