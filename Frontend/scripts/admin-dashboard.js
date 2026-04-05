const selection = document.getElementById('selection');
const barsBlock = document.querySelector('.us-bars-block');
const overallCompletionBox = document.getElementById('big-aah-number');
const warningsContainer = document.getElementById("warning");
const DeadlineContainer = document.getElementById("Deadline");

function loadDashboard() {
    fetch('/get/courses').then(function(coursesRes) {
        return coursesRes.json();
    }).then(function(coursesData) {
        const courses = coursesData.courses;
        
        fetch('/get/students').then(function(studentsRes) {
            return studentsRes.json();
        }).then(function(studentsData) {
            const students = studentsData.students;

            selection.innerHTML = '<option value=\"\" selected disabled>Select a course</option>';
            for (let i = 0; i < courses.length; i++) {
                const course = courses[i];
                if(sessionStorage.getItem('id')===course.AdminId){
                    const option = document.createElement('option');
                    option.value = course.courseCode;
                    option.textContent = course.courseCode;
                    selection.appendChild(option);
                }
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

                renderAssessments(foundCourse);
            });
            /*
            if (courses.length > 0) {
                selection.value = courses[0].courseCode;
                selection.dispatchEvent(new Event('change'));
            }*/
        });
    });
}

function renderAssessments(course) {
    barsBlock.innerHTML = '';
    warningsContainer.innerHTML = ''; //clear at risk section
    DeadlineContainer.innerHTML =''; //clear deadline section

    const dateArray = [];

    let Totalgained=0;
    let Total=0;
    

    for (let i = 0; i < course.assessments.length; i++) {
        const assessment = course.assessments[i];
        let AVg = 0;
        let numstudents=0;
        let numstudentsmiss=0;
        let studentGain=0;
        let displayText = '0%';
        let barClass = '';

        const grades = Object.values(assessment.grades || {});
        grades.forEach(g =>{
            numstudents++;
            if(g != null){
                studentGain+=g;
            }
            if(g == null){
                numstudentsmiss++;
            }
        })
            
        
        AVg = numstudents>0 ? studentGain/numstudents:0; //make sure no divide by zero happens
        displayText = AVg.toFixed(2)+"%";
        
        if (AVg > 0) {
            barClass = 'us-bar-fill-green';
        }

        Total += 100*assessment.weight;
        Totalgained += AVg*assessment.weight;

        const row = document.createElement('div');
        row.className = 'us-bar-row';
        if (i === course.assessments.length - 1) {
            row.style.marginBottom = '0';
        }

        let widthStr = '';
        if (AVg >= 0) {
            widthStr = AVg + '%';
        }
        
        row.innerHTML = '<span class=\"us-bar-name\">' + assessment.name + '</span>' +
            '<div class=\"us-bar-container-of-colour\">' +
                '<div class=\"' + barClass + '\" style=\"width:' + widthStr + '\"></div>' +
            '</div>' +
            '<span class=\"stats-letter\">' + displayText + '</span>';

        barsBlock.appendChild(row);
        
        if(new Date(assessment.DueDateComp)< new Date()){ //if due date passed
            if (AVg < 60 && numstudents > 0) {
                const warn = document.createElement("div");
                warn.className = "us-warn-item";
                warn.innerHTML = `
                    <span class="DANGER-icon">&#9888;</span>
                    ${assessment.name} average below 60%
                `;
                warningsContainer.appendChild(warn);
            }
            if(numstudentsmiss>0 && numstudents>0){
                const warn = document.createElement("div");
                warn.className = "us-warn-item";
                warn.innerHTML = `
                    <span class="DANGER-icon">&#9888;</span>
                    ${numstudentsmiss} student(s) with ${assessment.name} 1 overdue
                `;
                warningsContainer.appendChild(warn);
            }
        } else if(new Date(assessment.DueDateComp)> new Date()){ //if due date is upcoming
            dateArray.push(assessment);
        }
    }

    dateArray.sort((a,b)=> new Date(a.DueDateComp) - new Date(b.DueDateComp)); //order the assesments based on date
    dateArray.forEach(a=>{
        const upcomming = document.createElement("div");
            upcomming.className = "us-deadline-BOX";
            upcomming.innerHTML = `
                &#x1F5D3; ${a.DueDate} - ${a.name}
            `;
            DeadlineContainer.appendChild(upcomming);

    })

    const overallAVG = parseInt((Totalgained / Total) * 100, 10);
    overallCompletionBox.textContent = overallAVG + '%';
}

loadDashboard();
