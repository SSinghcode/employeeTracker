const express = require('express');
const inquirer = require("inquirer")
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    'mysql://vo1k563fjcq1mght:xzkapkb7cgrqsspb@x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/snpf7b5yeg3jcrem'
);

const chooseQuestion = [
    {
        type: "list",
        message: "What you choosing ?",
        name: "choices",
        choices: [
            "View all the departments",
            "View all the roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit App",
        ],
    },
];

const menustart = () => {

    inquirer.prompt(chooseQuestion).then(async (answer) => {
        const answers = answer.choices;
        switch (answers) {
            case "View all the departments":

                const departments = await viewDepts();
                console.table(departments[0]);
                menustart()
                break;
            case "View all the roles":

                const role = await viewRoles();
                console.table(role[0]);
                menustart()
                break;

            case "View all employees":

                const employees = await viewEmployees();
                console.table(employees[0]);
                menustart()
                break;
            case "Add a department":

                const adddepartment = await addDepartment();
                let adddepartment2 = await viewDepts();
                console.table(adddepartment2[0]);
                menustart()
                break;

            case "Add a role":

                const addrole = await addRole();
                let addrole1 = await viewRoles();
                console.table(addrole1[0]);
                menustart()
                break;
            case "Add an employee":

                const addemployee = await addEmployee();
                let addemployee1 = await viewEmployees();
                console.table(addemployee1[0]);
                menustart()
                break;
            case "Update an employee role":

                const updateemployee = await updateEmployee();
                const updateemployee1 = await viewEmployees()
                console.table(updateemployee1[0]);
                menustart()
                break;
            default:
                process.exit();
        }
    })
}

function viewDepts() {
    let query = "select distinct name from snpf7b5yeg3jcrem.departments";
    return db.promise().query(query);
}
function viewRoles() {

    let query5 = "select title from snpf7b5yeg3jcrem.roles";
    return db.promise().query(query5);
}
function addDepartment() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "What is the name of the new department?",
            },

        ])
        .then((answer) => {
            const query1 = `
                    insert into departments (name)
                    values ("${answer.department}")`;
            db.promise().query(query1)
        })

}
function viewEmployees() {
    let query2 = `
  select first_name, last_name, title, salary, name AS department_name
  from  snpf7b5yeg3jcrem.employees
  join roles 
  on role_id = roles.id
  join departments
  on department_id = departments.id`;
    return db.promise().query(query2);
}
function addRole() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "rolename",
                message: "What is the title of the role?",
            },
            {
                type: "input",
                name: "rolesalary",
                message: "What is the salary of the role?",
            },
            {
                type: "input",
                name: "roledepartment",
                message: "What is the deptartment ID of the role?",
            },
        ])

        .then((answer) => {
            const sql = `
                       insert into roles (title, salary, department_id)
                       values ("${answer.rolename}","${answer.rolesalary}","${answer.roledepartment}")`;
            db.promise().query(sql)
        })

}
function addEmployee() {

    return inquirer
        .prompt([
            {
                type: "input",
                name: "femployee",
                message: "What is the first name of the employee?",
            },
            {
                type: "input",
                name: "lemployee",
                message: "What is the last name of the employee?",
            },
            {
                type: "input",
                name: "rid",
                message: "What is the role ID of the role?",
            },
            {
                type: "input",
                name: "mid",
                message: "What is the manager ID of the role?",
            },

        ])
        .then((answer) => {
            const query4 = `
                     insert into employees (first_name, last_name, role_id, manager_id)
                     values ("${answer.femployee}","${answer.lemployee}","${answer.rid}","${answer.mid}")`;
            db.promise().query(query4)
        })

}

function updateEmployee() {
    console.log("vd")
    process.exit;
}
menustart();


