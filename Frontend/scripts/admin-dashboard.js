const selection = document.getElementById('selection');
const barsBlock = document.querySelector('.us-bars-block');
const overallCompletionBox = document.getElementById('big-aah-number');

function loadDashboard() {
    fetch('/get/courses').then(function(coursesRes) {
        return coursesRes.json();
    }).then(function(coursesData) {
        const courses = coursesData.courses;
        
        fetch('/get/students').then(function(studentsRes) {
            return studentsRes.json();
        }).then(function(studentsData) {
            const students = studentsData.students;

            selection.innerHTML = '<option value=\"\">Select a course</option>';
            for (let i = 0; i < courses.length; i++) {
                const course = courses[i];
                const option = document.createElement('option');
                option.value = course.courseCode;
                option.textContent = course.courseCode;
                selection.appendChild(option);
            }

            selection.addEventListener('change', function(e) {
                const selectedCode = e.target.value;
                let foundCourse = null;
                for (let i = 0; i < courses.length; i++) {
                    if (courses[i].courseCode === selectedCode) {
                        foundCourse = courses[i];
                        break;
                    }
                }

                renderAssessments(foundCourse, students);
            });

            if (courses.length > 0) {
                selection.value = courses[0].courseCode;
                selection.dispatchEvent(new Event('change'));
            }
        });
    });
}

function renderAssessments(course, allStudents) {
    barsBlock.innerHTML = '';
    

    const enrolledStudents = [];
    for (let i = 0; i < allStudents.length; i++) {
        const s = allStudents[i];
        if (s.coursesEnrolled) {
            let found = false;
            for (let j = 0; j < s.coursesEnrolled.length; j++) {
                const ce = s.coursesEnrolled[j];
                if (ce.courseCode === course.courseCode) {
                    found = true;
                    break;
                }
            }
            if (found) {
                enrolledStudents.push(s);
            }
        }
    }
    
    let totalPossibleAvailable = 0;
    let totalCompletedAcrossAll = 0;

    for (let i = 0; i < course.assessments.length; i++) {
        const assessment = course.assessments[i];
        let completionRate = 0;
        let displayText = '0%';
        let barClass = '';

        if (enrolledStudents.length > 0) {
            let studentsCompleted = 0;
            for (let j = 0; j < enrolledStudents.length; j++) {
                const s = enrolledStudents[j];
                let enrolledCourse = null;
                for (let k = 0; k < s.coursesEnrolled.length; k++) {
                    const ce = s.coursesEnrolled[k];
                    if (ce.courseCode === course.courseCode) {
                        enrolledCourse = ce;
                        break;
                    }
                }
                if (enrolledCourse && enrolledCourse.assessmentsCompleted && enrolledCourse.assessmentsCompleted.includes(assessment.name)) {
                    studentsCompleted++;
                }
            }
            completionRate = parseInt((studentsCompleted / enrolledStudents.length) * 100, 10);
            displayText = completionRate + '%';
        }
        
        if (completionRate > 0) {
            barClass = 'us-bar-fill-green';
        }

        totalPossibleAvailable += 100;
        totalCompletedAcrossAll += completionRate;

        const row = document.createElement('div');
        row.className = 'us-bar-row';
        if (i === course.assessments.length - 1) {
            row.style.marginBottom = '0';
        }

        let widthStr = '';
        if (completionRate > 0) {
            widthStr = completionRate + '%';
        }
        
        row.innerHTML = '<span class=\"us-bar-name\">' + assessment.name + '</span>' +
            '<div class=\"us-bar-container-of-colour\">' +
                '<div class=\"' + barClass + '\" style=\"width:' + widthStr + '\"></div>' +
            '</div>' +
            '<span class=\"stats-letter\">' + displayText + '</span>';

        barsBlock.appendChild(row);
    }

    const overallRate = parseInt((totalCompletedAcrossAll / totalPossibleAvailable) * 100, 10);
    overallCompletionBox.textContent = overallRate + '%';
}

loadDashboard();
