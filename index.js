const inquirer = require('inquirer')
const mysql = require('mysql2')
const conTable = require('console.table')
const db = require('./config/connection')
const { profileEnd } = require('console')


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

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter new daprtment'
        }
    ])
    .then(input => {
        db.query(
            'INSERT INTO departments (department_name) VALUES (?)',
            [input.newDepartment],
            function (err, res) {
                if (err) throw err
                console.log(`
                =======================
                    DEPARTMENT ADDED
                =======================
                `)
                mainMenue()
            }
        )
    })
}

const addPosition = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newPosition',
            message: 'Please enter new poisiton title'
        },
        {
            tpye: 'input',
            name: 'newSalary',
            message: 'Please enter salary for new position'
        },
        {
            type: 'input',
            name: 'newDepId',
            message: 'Please eneter the department id'
        }
    ])
    .then(input => {
        db.query(
            'INSERT INTO positions (title, salary, department_id) VALUES (?, ?, ?)',
            [input.newPosition, input.newSalary, input.newDepId],
            function (err, res) {
                if (err) throw err
                console.log(`
                    =========================
                        NEW POSITION ADDED
                    =========================    
                    `
                )
                mainMenue()
            }
        )
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newFirst',
            message: 'Please enter first name of employee'
        },
        {
            type: 'input',
            name: 'newLast',
            message: 'Please enter last name of employee'
        },
        {
            type: 'input',
            name: 'newId',
            message: 'Please enter position id'
        },
        {
            type: 'input',
            name: 'manId',
            message: 'Please enter manager id'
        } 
    ])
    .then(input => {
        db.query(
            'INSERT INTO employees (first_name, last_name, position_id, manager_id) VALUES (?, ?, ?, ?)',
            [input.newFirst, input.newLast, input.newId, input.manId],
            function (err, res) {
                if (err) throw err
                console.log(`
                =========================
                    NEW EMPLOYEE ADDED
                =========================
                `
                )
                mainMenue()
            }
        )
    })
}