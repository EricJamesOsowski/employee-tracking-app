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
                name: 'department_id',
                message: 'Which department does this role belong to?',
                choices: allDepartmentNames
            }])
            .then(function (answer) {
                let departmentIdNumber = '';
                connection.query(`(SELECT id FROM department WHERE "${answer.department_id}" = name)`, function (err, res) {
                    departmentIdNumber = res[0].id;
                    connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.roleName}', ${answer.roleSalary}, ${departmentIdNumber})`, function (err, res) {
                        console.log(`Role "${answer.roleName}" has been added with salary ${answer.roleSalary} and id number ${departmentIdNumber}`)
                        runApp()
                    })
                })



            })
    })

}

function addEmployee() {
    connection.query('SELECT * FROM employee', function (err, res) {
        let allEmployeesFullNames = [];
        res.forEach(element => {
            allEmployeesFullNames.push(element.first_name + " " + element.last_name)
        })

        connection.query('SELECT * FROM role', function (err, res) {
            let allRoles = [];
            res.forEach(element => {
                allRoles.push(element.title)
            })
            let result = inquirer.prompt([
                {
                    type: 'input',
                    name: 'empFirstName',
                    message: 'What is the employees first name'
                },
                {
                    type: 'input',
                    name: 'empLastName',
                    message: 'What is the employees last name?'
                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: 'What role does this employee have in the company?',
                    choices: allRoles
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: 'Who is this employees manager?',
                    choices: allEmployeesFullNames
                }])
                .then(function (answer) {
                    let empManagerFirstName = answer.empManager.split(" ");
                    empManagerFirstName = empManagerFirstName[0]
                    let roleIdNumber;
                    connection.query(`(SELECT id FROM role WHERE "${answer.empRole}" = title)`, function (err, res) {
                        roleIdNumber = res[0].id;
                        connection.query(`SELECT id FROM employee WHERE '${empManagerFirstName}' = first_name`, function (err, res) {
                            let manager_id_number = res[0].id;
                            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.empFirstName}', '${answer.empLastName}', '${roleIdNumber}', '${manager_id_number}')`, function (err, res) {
                                console.log("Employee has been added!")
                                runApp()
                            })
                        })
                    })
                })
        })
    })
}

function updateEmployee() {
    connection.query('SELECT * FROM employee', function (err, res) {
        let allEmployeesFullNames = [];
        res.forEach(element => {
            allEmployeesFullNames.push(element.first_name + " " + element.last_name);
        })
        connection.query('SELECT * FROM role', function (err, res) {
            let allRoles = [];
            res.forEach(element => {
                allRoles.push(element.title)
            })
            let result = inquirer.prompt([
                {
                    type: 'list',
                    name: 'empToUpdate',
                    message: 'Which employee would you like to update?',
                    choices: allEmployeesFullNames
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: 'What is the employees new role?',
                    choices: allRoles
                }])
                .then(function (answer) {
                    let empFirstName = answer.empToUpdate.split(" ");
                    empFirstName = empFirstName[0];
                    connection.query(`SELECT id FROM employee WHERE first_name = '${empFirstName}'`, function (err, res) {
                        empIdToUpdate = res[0].id
                        connection.query(`SELECT id FROM role WHERE title = '${answer.empManager}'`, function (err, res) {
                            let newRoleId = res[0].id;
                            connection.query(`UPDATE employee SET role_id = '${newRoleId}' WHERE id = '${empIdToUpdate}';`, function (err, res) {
                                console.log('Employee role has been updated!')
                                runApp()
                            })
                        })
                    })
                })
        })

    })
}
runApp()

// connection.query('SELECT * FROM role', function (err, res) {

// })