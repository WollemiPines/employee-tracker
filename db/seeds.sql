INSERT INTO department (id, name)
VALUES (1001, "IT"),
(1002,"Maths"),
(1003,"Science"),
(1004,"English"),
(1005,"History");

INSERT INTO role (id, title, salary)
VALUES (101, "Teacher", 25000),
(303, "Manager", 600000),
(404, "Principal", 100000);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "Chris", "Wallace", 101),
(2, "Bob", "Wall", 101),
(3, "Greg", "Ace", 101),
(4, "Steeve", "Acer", 101),
(5, "Jen", "Sanger", 303),
(6, "Alex", "Jones", 404),
(7, "John", "Middendorf", 303),
(8, "Harrold", "Hippo", 101),
(9, "Arthur", "Miller", 101),
(10, "Chinua", "Achebe", 303),
(11, "Margaret", "Atwood", 101),
(12, "Gabriel", "Garcia Marquez", 404),
(13, "Simone", "de Beauvoir", 101);
