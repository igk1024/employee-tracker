USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Ronald', 'Reagan', 1, 3),
  ('Jane', 'Smith', 1, 3),
  ('Lia', 'Jones', 2, NULL),
  ('Charles', 'Barkley', 2, 2)
  ('Lydia', 'Grace', 2, 2,
  ('Jon', 'Doe', 2, 3, 3),
  ('Edward', 'Scissorhands', 3, 4, 4),
  ('Mary', 'Bush', 4, 4, 4),
  ('Octavia', 'Spencer', 5, 4, 4),
  ('Martin', 'Short', 6, 4, 4);

INSERT INTO roles (title, salary, department_id) 
VALUES 
("Sales Person", 60000.00, 1),
("Sales Manager", 85000.00, 1),
("Engineer", 85000.00, 2),
("Engineering Manager", 100000.00, 2),
("Accountant", 75000.00, 3),
("Attorney", 90000.00, 4),
("Managing Attorney", 120000.00, 4);

INSERT INTO department (name) 
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");