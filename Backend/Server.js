const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { json } = require('node:stream/consumers');

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3003;//for render stuf, if doesnt work just dont env it and setup antoher entry 

const dataFile = path.join(__dirname, 'data.json');
const publicDir = path.join(__dirname, '../Frontend');

let data = {};

if (fs.existsSync(dataFile)) {
  try {
    data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch {
    data = {};
  }
} 

//if the data i want does not exist create empty arrays for it
if (!data.courses) data.courses = []; 
if (!data.students) data.students = [];
if (!data.admins) data.admins = [];

function calculateAverage(assessments, studentID) {
  let totalWeight = 0;
  let totalWeightGrade = 0;

  for (const assessment of assessments) {
    const grade = assessment.grades?.[studentID];
    if (grade == null || grade === undefined) continue;
    totalWeightGrade += grade * assessment.weight;
    totalWeight += assessment.weight;
  }

  if (totalWeight === 0) return null;
  return Math.round((totalWeightGrade / totalWeight) *100) /100;
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/get/:type', (req, res) => {
  const type = req.params.type;

  if (!data[type]) {
    res.status(404);
    return res.send("Not found");
  }

  res.json({ [type]: data[type] });
});

/*
app.post('/add/templates', (req, res) => {
  try{
    const { TemplateName, notes, assessments, adminId } = req.body;
    const admin = data.admins.find(a=> a.id.trim() === String(adminId).trim()); //get theadmin that created it
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    
    if (!data.templates) data.templates = [];
    data.templates.push({ TemplateName, notes, assessments, adminId });
    
    if (!admin.courseTemplates) admin.courseTemplates = [];
    admin.courseTemplates.push(TemplateName);
    
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.json({ success: true });
  }catch (err) {
    console.error("Error saving template:", err);
    res.status(500).json({ error: "Server error" });
  }
});*/
app.post('/add/:type', (req, res) => {
  const type = req.params.type;

  try {
    const parsed = req.body;

    if (!data[type]) data[type] = [];

    data[type].push(parsed);

    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.json({ [type]: data[type] });

  } catch {
    res.status(400);
    res.send("Invalid JSON");
  }
});

app.post('/update/course/status', (req, res) => {
  try {
    const { courseCode, active } = req.body;

            // find the course
            const course = data.courses.find(c => c.courseCode === courseCode);

            if (!course) {
              res.status(404);
              return res.send("Course not found");
            }

            course.active = active;

            // save to file
            fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

            res.json(course);

        } catch (err) {
            res.status(400);
            res.send("Invalid JSON");
        }
});
app.post('/update/course/assessments', (req, res) => {
  try {
    const { courseCode, assessments } = req.body;

            // find the course
            const course = data.courses.find(c => c.courseCode === courseCode);

            if (!course) {
              res.status(404);
              return res.send("Course not found");
            }

            // update assessments that already exist
            course.assessments.forEach((oA, index) => {
              if (assessments[index]) {
                oA.name = assessments[index].name;
                oA.weight = assessments[index].weight;
                oA.DueDateComp = assessments[index].DueDateComp;
                oA.DueDate = assessments[index].DueDate;
                
              }
            });

            //add new assesments if it exceeds the current size
            for (let i = course.assessments.length; i < assessments.length; i++) {
              course.assessments.push({
                name: assessments[i].name,
                weight: assessments[i].weight,
                DueDate: assessments[i].DueDate,
                DueDateComp: assessments[i].DueDateComp,
                
              });
            }

            // save to file
            fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

            res.json(course);

        } catch (err) {
            res.status(400);
            res.send("Invalid JSON");
        }
});

app.post('/course/updateGrade', (req, res) => {
  
  const {studentId, courseCode, assessmentName, grade} = req.body;
  try{
    const course = data.courses.find(c => c.courseCode === courseCode);
    if (!course) {
      res.status(404);
      return res.send("Course not found");
    }

    course.assessments.find(a => a.name === assessmentName).grades[studentId] = grade;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.json(course);
  }catch(err) {
    res.status(400);
    res.send("Invalid JSON");
  }
});


// Dashboard Routing
app.get('/dashboard/student/:id', (req, res) => {
  const studentId = req.params.id;
  const student  = data.students.find( s => s.id === studentId);
  if (!student) {
    res.status(404);
    return res.send("Student not found!");
  }
    
    const enrollCourseCode = student.coursesEnrolled; // get all the enrollment courses
    const relevantCourses = data.courses.filter(c => enrollCourseCode.includes(c.courseCode)).map(c => ({
      code: c.courseCode,
      title: c.courseName,
      assessments: c.assessments.map(a => ({
        name: a.name,
        weight: a.weight,
        dueDate: a.dueDate || null,
        grade: a.grades?.[studentId] ?? null
      })),
      average: calculateAverage(c.assessments, studentId) ?? 0
    }));

    const respone = {
      id: student.id,
      email: student.Email_,
      courses: relevantCourses
    };
    return res.json(respone);

});

app.get('/settings/:role/:id', (req, res) => {
  const id = req.params.id;
  const role = req.params.role;
  let user;
  if (role === 'student') {
    user  = data.students.find( s => s.id === id);
  }else if (role === 'admin') {
    user = data.admins.find(a => a.id === id);
  }

  if (!user) {
    res.status(404);
    return res.send("Student not found!");
  }

    const respone = {
      id: user.id,
      firstName: user.First_Name_,
      lastName: user.Last_Name_,
      email: user.Email_
    };
    return res.json(respone);

});

app.post('/settings/updateprofile', (req, res) => {
  try {
    const {id, role, firstName, lastName, email} = req.body;
    let user;
    if (role === 'student') {
      user = data.students.find( s => s.id === id);
    }else if (role === 'admin') {
      user = data.admins.find(a => a.id === id);
    }

    if (!id || !user) {
      res.status(404);
      return res.json({error: "Student not found!"});
    }

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    } 

    user.First_Name_ = firstName;
    user.Last_Name_  = lastName;
    user.Email_      = email;

    fs.writeFile(dataFile, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        res.status(500);
        return res.json({ error: "Failed to save" });
      }
      res.json({ success: true });
    })
  }catch(err) {
    res.send(err);
  }
})

app.post('/settings/updatepassword', (req, res) => {
  try {
    const {id, role, currentPassword, newPassword} = req.body;
    let user;
    if (role === 'student') {
      user = data.students.find( s => s.id === id);
    }else if (role === 'admin') {
      user = data.admins.find( a => a.id === id);
    }


    if (!id || !role || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    if (user.password_ !== currentPassword) {
      res.status(401);
      return res.json({error: "Wrong Password!"});
    }
    
    user.password_ = newPassword;
    
    fs.writeFile(dataFile, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        res.status(500);
        return res.json({ error: "Failed to save" });
      }
      res.json({ success: true });
    })
  }catch(err) {
    res.send(err);
  }
})

app.post('/enroll', (req, res) => {
  try {
    const {studentId, courseCode } = req.body;

    if (!studentId || !courseCode) {
      res.status(400);
      return res.json({ error: "studentId and courseCode are required" });
    }

        const course = data.courses.find(
          c => c.courseCode === courseCode
        );

        if (!course) {
          res.status(404);
          return res.json({ error: "Course not found" });
        }

        const student = data.students.find(s => s.id === studentId);

        if (!student) {
          res.status(404);
          return res.json({ error: "Student not found" });
        }

        const alreadyEnrolled = student.coursesEnrolled.some(c => c.includes(courseCode));
        if (alreadyEnrolled) {
          res.status(409);
          return res.json({ error: "Already enrolled" });
        }

        student.coursesEnrolled.push(courseCode);

        for (const assessment of course.assessments) {
          if (!assessment.grades) assessment.grades = {};
          assessment.grades[studentId] = null;
        }

        fs.writeFile(dataFile, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            res.status(500);
            return res.json({ error: "Failed to save" });
          }
          res.json({ success: true });
        })

  } catch {
    res.status(400);
    res.json({ error: "Invalid JSON" });
  }
});

app.post('/unenroll', (req, res) => {
  try{
    const { studentId, courseCode } = req.body;

    if (!studentId || !courseCode) {
      res.status(400);
      return res.json({ error: "studentId and courseCode are required" });
    }

    const student = data.students.find(s => s.id === studentId);
    if (!student) {
      res.status(404);
      return res.json({ error: "Student not found" });
    }

    const isEnrolled = student.coursesEnrolled.some(
      c => c === courseCode
    );

    
    if (!isEnrolled) {
      res.status(404);
      return res.json({ error: "You are not enrolled in this course" });
    }

    student.coursesEnrolled = student.coursesEnrolled.filter(
      c => c !== courseCode
    );

    const course = data.courses.find(
      c => c.courseCode === courseCode
    );

    if (course) {
      if (course.assessments){
        for (const assessment of course.assessments) {
          if (assessment.grades) delete assessment.grades[studentId];
        }
      }
    }

    fs.writeFile(dataFile, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        res.status(500);
        return res.json({ error: "Failed to save" });
      }
      res.json({ success: true });
    });

  }catch(err) {
    res.status(400);
    res.json({ error: "Invalid JSON" });
  }
});
//================================================================================

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, "pages", "Authentication", "SignIn.html"));
});

app.use(express.static(publicDir));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});