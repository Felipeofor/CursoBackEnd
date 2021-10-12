CREATE SCHEMA `coderhouse` ;

CREATE TABLE `coderhouse`.`products` (
  `idproducts` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `price` DOUBLE NOT NULL,
  `thumbnail` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idproducts`));

INSERT INTO coderhouse.products(title, price, thumbnail)
VALUES ("Guia para ser chofer", 7000, "https://cdn3.iconfinder.com/data/icons/online-learning-vol-1-2/64/Video_Lession-256.png"),
("Clase de manejo", 3000, "https://cdn4.iconfinder.com/data/icons/LUMINA/accounting/png/256/bus.png"),
("Hoja de vida", 1000, "https://cdn0.iconfinder.com/data/icons/job-seeker/256/cv_job_seeker_employee_unemployee_work-256.png")