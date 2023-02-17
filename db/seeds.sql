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
       ("Customer Service Rep", 45000, 4),
       ("Director of Operations", 120000, 5),
       ("Customer Service Manager", 76000, 4),
       ("Engineering Manager", 116000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Beth", "Sanderson", 3),
       ("John", "Jefferson", 4),
       ("Sandy", "Bees", 5),
       ("Chris", "Conyers", 1),
       ("Jacob", "Meyer", 2),
       ("Maxine", "Lowes", 2),
       ("Maggie", "Nile", 3);