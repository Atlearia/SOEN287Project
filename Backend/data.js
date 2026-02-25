var accessmentList;
var studentList;
var Concordia;

//this enum can be used for student dashboard too btw just drop box it
var TERM_OPTIONS = [
  "Winter 2026",
  "Summer 2026",
  "Fall 2027",
  "Winter 2027",
  "Summer 2028",
  "Fall 2028"
];

class Course {
  constructor(studentsArray, prof, name, courseCode, description, term, assessment) {
    this.students = studentsArray;
    this.prof = prof;
    this.name = name;
    this.courseCode = courseCode;
    this.description = description;
    this.term = term;
    this.assessment = assessment;
    this.enabled = true;
  }
}

class Assessment {
  constructor(finalExam, midtermExam, quizArray, assignmentArray) {
    this.final = finalExam;
    this.midterm = midtermExam;
    this.quiz = quizArray;
    this.assignment = assignmentArray;
  }
}

class Final extends Assessment {
  constructor(year, month, day, weight) {
    super();
    this.year = year;
    this.month = month;
    this.day = day;
    this.weight = weight;
    this.results = [];
    this.completed = [];
  }
}

class Midterm extends Assessment {
  constructor(year, month, day, weight) {
    super();
    this.year = year;
    this.month = month;
    this.day = day;
    this.weight = weight;
    this.results = [];
    this.completed = [];
  }
}

class Quiz extends Assessment {
  constructor(year, month, day, weight) {
    super();
    this.year = year;
    this.month = month;
    this.day = day;
    this.weight = weight;
    this.results = [];
    this.completed = [];
  }
}

class Assignment extends Assessment {
  constructor(year, month, day, weight) {
    super();
    this.year = year;
    this.month = month;
    this.day = day;
    this.weight = weight;
    this.results = [];
    this.completed = [];
  }
}

class Student {
  constructor(name) {
    this.name = name;
  }
}

//methods
//GETTER/SETTERS
Assessment.prototype.getFinal = function () {//*
  return this.final;
};

Assessment.prototype.getMidterm = function () {//*
  return this.midterm;
};

Assessment.prototype.getQuizArray = function () {//*
  return this.quiz;
};

Assessment.prototype.getAssignmentArray = function () {//*
  return this.assignment;
};

Assessment.prototype.getYear = function () {//*
  return this.year;
};

Assessment.prototype.getMonth = function () {//*
  return this.month;
};

Assessment.prototype.getDay = function () {//*
  return this.day;
};

Assessment.prototype.getWeight = function () {//*
  return this.weight;
};

Assessment.prototype.getResults = function () {//ad,in
  return this.results;
};

Assessment.prototype.getCompleted = function () {//for admin
  return this.completed;
};

Assessment.prototype.setCompleted = function (value) {//*
  this.completed.push(value);
};

Course.prototype.getStudentCount = function () {//admin mayeb need who knows
  return this.students.length;
};

Course.prototype.getProf = function () {//*
  return this.prof;
};

Course.prototype.getName = function () {//*
  return this.name;
};

Course.prototype.getCourseCode = function () {//*
  return this.courseCode;
};

Course.prototype.getDescription = function () {//*
  return this.description;
};

Course.prototype.getTerm = function () {//*
  return this.term;
};

Course.prototype.getEnabled = function () {//*
  return this.enabled;
};

Course.prototype.getAssessment = function () {//*
  return this.assessment;
};

Course.prototype.getQuizLength = function () { //*
  return this.assessment.quiz.length;
};

Course.prototype.getAssignmentLength = function () { //*
  return this.assessment.assignment.length;
};

//Those all work for the children of assessment, aka final midterm assignemtn and quizzes
Course.prototype.getItemYear = function (assessmentItem) {//*
  return assessmentItem.getYear();
};

Course.prototype.getItemMonth = function (assessmentItem) {//*
  return assessmentItem.getMonth();
};

Course.prototype.getItemDay = function (assessmentItem) {//*
  return assessmentItem.getDay();
};

Course.prototype.getItemWeight = function (assessmentItem) {//*
  return assessmentItem.getWeight();
};

Course.prototype.getItemResults = function (assessmentItem) { //admin to check after 
  return assessmentItem.getResults();
};

//setter stuff
Course.prototype.setGradeFinal = function (resultValue) {//*
  this.assessment.final.results.push(resultValue);
};

Course.prototype.setGradeMidterm = function (resultValue) {//*
  this.assessment.midterm.results.push(resultValue);
};

Course.prototype.setGradeQuiz = function (quizIndex, resultValue) {//*
  this.assessment.quiz[quizIndex].results.push(resultValue);
};

Course.prototype.setGradeAssignment = function (assignmentIndex, resultValue) {//*
  this.assessment.assignment[assignmentIndex].results.push(resultValue);
};


//completion attribute setter/getter
Course.prototype.getCompletedFinal = function () {//all the get are for admin, set for students
  return this.assessment.final.getCompleted();
};

Course.prototype.setCompletedFinal = function (value) {//*
  this.assessment.final.setCompleted(value);
};

Course.prototype.getCompletedMidterm = function () {
  return this.assessment.midterm.getCompleted();
};

Course.prototype.setCompletedMidterm = function (value) {//*
  this.assessment.midterm.setCompleted(value);
};

Course.prototype.getCompletedQuiz = function (quizIndex) {
  return this.assessment.quiz[quizIndex].getCompleted();
};

Course.prototype.setCompletedQuiz = function (quizIndex, value) {//*
  this.assessment.quiz[quizIndex].setCompleted(value);
};

Course.prototype.getCompletedAssignment = function (assignmentIndex) {
  return this.assessment.assignment[assignmentIndex].getCompleted();
};

Course.prototype.setCompletedAssignment = function (assignmentIndex, value) {//*
  this.assessment.assignment[assignmentIndex].setCompleted(value);
};


//METHODS FOR ADMIN STUFF 



//dataaaaaaa

var a1 = new Assessment(
  new Final(2026, 4, 22, 40),
  new Midterm(2026, 3, 12, 25),
  [new Quiz(2026, 2, 28, 8), new Quiz(2026, 3, 19, 7), new Quiz(2026, 4, 5, 10)],
  [new Assignment(2026, 3, 3, 5), new Assignment(2026, 3, 29, 5)]
);

var a2 = new Assessment(
  new Final(2026, 4, 20, 35),
  new Midterm(2026, 3, 10, 30),
  [new Quiz(2026, 2, 12, 20), new Quiz(2026, 3, 5, 15)],
  []
);

var a3 = new Assessment(
  new Final(2026, 4, 24, 45),
  new Midterm(2026, 3, 15, 20),
  [new Quiz(2026, 2, 4, 5), new Quiz(2026, 2, 25, 5), new Quiz(2026, 3, 18, 5), new Quiz(2026, 4, 1, 5)],
  [new Assignment(2026, 2, 20, 5), new Assignment(2026, 3, 12, 5), new Assignment(2026, 4, 8, 5)]
);

var a4 = new Assessment(
  new Final(2026, 4, 16, 30),
  new Midterm(2026, 2, 26, 25),
  [new Quiz(2026, 3, 20, 15)],
  [new Assignment(2026, 2, 11, 15), new Assignment(2026, 3, 30, 15)]
);

var a5 = new Assessment(
  new Final(2026, 4, 25, 40),
  new Midterm(2026, 3, 17, 25),
  [new Quiz(2026, 2, 9, 10), new Quiz(2026, 2, 29, 10), new Quiz(2026, 3, 24, 5)],
  [new Assignment(2026, 3, 9, 10)]
);

var s1 = [
  new Student("Ning Ye"), new Student("Hero Kong"), new Student("Zachary Demnati"), new Student("Alexander DeLuca"), new Student("Liam Ahmed"),
  new Student("Sofia Rossi"), new Student("Ethan Li"), new Student("Olivia Smith"), new Student("Lucas Martin"), new Student("Chloe Nguyen"),
  new Student("Mason Brown"), new Student("Ava Johnson"), new Student("Logan Davis"), new Student("Isabella Garcia"), new Student("Jacob Lee"),
  new Student("Amelia Wilson"), new Student("Daniel Moore"), new Student("Nora Martinez"), new Student("Ryan Thompson"), new Student("Leah White")
];

var s2 = [
  new Student("Julian Scott"), new Student("Grace Hall"), new Student("Nathan Young"), new Student("Ella Adams"), new Student("Caleb Baker"),
  new Student("Hannah Nelson"), new Student("Wyatt Carter"), new Student("Lily Mitchell"), new Student("Owen Perez"), new Student("Zoe Roberts"),
  new Student("Isaac Turner"), new Student("Aria Phillips"), new Student("Levi Campbell"), new Student("Mila Parker"), new Student("Hudson Evans"),
  new Student("Layla Edwards"), new Student("Connor Collins"), new Student("Scarlett Stewart"), new Student("Eli Sanchez"), new Student("Violet Morris")
];

var s3 = [
  new Student("Aaron Reed"), new Student("Julia Cook"), new Student("Brandon Bell"), new Student("Paige Murphy"), new Student("Tyler Bailey"),
  new Student("Claire Rivera"), new Student("Cole Cooper"), new Student("Naomi Richardson"), new Student("Jason Cox"), new Student("Ruby Howard"),
  new Student("Adrian Ward"), new Student("Faith Torres"), new Student("Kevin Peterson"), new Student("Eva Gray"), new Student("Blake Ramirez"),
  new Student("Stella James"), new Student("Marcus Watson"), new Student("Ivy Brooks"), new Student("Tristan Kelly"), new Student("Sadie Sanders")
];

var s4 = [
  new Student("Dylan Price"), new Student("Audrey Bennett"), new Student("Parker Wood"), new Student("Madeline Barnes"), new Student("Jasper Ross"),
  new Student("Elena Henderson"), new Student("Jordan Coleman"), new Student("Camila Jenkins"), new Student("Roman Perry"), new Student("Hailey Powell"),
  new Student("Miles Long"), new Student("Lucy Patterson"), new Student("Kai Hughes"), new Student("Alice Flores"), new Student("Asher Washington"),
  new Student("Penelope Butler"), new Student("Xavier Simmons"), new Student("Willow Foster"), new Student("Declan Gonzales"), new Student("Aurora Bryant")
];

var s5 = [
  new Student("Brody Alexander"), new Student("Savannah Russell"), new Student("Chase Griffin"), new Student("Bella Diaz"), new Student("Grayson Hayes"),
  new Student("Anna Myers"), new Student("Easton Ford"), new Student("Natalie Hamilton"), new Student("Rowan Graham"), new Student("Caroline Sullivan"),
  new Student("Beau Wallace"), new Student("Reagan Woods"), new Student("Micah Cole"), new Student("Valerie West"), new Student("Gavin Jordan"),
  new Student("Hazel Owens"), new Student("Ryder Reynolds"), new Student("Elise Fisher"), new Student("Finn Ellis"), new Student("Melanie Harrison")
];

var course1 = new Course(s1, "Prof. Abdelghani Benharref", "Web Programming", "SOEN287", "Frontend and backend web development fundamentals.", "Winter 2026", a1);
var course2 = new Course(s2, "Prof. Daniel Ortega", "Object-Oriented Programming I", "COMP248", "Intro to Java and object-oriented software design.", "Summer 2026", a2);
var course3 = new Course(s3, "Prof. Isabelle Martin", "Linear Algebra I", "MATH204", "Matrices, systems, vectors, and linear transformations.", "Fall 2027", a3);
var course4 = new Course(s4, "Prof. Samuel Rivera", "Technical Writing and Communication", "ENCS282", "Professional writing, reports, and communication skills.", "Winter 2027", a4);
var course5 = new Course(s5, "Prof. Neha Kulkarni", "Applied Advanced Calculus", "ENGR223", "Advanced calculus for engineering and software-related modeling and optimization.", "Summer 2028", a5);

accessmentList = [a1, a2, a3, a4, a5];
studentList = [s1, s2, s3, s4, s5];

Concordia = {
  termOptions: TERM_OPTIONS,
  courses: [course1, course2, course3, course4, course5],
  courseTemplates: []
};
