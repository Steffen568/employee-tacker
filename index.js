const inquirer = require('inquirer')
const mysql = require('mysql2')
const conTable = require('console.table')
const db = require('./config/connection')


// Connect to sql database, then promp main menu
db.connect(err => {
    if(err) throw err
    console.log(`
    ==============================
    CONNECTED TO EMPLOYEE DATABASE
    ==============================
    `)
    mainMenue()
})

const mainMenue = () => {
    inquirer.prompt({
        type: 'list',
        name: 'mainMenu',
        message: "SELECT FROM THE MENU BELOW",
        choices: [
            'View all Departments',
            'View all Positions',
            'View all Employees',
            'Add Department to database',
            'Add Position to database',
            'Add Employee to database',
            'Updata Employee',
            'Exit'
        ]
    })
    .then(response => {
        switch (response.mainMenu) {
            case 'View all Departments':
                departments()
                break
            case 'View all Positions':
                positions()
                break
            case 'View all Employees':
                employees()
                break
            case 'Add Department to database':
                addDepartment()
                break
            case 'Add Position to database':
                addPosition()
                break
            case 'Add Employee to database':
                addEmployee()
                break
            case 'Update Employee':
                updateEmployee()
                break
            case 'Exit':
                db.end(err => {
                    if (err) {
                        return console.log(err)
                    }
                    console.log(`
                        ========================
                            SESSION HAS ENDED
                        ========================    
                    `)
                })
        }
    })
}

// show departments table
const departments = () => {
    db.query(`SELECT * FROM departments`, function (err, res) {
        if(err) throw err
        console.table(res)
        mainMenue()
    })
}

// show positions table
const positions = () => {
    db.query(`SELECT * FROM positions`, function (err, res) {
        if(err) throw err
        console.table(res)
        mainMenue()
    })
}

const employees = () => {
    db.query(
     'SELECT employees.id, employees.first_name, employees.last_name, positions.title, departments.name, positions.salary FROM ((departments JOIN positions ON departments.id = positions.department_id) JOIN employees ON positions.id = employees.position_id);',
        function (err, res) {
        if (err) throw err
        console.table(res)
        mainMenue()
        }
    )
}
