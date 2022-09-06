DROP DATABASE IF EXISTS employee-tracker;
CREATE DATABASE employee-tracker;
USE employee-tracker;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL
)

CREATE TABLE role (
    id INTEGER PRIMARY KEY,
    title VARCHAR(50) NOT NULL
    salary DECIMAL
    department_id INTEGER
)

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL
    last_name VARCHAR(50) NOT NULL
    role_id INTEGER
    manager_id INTEGER
)