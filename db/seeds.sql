INSERT INTO department (name)
VALUES ("IT"),
("Maths"),
("Science"),
("English"),
("History"),
("Admin Staff");

INSERT INTO role (title, salary)
VALUES 
("Teacher", 60000),
("Teacher", 63000),
("Teacher", 71000),
("Teacher", 55000),
("Teacher", 62500),
("Assistant Principal", 75000),
("Principal", 990000);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Chris", "Wallace", 1, 6),
(2, "Bob", "Wall", 1,6),
(3, "Greg", "Ace", 2,5),
(4, "Steeve", "Acer", 2,6),
(5, "Jen", "Sanger", 5,6),
(6, "Alex", "Jenkins", 6,6),
(7, "John", "Middendorf", 2,5),
(8, "Harrold", "Hippo", 3,6),
(9, "Arthur", "Miller", 3,6),
(10, "Chinua", "Achebe", 3,6),
(11, "Margaret", "Atwood", 4,5),
(12, "Gabriel", "Garcia Marquez", 4,6),
(13, "Simone", "de Beauvoir", 5,6),
(14, "Michael", "Vincent", 5,5),
(15, "John", "Vincent", 5,6);
(16, "Steven", "Cunningham", 1,6),
