// TODO: DONE Include packages needed for this application
import inquirer from 'inquirer';

import mysql from 'mysql';

var con;

// TODO: Create a function to initialize app
function init() {
  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Swabi1234",
    database: "hw12"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS department (id INT AUTO_INCREMENT primary key NOT NULL, name VARCHAR(30))";
    con.query(sql, function (err, result) {
      if (err) throw err;

      var sql2 = "CREATE TABLE IF NOT EXISTS role (id INT AUTO_INCREMENT primary key NOT NULL, title VARCHAR(30), salary DECIMAL, department_id INT)";
      con.query(sql2, function (err, result) {
        if (err) throw err;

        var sql3 = "CREATE TABLE IF NOT EXISTS employee (id INT AUTO_INCREMENT primary key NOT NULL, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)";
        con.query(sql3, function (err, result) {
          if (err) throw err;
          showMenu();
        });
      });
    });
  });
}

function showMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'menuChoice',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }
  ])
  .then((answers) => {
    if (answers.menuChoice === 'View All Employees') {
      viewAllEmployees();
    } else if (answers.menuChoice === 'Add Employee') {
      addEmployee();
    } else if (answers.menuChoice === 'Update Employee Role') {
      updateEmployeeRole();
    } else if (answers.menuChoice === 'View All Roles') {
      viewAllRoles();
    } else if (answers.menuChoice === 'Add Role') {
      addRole();
    } else if (answers.menuChoice === 'View All Departments') {
      viewAllDepartments();
    } else if (answers.menuChoice === 'Add Department') {
      addDepartment();
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

function viewAllEmployees() {
  var sql = "SELECT * FROM employee";
  
  con.query(sql, function (err, result) {
    if (err) throw err;

    console.table(result);

    showMenu();
  });
}

function addEmployee() {
  var sql = "SELECT * FROM role";
  
  con.query(sql, function (err, result) {
    if (err) throw err;

    var json = JSON.stringify(result);
    
    var jsonObj = JSON.parse(json);

    var jsonArr = [];

    for (var i = 0; i < jsonObj.length; ++i) {
      var jsonItem = jsonObj[i];

      jsonArr.push({
        name: jsonItem.title,
        value: jsonItem.id
      });
    }

    inquirer.prompt([
    {
      name: 'firstName',
      message: 'Enter first name: '
    },
    {
      name: 'lastName',
      message: 'Enter last name: '
    },
    {
      type: 'list',
      name: 'roleID',
      message: 'Which role?',
      choices: jsonArr
    },
    {
      type: 'list',
      name: 'managerID',
      message: 'Which manager?',
      choices: jsonArr
    }
    ])
    .then((answers) => {
      var sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + answers.firstName + "', '" + answers.lastName + "', " + answers.roleID + ", " + answers.managerID + ") ";
  
      con.query(sql, function (err, result) {
        if (err) throw err;

        showMenu();
      });  
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  });
}

function updateEmployeeRole() {
  var sql = "SELECT * FROM employee";
  
  con.query(sql, function (err, result) {
    if (err) throw err;

    var json = JSON.stringify(result);
    
    var jsonObj = JSON.parse(json);

    var jsonArr = [];
    
    var employeeID;

    for (var i = 0; i < jsonObj.length; ++i) {
      var jsonItem = jsonObj[i];

      jsonArr.push({
        name: jsonItem.first_name + " " + jsonItem.last_name,
        value: jsonItem.id
      });
    }

    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeID',
        message: 'Which employee?',
        choices: jsonArr
      }
      ])
      .then((answers) => {
        var sql = "SELECT * FROM role";
  
        con.query(sql, function (err, result) {
          if (err) throw err;

          var json2 = JSON.stringify(result);
          
          var jsonObj2 = JSON.parse(json2);

          var jsonArr2 = [];

          for (var i = 0; i < jsonObj2.length; ++i) {
            var jsonItem = jsonObj2[i];

            jsonArr2.push({
              name: jsonItem.title,
              value: jsonItem.id
            });
          }

          updateEmployeRolePrompt(jsonArr2, answers.employeeID);
        }); 
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
});
}

function updateEmployeRolePrompt(jsonArr, employeeID) {
  inquirer.prompt([
    {
      name: 'firstName',
      message: 'Enter first name: '
    },
    {
      name: 'lastName',
      message: 'Enter last name: '
    },
    {
      type: 'list',
      name: 'roleID',
      message: 'Which role?',
      choices: jsonArr
    },
    {
      type: 'list',
      name: 'managerID',
      message: 'Which manager?',
      choices: jsonArr
    }
    ])
    .then((answers) => {
      var sql = "UPDATE employee SET first_name = '" + answers.firstName + "' , last_name = '" + answers.lastName + "', role_id = " + answers.roleID + ", manager_id = " + answers.managerID + 
        " WHERE id = " + employeeID;
  
      con.query(sql, function (err, result) {
        if (err) throw err;

        showMenu();
      });  
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function viewAllRoles() {
  var sql = "SELECT * FROM role";
  
  con.query(sql, function (err, result) {
    if (err) throw err;

    console.table(result);

    showMenu();
  });
}

function addRole() {
  var sql = "SELECT * FROM department";
  
  con.query(sql, function (err, result) {
    if (err) throw err;

    var json = JSON.stringify(result);
    
    var jsonObj = JSON.parse(json);

    var jsonArr = [];

    for (var i = 0; i < jsonObj.length; ++i) {
      var jsonItem = jsonObj[i];

      jsonArr.push({
        name: jsonItem.name,
        value: jsonItem.id
      });
    }

    inquirer.prompt([
    {
      name: 'title',
      message: 'Enter title: '
    },
    {
      name: 'salary',
      message: 'Enter salary: '
    },
    {
      type: 'list',
      name: 'departmentID',
      message: 'Which department?',
      choices: jsonArr
    }
    ])
    .then((answers) => {
      var sql = "INSERT INTO role (title, salary, department_id) VALUES ('" + answers.title + "', " + answers.salary + ", " + answers.departmentID + ") ";
  
      con.query(sql, function (err, result) {
        if (err) throw err;

        showMenu();
      });  
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  });
}

function viewAllDepartments() {
  var sql = "SELECT * FROM department";
  
  con.query(sql, function (err, result) {
    if (err) throw err;

    console.table(result);

    showMenu();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      name: 'departmentName',
      message: 'Enter department name?'
    }
  ])
  .then((answers) => {
    
    var sql = "INSERT INTO department (name) VALUES ('" + answers.departmentName + "') ";
  
    con.query(sql, function (err, result) {
      if (err) throw err;

      showMenu();
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}


// Function call to initialize app
init();
