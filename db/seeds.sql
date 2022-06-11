INSERT INTO department (name)
VALUES 
    ('Management'),
    ('Marketing'),
    ('Finance'),
    ('Sales'),
    ('Product Development');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('General Manager', 100000, 1),
    ('Marketing Manager', 120000, 1),
    ('Finance Manager', 125000, 1),
    ('Sales Manager', 85000, 1),
    ('Market Researcher', 100000, 2),
    ('Product Tester', 80000, 2),
    ('Payroll Clerk', 75000, 3),
    ('Payroll Assistant', 50000, 3),
    ('Junior Financial Analyst', 95000, 3),
    ('Sales Assistant', 50000, 4),
    ('Sales Analyst', 95000, 4),
    ('Product Developer', 85000, 5),
    ('Product Engineer', 90000, 5),
    ('Software Engineer', 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Analiza', 'Boehning', 3, null);