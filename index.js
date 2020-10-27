const mysql = require("mysql");
const inquirer = require("inquirer")
const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employeeDb"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});
  function runApp(){
      inquirer.prompt([
          {
              type: "list",
              name: "options",
              message: "Would you like to Add or View?",
              choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employees role", "Quit"],
          }
  ])
  .then(function(answer) {
    // based on their answer, either call the bid or the post functions
    switch (answer.options) {
        case "View all departments":
          return viewAllDepartments();
        case "View all roles":
          return ViewAllRoles();
        case "View all employees":
          return viewAllEmployees();
        case "Add a department":
          return addDepartment();
        case "Add a role":
          return addRole();
        case "Add an employee":
          return addEmployee();
        case "Update employees role":
          return updateEmployee();
        case "Quit":
            return process.exit();
    }
    if (answer.postOrBid === "View all departments") {
      postAuction();
    }
    else if(answer.postOrBid === "View all roles") {
      bidAuction();
    } else{
      connection.end();
    }
  });
  }
  function viewAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res){
        if (err){
            throw err;
        }
        for (let i = 0; i < res.length; i++) {
            console.log(`Employee ID: ${res[i].id} Employee Name: ${res[i].name}`)
        }
        runApp()
    })
  }

  function ViewAllRoles() {
    connection.query('SELECT * FROM role', function(err, res){
        if (err){
            throw err;
        }
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log(`Employee ID: ${res[i].id} Department Name: ${res[i].title}`)
        }
        runApp()
    })
  }

  function viewAllEmployees() {
    connection.query('SELECT * FROM employee', function(err, res){
        if (err){
            throw err;
        }
        console.table(res);
        for (let i = 0; i < res.length; i++) {
            console.table(res)
        }
        runApp()
    })
  }

  function peepeepoopoohammer() {

    connection.query('SELECT * FROM role', function(err, res){
        if (err){
            throw err;
        }
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log(`Employee ID: ${res[i].id} Employee Name: ${res[i].title}`)
        }
        runApp()
    })
  }

  function ViewAllRoles() {

    connection.query('SELECT * FROM role', function(err, res){
        if (err){
            throw err;
        }
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log(`Employee ID: ${res[i].id} Employee Name: ${res[i].title}`)
        }
        runApp()
    })
  }

  function ViewAllRoles() {
    // let x = "SELECT * FROM role"
    connection.query('SELECT * FROM role', function(err, res){
        if (err){
            throw err;
        }
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log(`Employee ID: ${res[i].id} Employee Name: ${res[i].title}`)
        }
        runApp()
    })
  }

  function ViewAllRoles() {
    // let x = "SELECT * FROM role"
    connection.query('SELECT * FROM role', function(err, res){
        if (err){
            throw err;
        }
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log(`Employee ID: ${res[i].id} Employee Name: ${res[i].title}`)
        }
        runApp()
    })
  }
  runApp()