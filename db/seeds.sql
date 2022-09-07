INSERT INTO department (name) 
VALUES
 ('Quality Assurance'),
 ('Development'),
 ('Research'),
 ('Accounting'),
 ('Support');

INSERT INTO role (title, salary, department_id)
VALUES
('QA Engineer', 70000, 1),
('QA Engineer II', 85000, 1),
('Software Engineer', 80000, 2),
('Senior Software Engineer', 100000, 2),
('Data Analyst', 75000, 3),
('Researcher', 76500, 3),
('Financial Analyst', 67000, 4),
('Accountant', 78000, 4),
('IT Support Specialist', 68000, 5),
('Customer Support Specialist', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, null),
  ('Jack', 'London', 2, null),
  ('Robert', 'Bruce', 3, null),
  ('Peter', 'Greenaway', 4, null),
  ('Derek', 'Jarman', 5, null),
  ('Paolo', 'Pasolini', 1, 1),
  ('Heathcote', 'Williams', 1, 1),
  ('Fred', 'Williams', 1, 1),
  ('Sandy', 'Powell', 2, 2),
  ('Emil', 'Zola', 2, 2),
  ('Sissy', 'Coalpits', 2, 2),
  ('Antoinette', 'Capet', 2, 2),
  ('Samuel', 'Delany', 2, 2),
  ('Tony', 'Duvert', 3, 3),
  ('Dennis', 'Cooper', 3, 3),
  ('Monica', 'Bellucci', 3, 3),
  ('Samuel', 'Johnson', 4, 4),
  ('John', 'Dryden', 4, 4),
  ('Lionel', 'Johnson', 4, 4),
  ('Alexander', 'Pope', 5, 5),
  ('Aubrey', 'Beardsley', 5, 5),
  ('Tulse', 'Luper', 5, 5),
  ('William', 'Morris', 5, 5),
  ('George', 'Shaw', 5, 5),
  ('Arnold', 'Bennett', 5, 5),
  ('Algernon', 'Blackwood', 5, 5);