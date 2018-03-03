
CREATE TABLE IF NOT Exists `courses` (
  `id` varchar(32) NOT NULL  ,
  `term` varchar(25) NOT NULL,
  `course_code` varchar(25) NOT NULL,
  `section_code` varchar(25) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
   CONSTRAINT courses_PK PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `professors` (
  `id` varchar(32) NOT NULL  ,
  `name` varchar(25) NOT NULL,
  `email` varchar(15) NOT NULL,
   CONSTRAINT professor_PK PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `graders` (
  `id` varchar(32) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(15) NOT NULL,
   CONSTRAINT graders_PK PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `students` (
  `id` varchar(32) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(15) NOT NULL,
   CONSTRAINT student_PK PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `assignments` (
  `id` varchar(32) NOT NULL,
  `course_id` varchar(32) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  CONSTRAINT `assignments_PK` PRIMARY KEY (`id`),
  CONSTRAINT `assignments_fk_courses_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `coursesVsProfessor` (
  `course_id` varchar(32) NOT NULL,
  `professor_id` varchar(32) NOT NULL,
  CONSTRAINT `coursesVsGrader_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `coursesVsGrader_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professors` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `coursesVsGrader` (
  `course_id` varchar(32) NOT NULL,
  `grader_id` varchar(32) NOT NULL,
  CONSTRAINT `coursesVsGrader_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `coursesVsGrader_grader_id` FOREIGN KEY (`grader_id`) REFERENCES `graders` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `grades` (
  `assignment_id` varchar(100) NOT NULL,
  `student_id` varchar(15) NOT NULL,
  `grader_id` varchar(100) NOT NULL,
  `grade` integer(3) DEFAULT NULL,
  CONSTRAINT `grades_assignment_id` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`),
  CONSTRAINT `grades_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
    CONSTRAINT `grades_grader_id` FOREIGN KEY (`grader_id`) REFERENCES `graders` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT Exists `login` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL UNIQUE,
  `password` varchar(100) DEFAULT NULL,
  `role` integer(2) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  CONSTRAINT `users_PK` PRIMARY KEY (`username`,`role`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
