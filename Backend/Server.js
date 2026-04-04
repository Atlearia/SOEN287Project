require('dotenv').config();

const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { json } = require('node:stream/consumers');

const app = express();

const hostname = '0.0.0.0';
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

app.post('/update/course/assessments', (req, res) => {
  try {
    const { courseCode, assessments } = req.body;

            // find the course
            const course = data.courses.find(c => c.courseCode === courseCode);

            if (!course) {
              res.status(404);
              return res.send("Course not found");
            }

            // update assessments
            course.assessments = assessments;

            // save to file
            fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

            res.json(course);

        } catch (err) {
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

app.get('/settings/student/:id', (req, res) => {
  const studentId = req.params.id;
  const student  = data.students.find( s => s.id === studentId);
  if (!student) {
    res.status(404);
    return res.send("Student not found!");
  }

    const respone = {
      id: student.id,
      firstName: student.First_Name_,
      lastName: student.Last_Name_,
      email: student.Email_
    };
    return res.json(respone);

});

app.post('/settings/updateprofile', (req, res) => {
  try {
    const {studentId, firstName, lastName, email} = req.body;
    const student = data.students.find( s => s.id === studentId);

    if (!studentId || !student) {
      res.status(404);
      return res.json({error: "Student not found!"});
    }
    student.First_Name_ = firstName;
    student.Last_Name_  = lastName;
    student.Email_      = email;

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
    const {studentId, currentPassword, newPassword} = req.body;
    const student = data.students.find( s => s.id === studentId);

    if (!studentId) {
      res.status(404);
      return res.json({error: "Student not found!"});
    }
    
    if (student.password_ !== currentPassword) {
      res.status(401);
      return res.json({error: "Wrong Password!"});
    }
    
    student.password_ = newPassword;
    
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



//================================================================================
//Forgot Password//

const nodemailer = require('nodemailer'); //allows sending email
const crypto = require('crypto'); //allows generating random token
const resetTokens = {};

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
app.post('/forgot-password',async (req,res)=>{
  const {email} = req.body;

  const student = data.students.find(s => s.Email_ === email);

  if (!student){
    return res.json({message : 'If email already exists, reset link was sent.'})
  }
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 1000*60*60;

  resetTokens[token] = { userId: student.id,expiresAt};
  
  const resetUrl = `http://localhost:${port}/pages/passwordReset/reset-password.html?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html:`
      <p>You requested a password reset.</p>
      <p>If you didn't it, please do not pay attention to this email.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a></p>
      <p>This link expires in 1 hour.</p>
    `,
  }
  

  )
  res.json({ message: 'A reset link was sent.' });

})


app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const record = resetTokens[token];

  if (!record || Date.now() > record.expiresAt) {
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }

  const student = data.students.find(s => s.id === record.userId);

  if (!student) {
    return res.status(400).json({ error: 'Student not found.' });
  }

  student.password_ = newPassword;
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  delete resetTokens[token];

  res.json({ message: 'Password reset successfully.' });
});