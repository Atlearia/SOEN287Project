const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3003;

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

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url.startsWith("/get/")) {
    const type = req.url.split("/")[2];

    if (!data[type]) {
      res.statusCode = 404;
      return res.end("Not found");
    }

    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ [type]: data[type] }));
  }

  if (req.method === "POST" && req.url.startsWith("/add/")) {
    const type = req.url.split("/")[2];

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);

        if (!data[type]) data[type] = [];

        data[type].push(parsed);

        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ [type]: data[type] }));

      } catch {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
    });

    return;
  }

  if (req.method === "POST" && req.url === "/update/course/assessments") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
        try {
            const { courseCode, assessments } = JSON.parse(body);

            // find the course
            const course = data.courses.find(c => c.courseCode === courseCode);

            if (!course) {
              res.statusCode = 404;
              return res.end("Course not found");
            }

            // update assessments
            course.assessments = assessments;

            // save to file
            fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(course));

        } catch (err) {
            res.statusCode = 400;
            res.end("Invalid JSON");
        }
    });

    return;
  }

  // Dashboard Routing
  if (req.method === "GET" && req.url.startsWith("/dashboard/student/")) {
    const studentId = req.url.split('/')[3];
    const student  = data.students.find( s => s.id === studentId);
    if (!student) {
      res.statusCode = 404;
      return res.end('Student not found!');
    }
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(student));
  }

  let filePath = req.url === "/"
    ? path.join(publicDir, "pages","Authentication","SignIn.html")
    : path.join(publicDir, req.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 404;
      return res.end("Not Found");
    }

    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    } else if (filePath.endsWith(".html")) {
      res.setHeader("Content-Type", "text/html");
    } else if (filePath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    }

    res.end(content);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});