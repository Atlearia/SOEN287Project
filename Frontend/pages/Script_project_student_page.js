



const originalAssesments = [];
let Coursedata;
if(document.title==="COMP 249"){ //Assesments for COMP 249
    const As1 ={Name: "Assignment 1", DueDate: "January 1st 2026", DueDateComp: new Date('2026-01-1'), weight: 10, completed: false, grade: 0}
    const As2 ={Name: "Assignment 2", DueDate: "January 11th 2026", DueDateComp: new Date('2026-01-11'), weight: 5, completed: true, grade: 100}
    const As3 ={Name: "Test 2", DueDate: "Febuary 22nd 2026", DueDateComp: new Date('2026-02-22'), weight: 20, completed: false, grade: 0}
    const As4 ={Name: "Test 1", DueDate: "Febuary 2nd 2026", DueDateComp: new Date('2026-02-2'), weight: 10, completed: true, grade: 80}
    const As5 ={Name: "Test 3", DueDate: "March 22nd 2026", DueDateComp: new Date('2026-03-22'), weight: 15, completed: false, grade: 100}
    const As6 ={Name: "Final", DueDate: "June 24th 2026", DueDateComp: new Date('2026-06-24'), weight: 40, completed: true, grade: 10} 
    
    originalAssesments.push(As1,As2,As3,As4,As5,As6); //store assesments in the Assesments array

    //class info
    Coursedata={code:"COMP 249", name:"Object Oriented Programming II", instructor: "John Smith", Term:"Winter 2026",
        description:"In this class we will gain further understanding on how object oriented programs work."
    };
}

if(document.title==="SOEN 287"){ //Assesments for SOEN 287
    const As1 ={Name: "Assignment 1", DueDate: "January 2nd 2026", DueDateComp: new Date('2026-01-2'), weight: 13, completed: false, grade: 90}
    const As2 ={Name: "Quiz 1", DueDate: "January 29th 2026", DueDateComp: new Date('2026-01-29'), weight: 7, completed: true, grade: 100}
    const As3 ={Name: "Test 2", DueDate: "Febuary 13th 2026", DueDateComp: new Date('2026-02-13'), weight: 8, completed: false, grade: 7}
    const As4 ={Name: "Test 1", DueDate: "Febuary 3rd 2026", DueDateComp: new Date('2026-02-3'), weight: 10, completed: true, grade: 80}
    const As5 ={Name: "Test 3", DueDate: "March 27th 2026", DueDateComp: new Date('2026-03-27'), weight: 12, completed: false, grade: 60}
    const As6 ={Name: "Final", DueDate: "May 24th 2026", DueDateComp: new Date('2026-05-24'), weight: 30, completed: true, grade: 27} 
    const As7 ={Name: "Project", DueDate: "April 15th 2026", DueDateComp: new Date('2026-04-15'), weight: 20, completed: true, grade: 63} 
    originalAssesments.push(As1,As2,As3,As4,As5,As6,As7); //store assesments in the Assesments array

    //class info
    Coursedata={code:"SOEN 287", name:"Web Programming", instructor: "Jason Evans", Term:"Winter 2026",
        description:"In this class we will learn the basics of Web programming."
    };
}

if(document.title==="SOEN 228"){ //Assesments for SOEN 228
    const As1 ={Name: "Assignment 1", DueDate: "January 3rd 2026", DueDateComp: new Date('2026-01-3'), weight: 15, completed: false, grade: 40}
    const As2 ={Name: "Quiz 1", DueDate: "January 21st 2026", DueDateComp: new Date('2026-01-21'), weight: 5, completed: true, grade: 100}
    const As3 ={Name: "Lab 1", DueDate: "Febuary 26th 2026", DueDateComp: new Date('2026-02-26'), weight: 10, completed: false, grade: 90}
    const As4 ={Name: "Test 1", DueDate: "Febuary 7th 2026", DueDateComp: new Date('2026-02-7'), weight: 8, completed: true, grade: 78}
    const As5 ={Name: "Test 2", DueDate: "March 12th 2026", DueDateComp: new Date('2026-03-12'), weight: 14, completed: false, grade: 57}
    const As6 ={Name: "Final", DueDate: "May 2nd 2026", DueDateComp: new Date('2026-05-2'), weight: 30, completed: true, grade: 95} 
    const As7 ={Name: "Project", DueDate: "April 25th 2026", DueDateComp: new Date('2026-04-25'), weight: 18, completed: true, grade: 32} 
    originalAssesments.push(As1,As2,As3,As4,As5,As6,As7); //store assesments in the Assesments array

    //class info
    Coursedata={code:"SOEN 228", name:"System Hardware", instructor: "Elizabeth Brown", Term:"Winter 2026",
        description:"In this class we will understand how the hardware found inside of computers work."
    };
}

originalAssesments.sort((a,b)=>a.DueDateComp - b.DueDateComp); //order the assesments based on date

let Assesments = structuredClone(originalAssesments); //used so that when changing order of which assesment is written first, it doesn't affect the orignal array

//render course info
function renderCourseInfo(){
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
renderCourseInfo()//render the first time when page is loaded


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
    
    Assesments.forEach((a,i)=>{
        if(a.completed==false||checkboxCompleted.checked){ //check if assesment has not been completed and if its completed status matches the checkbox status (used to add the completed assignments)
            let lateMessage="" //used to add a late message
            let statusClass="x" //used to change the background color of each assesment and 'x' is used as default
            if(a.DueDateComp< new Date() && a.completed==false){//check if Assesment is late
                lateMessage=`<p style="color: darkred; font-size:20px; font-weight:bold">Late</p>`
                statusClass="Late"
            }
            if(a.completed==true){ //used for statusclass when the "Show completed Assignments" checkbox is clicked
                statusClass="Complete"
            }
            
            //id is used for late status since in Css id takes priority over class
            outputAssesment.innerHTML +=`
            <div class="AsOut" id="${statusClass}">
            <p>
            Assesment: ${a.Name} <br>Due Date:  ${a.DueDate}<br> Weight: ${a.weight.toFixed(2)}%</p>
            ${lateMessage}
            <button data-index='${i}' class='completed'>Change Completion Status</button>
            <p></p>
            </div>`
            
        }
    }); 


    //add listener to the checkboxes for completed assesmnts
    const completedAssesmentCheckBoxes = document.querySelectorAll(".completed");
    completedAssesmentCheckBoxes.forEach(c=>{
        c.addEventListener("click",function(){
            let index = this.dataset.index;
            originalAssesments[index].completed= !originalAssesments[index].completed; //make an assesment the oppposite of current status
            renderAssesments();
            renderGrades();
            renderGradeChangerPrompt();
            renderGradeChanger();
            DrawGraph();
        })
    })
    
    
    
    
    
    
}
renderAssesments(); //render the assesments the first time the page is loaded


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

DrawGraph();
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

