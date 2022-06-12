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
    ('Analiza', 'Boehning', 1, null),
    ('Beto', 'Madrigal', 2, 1),
    ('Zoey', 'Bolina', 3, 1),
    ('Mateo', 'Madd', 4, 1),
    ('Lucas', 'Sino', 5, 1),
    ('Jianna', 'Merva', 6, 2),
    ('Victoria', 'Gymnastic', 7, 3),
    ('Isaiah', 'Scholar', 8, 3),
    ('Ada', 'Acosta', 9, 2),
    ('Elizabeth', 'Acosta', 10, 2),
    ('Jerrett', 'Scott', 11, 2),
    ('Annette', 'Harris', 12, 1),
    ('James', 'Dean', 13, 1),
    ('Harry', 'Salas', 14, 1),
    ('Luca', 'Pagguro', 7, 3),
    ('Julia', 'Regazzi', 6, 2),
    ('Alberto', 'Scorfano', 7, 3),
    ('Benne', 'Ciao', 8, 3),
    ('Kris', 'Jenner', 12, 1);