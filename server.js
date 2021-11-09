const express = require('express');
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

            case "Add a department":

                const adddepartment = await addDepartment();
                console.table(adddepartment[0]);
                menustart()
                break;

            case "View all employees":

                const employees = await viewEmployees();
                console.table(employees[0]);
                menustart()
                break;
            case "Add a role":

                const addrole = await addRole();
                console.table(addrole[0]);
                menustart()
                break;
            case "Add an employee":

                const addemployee = await addEmployee();
                console.table(addemployee[0]);
                menustart()
                break;
            case "Update an employee role":

                const updateemployee = await updateEmployee();
                console.table(updateemployee[0]);
                menustart()
                break;
            default:
                process.exit();
        }
    })
}