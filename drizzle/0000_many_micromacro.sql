CREATE TABLE `grades` (
	`int` int NOT NULL,
	`grade` varchar(10) NOT NULL,
	CONSTRAINT `grades_int` PRIMARY KEY(`int`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(20) NOT NULL,
	`year` varchar(10) NOT NULL,
	`prn` varchar(20) NOT NULL,
	`contact` varchar(11) NOT NULL,
	CONSTRAINT `students_id` PRIMARY KEY(`id`)
);
