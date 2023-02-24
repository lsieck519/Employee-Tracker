INSERT INTO department (name)
VALUES ('Accounting'),
       ('Engineering'),
       ('Marketing'),
       ('Customer Service'),
       ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES ('Director of Accounting', 100000, 1),
       ('Junior Engineer', 70000, 2),
       ('Marketing Manager', 87000, 3),
       ('Customer Service Rep', 45000, 4),
       ('Director of Operations', 120000, 5),
       ('Customer Service Manager', 76000, 4),
       ('Engineering Manager', 116000, 2),
       ('Marketing Specialist', 45000, 3),
       ('Director of Marketing', 117000, 3),
       ('Director of Engineering', 195000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Beth', 'Sanderson', 3, 9), 
       ('John', 'Jefferson', 4, 6),
       ('Sandy', 'Bees', 5, null),
       ('Chris', 'Conyers', 1, null),
       ('Jacob', 'Meyer', 7, null),
       ('Maxine', 'Lowes', 2, 7),
       ('Maggie', 'Nile', 8, null),
       ('Josephine', 'Wall', 9, null),
       ('Xavier', 'Willis', 6, 3),
       ('Julia', 'Stephano', 10, null);