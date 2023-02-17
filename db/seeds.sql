INSERT INTO department (name)
VALUES ("Accounting"),
       ("Engineering"),
       ("Marketing"),
       ("Customer Service"),
       ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Accounting", 100000, 1),
       ("Junior Engineer", 70000, 2),
       ("Marketing Manager", 87000, 3),
       ("Customer Service Representative", 45000, 4),
       ("Director of Operations", 120000, 5),
       ("Customer Service Manager", 76000, 6);
       ("Engineering Manager", 116000, 7)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Beth", "Sanderson", 3, null),
       ("John", "Jefferson", 4, 6),
       ("Sandy", "Bees", 5, null),
       ("Chris", "Conyers", 1, null),
       ("Jacob", "Meyer", 2, 7),
       ("Maxine", "Lowes", 6, null),
       ("Maggie", "Nile", 7, null);