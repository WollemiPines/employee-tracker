INSERT INTO department (id, name)
VALUES (1, "IT"),
(2, "Maths"),
(3, "Science"),
(4, "English"),
(5, "History"),
(6, "Admin Staff");

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "Teacher", 60000, 1),
(2, "Teacher", 63000, 2),
(3, "Teacher", 71000, 3),
(4, "Teacher", 55000, 4),
(5, "Teacher", 62500, 5),
(6, "Assistant Principal", 75000, 6),
(7, "Principal", 990000, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Chris", "Wallace", 1, 6),
(2, "Bob", "Wall", 1,15),
(3, "Greg", "Ace", 2,15),
(4, "Steeve", "Acer", 2,15),
(5, "Jen", "Sanger", 5,15),
(6, "Alex", "Jenkins", 6,15),
(7, "John", "Middendorf", 2,15),
(8, "Harrold", "Hippo", 3,15),
(9, "Arthur", "Miller", 3,15),
(10, "Chinua", "Achebe", 3,15),
(11, "Margaret", "Atwood", 4,15),
(12, "Gabriel", "Garcia Marquez", 4,15),
(13, "Simone", "de Beauvoir", 5,15),
(14, "Michael", "Vincent", 5,15),
(15, "John", "Vincent", 7,6),
(16, "Steven", "Cunningham", 1,15);


DROP DATABASE IF EXISTS school_people;
CREATE DATABASE school_people;

USE school_people;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);
ß