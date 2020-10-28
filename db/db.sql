DROP DATABASE IF EXISTS employeeDb;
CREATE DATABASE employeeDb;

USE employeeDb;

CREATE TABLE department (
  id INT AUTO_INCREMENT, -- Primary key
  name VARCHAR(30) NOT NULL, -- Department name
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT, -- Primary Key
  title VARCHAR(30) NOT NULL, -- Role Title
  salary DECIMAL NOT NULL, -- Role Salary
  department_id INT NOT NULL, -- References department that role belongs to (table-role id)
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT, -- Primary Key
  first_name VARCHAR(30) NOT NULL, -- Employees First name
  last_name VARCHAR(30) NOT NULL, -- Employees Last Name
  role_id INT NOT NULL, -- References role employee has
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT, -- References another employee that manages the employee being created.
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

SET FOREIGN_KEY_CHECKS=0;