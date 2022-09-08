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
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please enter the department name you'd like to add",
      },
    ])
    .then((answer) => {
      const { department } = answer;
      const sql = `SELECT * FROM department where name = ?`;

      db.query(sql, department, (err, res) => {
        if (err) throw err;

        if (res.length) {
          console.log(`${department} already exists in the database.`);
          promptUser();
        } else {
          const add = `INSERT INTO department(name)
        VALUES (?)`;
          db.query(add, department, (err, res) => {
            if (err) throw err;
            console.log(
              `${department} has been successfully added to the database!`
            );
            promptUser();
          });
        }
      });
    });
};

// Add a role
const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: "Please enter the role you'd like to add.",
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the expected salary for this role?',
    }
  ])
  .then(roleData => {
    const {role, salary} = roleData;
    
    // List departments to choose from
    const deptList  = 'SELECT * FROM department';
    db.query(deptList, (err,deptTable) => {
      if(err) throw err;
      const deptChosen = [];
      deptTable.forEach(deptInfo => deptChosen.push(deptInfo.name));

      // Link role to a department
      inquirer.prompt([
        {
          type: 'list',
          name: 'dept',
          message: 'Which department will this role belong to?',
          choices: deptChosen
        }
      ])
      .then(deptAnswer => {
        const {dept} = deptAnswer;
        const targetDept = deptTable.filter(deptInfo => deptInfo.name === dept);

        // Check if role, salary and dept_id already exist
        const roleSql = `SELECT * FROM role WHERE title = ? AND salary = ? AND department_id = ?`;
        const params = [role, salary, targetDept[0].id];
        db.query(roleSql, params, (err,res) => {
          if(err) throw err;

          // If existing role...
          if(res.length) {
            console.log(`${role} with a salary of ${salary} in the ${dept} department already exists in this database.`);
            promptUser();
          }
          // If no existing role...
          else {
            const addSql = `INSERT INTO role(title, salary, department_id)
              VALUES(?,?,?)`;
            db.query(addSql, params, (err, res) => {
              if(err) throw err;

              console.log(`${role} has been successfully added to the database.`);
              promptUser();
            })
          }
        })
      })
    })
  })
}

promptUser();
