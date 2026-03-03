export let courses = [    
    {
        code: "SOEN 287",
        title: "Web Programming",
        students: {
          12345: {
            average: 90
          }
        },
        assessments: []
    },
    {
        code: "COMP 249",
        title: "Introduction to OOP II",
        students: {
          12345: {
            average: 98
          }
        },
        assessments: []
    },
    {
        code: "SOEN 228",
        title: "System Hardware",
        students: {
          12345: {
            average: 93
          }
        },
        assessments: []
    },
    {
        code: "COMP 232",
        title: "Mathematic for Computer Science",
        students: {
        },
        assessments: []
    }
]

export let assessments = [
    {course: "COMP 249", Name: "Assignment 1", DueDate: "January 1st 2026", DueDateComp: new Date('2026-01-1'), weight: 10, completed: false, grade: 0},
    {course: "COMP 249", Name: "Assignment 2", DueDate: "January 11th 2026", DueDateComp: new Date('2026-01-11'), weight: 5, completed: true, grade: 100},
    {course: "COMP 249", Name: "Test 2", DueDate: "Febuary 22nd 2026", DueDateComp: new Date('2026-02-22'), weight: 20, completed: false, grade: 0},
    {course: "COMP 249", Name: "Test 1", DueDate: "Febuary 2nd 2026", DueDateComp: new Date('2026-02-2'), weight: 10, completed: true, grade: 80},
    {course: "COMP 249", Name: "Test 3", DueDate: "March 22nd 2026", DueDateComp: new Date('2026-03-22'), weight: 15, completed: false, grade: 100},
    {course: "COMP 249", Name: "Final", DueDate: "June 24th 2026", DueDateComp: new Date('2026-06-24'), weight: 40, completed: true, grade: 10} ,
    {course: "SOEN 287", Name: "Assignment 1", DueDate: "January 2nd 2026", DueDateComp: new Date('2026-01-2'), weight: 13, completed: false, grade: 90},
    {course: "SOEN 287", Name: "Quiz 1", DueDate: "January 29th 2026", DueDateComp: new Date('2026-01-29'), weight: 7, completed: true, grade: 100},
    {course: "SOEN 287", Name: "Test 2", DueDate: "Febuary 13th 2026", DueDateComp: new Date('2026-02-13'), weight: 8, completed: false, grade: 7},
    {course: "SOEN 287", Name: "Test 1", DueDate: "Febuary 3rd 2026", DueDateComp: new Date('2026-02-3'), weight: 10, completed: true, grade: 80},
    {course: "SOEN 287", Name: "Test 3", DueDate: "March 27th 2026", DueDateComp: new Date('2026-03-27'), weight: 12, completed: false, grade: 60},
    {course: "SOEN 287", Name: "Final", DueDate: "May 24th 2026", DueDateComp: new Date('2026-05-24'), weight: 30, completed: true, grade: 27} ,
    {course: "SOEN 287", Name: "Project", DueDate: "April 15th 2026", DueDateComp: new Date('2026-04-15'), weight: 20, completed: true, grade: 63}, 
    {course: "SOEN 228", Name: "Assignment 1", DueDate: "January 3rd 2026", DueDateComp: new Date('2026-01-3'), weight: 15, completed: false, grade: 40},
    {course: "SOEN 228", Name: "Quiz 1", DueDate: "January 21st 2026", DueDateComp: new Date('2026-01-21'), weight: 5, completed: true, grade: 100},
    {course: "SOEN 228", Name: "Lab 1", DueDate: "Febuary 26th 2026", DueDateComp: new Date('2026-02-26'), weight: 10, completed: false, grade: 90},
    {course: "SOEN 228", Name: "Test 1", DueDate: "Febuary 7th 2026", DueDateComp: new Date('2026-02-7'), weight: 8, completed: true, grade: 78},
    {course: "SOEN 228", Name: "Test 2", DueDate: "March 12th 2026", DueDateComp: new Date('2026-03-12'), weight: 14, completed: false, grade: 57},
    {course: "SOEN 228", Name: "Final", DueDate: "May 2nd 2026", DueDateComp: new Date('2026-05-2'), weight: 30, completed: true, grade: 95} ,
    {course: "SOEN 228", Name: "Project", DueDate: "April 25th 2026", DueDateComp: new Date('2026-04-25'), weight: 18, completed: true, grade: 32}, 
    
]

export function enrollStudent(studentId, courseCode) {
  for (const course of courses) {
    console.log(courseCode)
    if (course.code === courseCode) {
      if (!(studentId in course.students)) {
        course.students[studentId] = {average: 0};
      }
    }
  }
  console.log(courses)
}

export function checkCourseExist(code) {
  if (!code) return false;
  for (const course of courses) {
    if (course.code.toUpperCase().replace(' ', '').trim() === code.toUpperCase().replace(' ', '').trim()) {
      return true;
    }
  }
  return false;
}

export function unenrollStudent(studentId, courseCode) {
  for (const course of courses) {
    if (course.code === courseCode) {
      if (studentId in course.students) {
        delete course.students[studentId]
      }
    }
  }
}