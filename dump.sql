-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 27, 2018 at 09:20 PM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `grading`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` varchar(32) NOT NULL,
  `course_id` varchar(32) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `course_id`, `name`, `created_at`, `updated_at`) VALUES
('ewjewbjh-sfdkjdsf', '00bec5656fdfbd16b9c20483abb7b687', 'Assingment1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('qwewqeqw', '00bec5656fdfbd16b9c20483abb7b687', 'Assingment 2', '2018-03-23 00:00:00', '2018-03-23 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` varchar(32) NOT NULL,
  `term` varchar(25) NOT NULL,
  `course_code` varchar(25) NOT NULL,
  `section_code` varchar(25) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `term`, `course_code`, `section_code`, `created_at`, `updated_at`) VALUES
('00bec5656fdfbd16b9c20483abb7b687', 'SPRING 2018', '2710 ADVANCED DATABASE', '2001', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('028ee26b5a1bfe8a130e4888099d87fb', 'SPRING 2018', '2711 ALGORITHM', '2004', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('279b84e51b60b819fdb25ec01e7d1782', 'SPRING 2018', '2710 ADVANCED DATABASE', '2004', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('2a1b1ac6cd97f00106ceff4637369762', 'SPRING 2018', '2150', '2099', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('a5b27d8e8d5baa98d3e590bc37e47382', 'SPRING 2019', '2710 ADVANCE DATABASE', '2006', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('b177437d2bd5396f25cdfcfee41d73af', 'SPRING 2018', '2710 Advanced Database', '2000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('c2877e51f016e29e17c0f130d5ca97bb', 'SPRING 2019', '2711 ALGORITHM', '2004', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('c79f894247d145ad706609b3b465b2ba', 'SPRING 2019', '2710 Advanced Database', '2001', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('e922f2673163d985ec3237919312053e', 'SPRING 2019', '2710 Advanced Database', '2004', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('ff59a6faf4207aaf5e304adb024f89b9', 'SPRING 2018', '2151', '2100', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `coursesVsGrader`
--

CREATE TABLE `coursesVsGrader` (
  `course_id` varchar(32) NOT NULL,
  `grader_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `coursesVsProfessor`
--

CREATE TABLE `coursesVsProfessor` (
  `course_id` varchar(32) NOT NULL,
  `professor_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `coursesVsProfessor`
--

INSERT INTO `coursesVsProfessor` (`course_id`, `professor_id`) VALUES
('2a1b1ac6cd97f00106ceff4637369762', 'prof145'),
('ff59a6faf4207aaf5e304adb024f89b9', 'prof145');

-- --------------------------------------------------------

--
-- Table structure for table `grader`
--

CREATE TABLE `grader` (
  `id` varchar(32) NOT NULL,
  `name` varchar(25) NOT NULL,
  `course_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grader`
--

INSERT INTO `grader` (`id`, `name`, `course_id`) VALUES
('obs5', 'Omkar Sawant', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('rar145', 'Ragz', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('rar155', 'raghav', '00bec5656fdfbd16b9c20483abb7b687'),
('rar155', 'raghav', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('rar345', 'Raman Raghav 2.0', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('sad148', 'Saurabh Dhamnaskar', 'c2877e51f016e29e17c0f130d5ca97bb');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `assignment_id` varchar(100) NOT NULL,
  `student_id` varchar(15) NOT NULL,
  `grader_id` varchar(100) NOT NULL,
  `grade` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `id` varchar(32) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`id`, `name`) VALUES
('prof145', 'Professor 1'),
('prof1454', 'Professor 2');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` varchar(32) NOT NULL,
  `name` varchar(25) NOT NULL,
  `course_id` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `course_id`) VALUES
('Ara110', 'Aravindhan', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('inr100', 'Ishaan Raje', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('rar155', 'Raghav Raman', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('rar156', 'Ragz', 'a5b27d8e8d5baa98d3e590bc37e47382'),
('sai431', 'Abhinav', 'a5b27d8e8d5baa98d3e590bc37e47382');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignments_fk_courses_id` (`course_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `courses_UK` (`term`,`course_code`,`section_code`) USING BTREE;

--
-- Indexes for table `coursesVsProfessor`
--
ALTER TABLE `coursesVsProfessor`
  ADD KEY `coursesvsprofessor_ibfk_1` (`course_id`),
  ADD KEY `professor_id` (`professor_id`);

--
-- Indexes for table `grader`
--
ALTER TABLE `grader`
  ADD PRIMARY KEY (`id`,`course_id`) USING BTREE,
  ADD KEY `grader_FK` (`course_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`assignment_id`,`grader_id`),
  ADD KEY `grades_fk_student_id` (`student_id`),
  ADD KEY `grades_fk_grader_id` (`grader_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`username`,`role`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`,`course_id`) USING BTREE,
  ADD KEY `students_FK` (`course_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_fk_courses_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `coursesVsProfessor`
--
ALTER TABLE `coursesVsProfessor`
  ADD CONSTRAINT `coursesvsprofessor_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coursesvsprofessor_ibfk_2` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`);

--
-- Constraints for table `grader`
--
ALTER TABLE `grader`
  ADD CONSTRAINT `grader_FK` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_fk_assignment_id` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`),
  ADD CONSTRAINT `grades_fk_grader_id` FOREIGN KEY (`grader_id`) REFERENCES `grader` (`id`),
  ADD CONSTRAINT `grades_fk_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_FK` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON UPDATE NO ACTION;
