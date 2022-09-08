const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");
const { param } = require("express/lib/request");

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
          "Delete department",
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
        case "Delete department":
          deleteDepartment();
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

// Add role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Please enter the role you'd like to add.",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the expected salary for this role?",
      },
    ])
    .then((roleData) => {
      const { role, salary } = roleData;

      // List departments to choose from
      const deptList = "SELECT * FROM department";
      db.query(deptList, (err, deptTable) => {
        if (err) throw err;
        const deptChosen = [];
        deptTable.forEach((deptInfo) => deptChosen.push(deptInfo.name));

        // Link role to a department
        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "Which department will this role belong to?",
              choices: deptChosen,
            },
          ])
          .then((deptAnswer) => {
            const { dept } = deptAnswer;
            const targetDept = deptTable.filter(
              (deptInfo) => deptInfo.name === dept
            );

            // Check if role, salary and dept_id already exist
            const roleSql = `SELECT * FROM role WHERE title = ? AND salary = ? AND department_id = ?`;
            const params = [role, salary, targetDept[0].id];
            db.query(roleSql, params, (err, res) => {
              if (err) throw err;

              // If existing role...
              if (res.length) {
                console.log(
                  `${role} with a salary of ${salary} in the ${dept} department already exists in this database.`
                );
                promptUser();
              }
              // If no existing role...
              else {
                const addSql = `INSERT INTO role(title, salary, department_id)
              VALUES(?,?,?)`;
                db.query(addSql, params, (err, res) => {
                  if (err) throw err;

                  console.log(
                    `${role} has been successfully added to the database.`
                  );
                  promptUser();
                });
              }
            });
          });
      });
    });
};

// Add employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the employee's first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the employee's last name",
      },
    ])
    .then((employeeName) => {
      const { first_name, last_name } = employeeName;

      // List roles to choose from
      db.query("SELECT * FROM role", (err, roleTable) => {
        if (err) throw err;
        const roleChosen = [];
        roleTable.forEach((roleInfo) => roleChosen.push(roleInfo.title));

        // Continue prompt to select role
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roleChosen,
            },
          ])
          .then((roleAnswer) => {
            const { role } = roleAnswer;
            const targetRole = roleTable.filter(
              (roleInfo) => roleInfo.title === role
            );

            // Select a manager
            db.query("SELECT * FROM employee", (err, empTable) => {
              if (err) throw err;

              // List managers to choose from
              const managerChosen = [];
              empTable.forEach((empInfo) =>
                managerChosen.push(empInfo.first_name + " " + empInfo.last_name)
              );
              managerChosen.push("None");

              // Employee's manager input request
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Please enter the employee's manager",
                    choices: managerChosen,
                  },
                ])
                .then((managerAnswer) => {
                  // Gets manager information
                  const { manager } = managerAnswer;
                  let manager_id = null;
                  if (manager !== "None") {
                    const targetManager = empTable.filter(
                      (empInfo) =>
                        empInfo.first_name === manager.split(" ")[0] &&
                        empInfo.last_name === manager.split(" ")[1]
                    );
                    manager_id = targetManager[0].id;
                  }
                  // Add employee to database
                  const addSql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
              VALUES (?,?,?,?)`;
                  const params = [
                    first_name,
                    last_name,
                    targetRole[0].id,
                    manager_id,
                  ];
                  db.query(addSql, params, (err, res) => {
                    if (err) throw err;

                    console.log(
                      `${first_name} ${last_name} has been successfully added to the database.`
                    );
                    promptUser();
                  });
                });
            });
          });
      });
    });
};

// Update employee
const updateEmployee = () => {
  // All employees
  db.query("SELECT id,first_name, last_name FROM employee", (err, empTable) => {
    if (err) throw err;

    // List of employees
    const empChosen = [];
    empTable.forEach((empInfo) =>
      empChosen.push(empInfo.first_name + " " + empInfo.last_name)
    );

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Select the employee whose role you'd like to update.",
          choices: empChosen,
        },
      ])
      .then((answer) => {
        const { employee } = answer;
        const [first_name, last_name] = employee.split(" ");

        const updatedEmp = empTable.filter(
          (empInfo) =>
            empInfo.first_name === first_name && empInfo.last_name === last_name
        );
        const updatedEmpId = updatedEmp[0].id;

        // All roles
        db.query(`SELECT id, title FROM role`, (err, roleTable) => {
          if (err) throw err;
          // List of roles
          const roleChosen = [];
          roleTable.forEach((roleInfo) => roleChosen.push(roleInfo.title));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: ` Assign the updated role for ${employee}.`,
                choices: roleChosen,
              },
            ])
            .then((updatedRole) => {
              const { role } = updatedRole;
              const targetRole = roleTable.filter(
                (roleInfo) => roleInfo.title === role
              );
              const updatedRoleId = targetRole[0].id;

              // Update employee role to database
              const updateEmpRole = `Update employee
        SET role_id = ?
        WHERE id =?`;
              const params = [updatedRoleId, updatedEmpId];
              db.query(updateEmpRole, params, (err, res) => {
                if (err) throw err;
                console.log(
                  `${employee}'s role has been successfuly updated and added to the database!`
                );
                promptUser();
              });
            });
        });
      });
  });
};

// Delete department
const deleteDepartment = () => {
  db.query("SELECT * FROM department", function (err, res) {
    const departmentChosen = res.map(({ id, name }) => ({
        name: name,
        value: id,
    }));

    // prompts user to choose a department
    inquirer
        .prompt({
            name: "id",
            message: "Which department do you want to delete?",
            type: "list",
            choices: departmentChosen,
        })
        .then((department) => {
          const {deletedDepartment} = department;
            // queries database to remove the chosen department from the departments table
            db.query("DELETE FROM department WHERE id = ?", department.id, function (err, row) {
                if (err) throw err;
                console.log(`${deletedDepartment} has been deleted!`);
            });

            db.query("SELECT * FROM department", (err, res) => {
                console.table(res);
                promptUser();
            });
        });
});
};

promptUser();
