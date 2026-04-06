



const originalAssesments = [];
let Coursedata;



async function loadCourses() {
    const res = await fetch('/get/courses');

    if (!res.ok) {
        console.error("Failed to fetch courses");
        return [];
    }

    const data = await res.json();
    return data.courses;
}

async function initCoursePage() {
    const courseCode = sessionStorage.getItem("courseCode");
    const studentid = sessionStorage.getItem("id");

    if (!courseCode) {
        console.error("No courseCode found in sessionStorage");
        return;
    }
    const courses = await loadCourses();
    CD = courses.find(c => c.courseCode === courseCode);
    if (!CD) {
        console.error("Course not found");
        return;
    }
    if (CD.assessments) {
        CD.assessments.forEach(a => {
            const As1 ={Name: a.name, DueDate: a.DueDate, DueDateComp: new Date(a.DueDateComp), weight: a.weight, completed: a.grades[studentid] != null , grade: a.grades[studentid] ?? 0}
            originalAssesments.push(As1)
        })
        //originalAssesments.push(...CD.assessments);
    }
    Coursedata={code:CD.courseCode, name:CD.courseName, instructor:CD.instructor, Term:CD.term,
        description:CD.description
    };
}

originalAssesments.sort((a,b)=>a.DueDateComp - b.DueDateComp); //order the assesments based on date

let Assesments = structuredClone(originalAssesments); //used so that when changing order of which assesment is written first, it doesn't affect the orignal array

//render course info
function renderCourseInfo(){
    const classHead =document.getElementById("headerCode");
    classHead.innerHTML="";
    classHead.innerHTML=`Course: ${Coursedata.code}`
    
    const classInfo = document.getElementById("ClassInfo");

    classInfo.innerHTML="";//clear it if it ever needs to be called again
    classInfo.innerHTML=`
        <div class="CourseInfo">
            <p class="InfoTitle">Course Code: </p>
            <p class="Info">${Coursedata.code}</p>
        </div>
        <div class="CourseInfo">
            <p class="InfoTitle">Course Name: </p>
            <p class="Info">${Coursedata.name}</p>
        </div>
        <div class="CourseInfo">
            <p class="InfoTitle">Course Instructor: </p>
            <p class="Info">${Coursedata.instructor}</p>
        </div>
        <div class="CourseInfo">
            <p class="InfoTitle">Course Term: </p>
            <p class="Info">${Coursedata.Term}</p>
        </div>
        <div class="CourseInfo">
            <p class="InfoTitle">Course Description: </p>
            <p class="Info">${Coursedata.description}</p>
        </div>
    `
}
async function initPage() {//make sure the code is created before rendering stuff
    await initCoursePage();
    renderCourseInfo()//render the first time when page is loaded
    renderAssesments(); //render the assesments the first time the page is loaded
    renderGrades();
    renderGradeChangerPrompt()
    renderGradeChanger();
    DrawGraph();
}
initPage();



const checkboxCompleted = document.getElementById("showCompleted");
const checkboxWeight = document.getElementById("WeightArrangement");
const outputAssesment = document.getElementById("outputAssesment");

checkboxCompleted.addEventListener("change",renderAssesments); //check if the checkbox has been selected and then rerender the Assesment portion
checkboxWeight.addEventListener("change",renderAssesments);


function renderAssesments(){
    outputAssesment.innerHTML =""; //clear the Assesments so that it can be rewritten
    
    if(checkboxWeight.checked){
        originalAssesments.sort((a,b)=>b.weight - a.weight);
        Assesments=structuredClone(originalAssesments); //used due to graph
    }
    else{
        originalAssesments.sort((a,b)=>a.DueDateComp - b.DueDateComp);
        Assesments=structuredClone(originalAssesments); //used due to graph
    }
    
    const tableHeader = document.createElement("thead");
    tableHeader.innerHTML = `
        <tr>
            <th>Assessment</th>
            <th>Due Date</th>
            <th>Weight</th>
            <th>Status</th>
            <th>Toggle Completion</th>
        </tr>
    `;
    outputAssesment.appendChild(tableHeader);

    Assesments.forEach((a,i)=>{
        if(a.completed==false||checkboxCompleted.checked){ //check if assesment has not been completed and if its completed status matches the checkbox status (used to add the completed assignments)
            const container = document.createElement("tbody");

            // Determine status of assesment
            let StatusText = "Pending";
            let StatusClass = "pending";
            const now = new Date();
            if (a.completed) {
                StatusText = "Complete";
                StatusClass = "complete";
            } else if (a.DueDateComp < now) {
                StatusText = "Late";
                StatusClass = "late";
            }

            container.innerHTML=`
                <tr>
                    <td>${a.Name}</td>
                    <td>${a.DueDate}</td>
                    <td>${a.weight.toFixed(2)}%</td>
                    <td><span class="assessment-status ${StatusClass}">${StatusText}</span></td>
                    <td><button class="completed toggleButton" data-index="${i}">Toggle</button></td>
                </tr>
            `;
            
            outputAssesment.appendChild(container);
            
            
        }
    }); 


    //add listener to the checkboxes for completed assesmnts
    const completedAssesmentCheckBoxes = document.querySelectorAll(".completed");
    completedAssesmentCheckBoxes.forEach(c=>{
        c.addEventListener("click",async function(){
            let index = this.dataset.index;
            originalAssesments[index].completed= !originalAssesments[index].completed; //make an assesment the oppposite of current status
            try{
                fetch('/course/updateGrade', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentId: sessionStorage.getItem('id'),
                        courseCode: Coursedata.code,
                        assessmentName: originalAssesments[index].Name,
                        grade: (originalAssesments[index].completed ? originalAssesments[index].grade : null)
                    })
                })
            }catch(err) {
                alert("Couldn't update the score");
            }
            renderAssesments();
            renderGrades();
            renderGradeChangerPrompt();
            renderGradeChanger();
            DrawGraph();
        })
    })
    
    
    
    
}



const outputTotalPercentage = document.getElementById("TP");
const outputWeightedAverage = document.getElementById("WeightedAverage");

function renderGrades(){
    outputWeightedAverage.innerHTML="";//clear previously written grades
    outputTotalPercentage.innerHTML="";

    
    
    let gradeTP=0;
    let gradeWA=0;
    let TotalWeight=0;

    Assesments.forEach(a=>{
        if(a.completed==true){
            gradeTP+=a.weight*a.grade/100;
            TotalWeight+= a.weight;
        }
    })
    gradeWA = (TotalWeight > 0 ? (gradeTP / TotalWeight) * 100 : 0);//so that if no completed assignment it shows 0?
    outputWeightedAverage.innerHTML +=""+gradeWA.toFixed(2)+"%";
    outputTotalPercentage.innerHTML +=""+gradeTP.toFixed(2)+"% with "+TotalWeight.toFixed(2)+"% of the class completed.";

    
    
    const Pbar = document.getElementById("Progressbar")
    Pbar.style.width = gradeTP+"%";
    const Fbar = document.getElementById("Failbar")
    let FbarPer;
    if((TotalWeight.toFixed(2)-gradeTP.toFixed(2))<0){ //used to fix issues when this argument was negative
        FbarPer=0
    }
    else{
        FbarPer=TotalWeight.toFixed(2)-gradeTP.toFixed(2)
    }
    Fbar.style.width = FbarPer+"%";
}
renderGrades(); //render the grades the first time the page is loaded


const GradeInputs = document.getElementById("GradeInputs");

function renderGradeChangerPrompt(){
    GradeInputs.innerHTML="" ;
    originalAssesments.forEach((a,i)=>{
        if(a.completed==true){ //check if assesment has been completed to give it a grade
        GradeInputs.innerHTML +=`
        <label>
        Assesment: ${a.Name}, what grade did you receive</label>
            <input type='number' data-index='${i}' class='UserGradeInput' placeholder="Enter Grade Received" min='0' max='100' step='0.01' style='width: 150px'>
        <button data-index='${i}' class='submitGradeChange'>Change Grade</button><br> `
        }//make button larger with css maybe add it in the seperate css file
    });
    
}
renderGradeChangerPrompt()



function renderGradeChanger(){
    //add listener to the checkboxes for completed assesmnts
    const UserGradesChangeButton = document.querySelectorAll(".submitGradeChange");
    UserGradesChangeButton.forEach(b=>{
        b.addEventListener("click",function(){
            let index = this.dataset.index;
            let value = parseFloat(document.querySelector(`.UserGradeInput[data-index='${index}']`).value);
            if(value<0) value=0;
            //if(value>100) value=100;
            if(!isNaN(value)){
                originalAssesments[index].grade= value; //make grade of assesment = inputed grade
                Assesments=structuredClone(originalAssesments);
                renderGrades();
                DrawGraph();

                try{
                    fetch('/course/updateGrade', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            studentId: sessionStorage.getItem('id'),
                            courseCode: Coursedata.code,
                            assessmentName: originalAssesments[index].Name,
                            grade: (originalAssesments[index].completed ? originalAssesments[index].grade : null)
                        })
                    })
                }catch(err) {
                    alert("Couldn't update the score");
                }
            }
            
            renderGradeChangerPrompt();
            renderGradeChanger();
        })
    })
}
renderGradeChanger();

//draw graph portion
const Canvas = document.getElementById('gradesChart');
const Context = Canvas.getContext('2d');
const GradestobeDrawn=[];
const AstobeDrawn=[]; //Assesments that need to be drawn


function DrawGraph(){
    
    Canvas.width=window.innerWidth*0.9; //make width of graph and canvas dynamic with the users device
    let Cwidth=Canvas.width;
    let Cheight=Canvas.height;
    GradestobeDrawn.length=0; //clear the array
    AstobeDrawn.length=0; //clear the array

    originalAssesments.sort((a,b)=>a.DueDateComp - b.DueDateComp); //make sure the graph is always in chronological order
    originalAssesments.forEach(a=>{
        if(a.completed==true){
            GradestobeDrawn.push(a.grade.toFixed(2));
            AstobeDrawn.push(a.Name);
        }
    })
    Context.beginPath();
    Context.moveTo(30,10); //draw y-axis with enough space to put number
    Context.lineTo(30,Cheight-30)//space to write the labels on the x-axis

    Context.lineTo(Cwidth,Cheight-30); //draw x-axis with enough space to put label assignments
    Context.strokeStyle="black";
    Context.lineWidth = 2;

    Context.fillStyle="black";
    Context.font="10px Arial";
    //y-axis labels
    for(let i=0; i<=100; i+=20){ //grade labels of 0,20,40,60,80,100
        let y=Cheight-30-i*2;//used for height scaling
        Context.fillText(i, 5, y+2) //y+2 for better centering
        Context.moveTo(25,y);//dash for the grade
        Context.lineTo(30,y);
    }
    //x-axis labels

    AstobeDrawn.forEach((L,i)=>{
        let x= 30+(i+1)*((Cwidth-30)/(AstobeDrawn.length +2)) //this is to center the points on the x-axis better
        Context.fillText(L, x-20, Cheight-15) //try and make text more center under the dash
        Context.moveTo(x,Cheight-30);//dash for the label
        Context.lineTo(x,Cheight-25);
    })


    Context.moveTo(30+((Cwidth-30)/(AstobeDrawn.length +2)),200-GradestobeDrawn[0]*2+30) //200-grade*2 is used to scale the grade height to be based on 200 in addition, it is -grade because the canvas origin is at the top left
    GradestobeDrawn.forEach((g,i)=>{
        let x= 30+(i+1)*((Cwidth-30)/(AstobeDrawn.length +2)) //this is to center the points on the x-axis better
        Context.lineTo(x,200-g*2+30); //draw the graph
        
    });
    Context.stroke();
    //draw the points
    GradestobeDrawn.forEach((g,i)=>{
        let x= 30+(i+1)*((Cwidth-30)/(AstobeDrawn.length +2)) //this is to center the points on the x-axis better
        if(g>=60){Context.fillStyle="rgb(62, 180, 62)";}
        if(g<60){Context.fillStyle="red";}
        Context.font="50px Arial";
        Context.fillText(".",x-7,200-g*2+32);
        Context.font="10px Arial";
        Context.fillText(g, x-8, Cheight-5);
    });
    
    if(checkboxWeight.checked){ //ensure that the index being used matches how the buttons are set up
        originalAssesments.sort((a,b)=>b.weight - a.weight);
        Assesments=structuredClone(originalAssesments);
    }
}

