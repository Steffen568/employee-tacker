INSERT INTO departments (name)
VALUES
    ('Management'),
    ('Accounting'),
    ('Engineering'),
    ('Marketing'),
    ('Security'),
    ('Sales');


INSERT INTO positions (title, salary, department_id)
VALUES 
    ('CEO', 200000, 1 ),
    ('Branch Manager', 150000, 1),
    ('Manager', 100000, 1),
    ('Accountant', 70000, 2),
    ('Lead Engineer', 80000, 3),
    ('Junior Engineer', 50000, 3),
    ('Lead Marketer', 70000, 4),
    ('Marketer', 50000, 4),
    ('Head of Security', 50000, 5),
    ('Security Team Member', 45000, 5),
    ('Sales Associate', 3500, 6);

INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES 
    ('Tyrion', 'Lannister', 1, NULL),
    ('Tony', 'Soprano', 1, 1),
    ('Michael', 'Scott', 1, 2),
    ('Walter', 'White', 2, NULL),
    ('Greg', 'House', 3, 1),
    ('George', 'Costanza', 3, 5),
    ('Cosmo', 'Kramer', 4, 1),
    ('Lucy', 'Ricardo', 3, 7),
    ('Joey', 'Tribbiani', 4, 1),
    ('Dwight', 'Schrute', 5, NULL),
    ('Eric', 'Cartman', 5, 9),
    ('Al', 'Bundy', 6, 7),
    ('Phoebe', 'Buffay', 6, 7),
    ('Buffy', 'Summers', 6, 7);