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
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function runApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Would you like to Add or View?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employees role", "Quit"],
        }
    ])
        .then(function (answer) {
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
            else if (answer.postOrBid === "View all roles") {
                bidAuction();
            } else {
                connection.end();
            }
        });
}
function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) {
            throw err;
        }
        console.log("");
        console.table(res);
        runApp()
    })
}

function ViewAllRoles() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) {
            throw err;
        }
        console.log("")
        console.table(res)
        runApp()
    })
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) {
            throw err;
        }
        console.table(res)
        runApp()
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentToAdd',
            message: 'What is the name of the department you would like to add?'
        }])
        .then(function (answer) {
            connection.query(`INSERT INTO department (name) VALUE ("${answer.departmentToAdd}")`, function (err, res) {
                console.log(`Department ${answer.departmentToAdd} has been added!`)
                runApp()
            })
        })

}


function addRole() {
    connection.query('SELECT * FROM department', function (err, res) {
        let allDepartmentNames = [];
        res.forEach(element => {
            allDepartmentNames.push(element.name)
        });
        let result = inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the title of the role you would like to add?'
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: 'What is the roles salary?'
            },
            {
                type: 'list',
                name: 'department_id_name',
                message: 'Which department does this role belong to?',
                choices: allDepartmentNames
            }])
            .then(function (answer) {
                //console.log("This is a test of the emergency console logging system. This is not a real emergency.", result);

                // connection.query(`(SELECT id FROM department WHERE ${department_id_name} = name)`, function(err, res){
                //     let departmentIdNumber = res;
                // })

                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleName}", "${answer.roleSalary}", "${departmentIdNumber}");`, function (err, res) {
                    console.log(`Department "${answer.roleToAdd}" has been added!`)
                    runApp()
                })
            })
    })

}

function REEEEEEEEEEEEEPLACEME() {

    connection.query('SELECT * FROM role', function (err, res) {
        if (err) {
            throw err;
        }
        console.table(res)
        runApp()
    })
}

function REEEEEEEEEEEEEPLACEME() {

    connection.query('SELECT * FROM role', function (err, res) {
        if (err) {
            throw err;
        }
        console.table(res)
        runApp()
    })
}
runApp()