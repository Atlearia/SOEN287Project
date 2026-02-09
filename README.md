## Git Commands
### Initialize git on your local folder
```
git init
```

### Add remote url
```
git remote add [remote-name] [url]
```

### Pulling public repo to local
```
git pull [remote-name] [branch (default main/master)]
```

### Pushing changes to repo
- Add changes of all files
```
git add .
```

- Add changes of a specific file
```
git add [filename.ext]
```

- Commit changes
```
git commit -m '[Commit Message]'
```

- Push changes to repo
```
git push [remote-name] [branch-name]
```

---

## Project

### Project (quick) description
University students often struggle to keep track of their courses, assessments, deadlines, and progress
throughout the semester. While Learning Management Systems (LMS) provide course materials, they
often lack personalized tracking, progress visualization, and simple planning tools.
Your team has been asked to design and develop a web-based Smart Course Companion that helps
students organize their courses, manage assessments, track grades, and visualize their academic
progress. The system should also provide instructors or administrators with basic tools to manage
course and assessment structures.

### Minimum Required Features
Students should be able to:
- Create and manage a personal account.
- Add courses they are enrolled in (course code, name, instructor, term).
- View assessments for each course (assignments, labs, quizzes, exams…).
- Enter earned marks and total marks for assessments.
- Automatically calculate and display current course averages.
- View upcoming assessments across all courses in a single dashboard.
- Mark assessments as completed or pending.
Notes
- Project to be done in groups.
- Each group should have 3 (min) or 4(max) students. This is very important.
- If you reuse material from other sources (internet, books, papers, websites…), you
must provide appropriate citations.
- Edit or delete their own courses and assessments.
- View visual summaries such as progress bars or charts (e.g., per-course progress bars, current
average per course, or a chart showing performance trends or assessment completion).
Instructors/Admin users should be able to:
- Create and manage courses.
- Define assessment categories and their weightings for each course.
- Provide reusable course structures for students.
- View anonymized usage statistics. (e.g., percentage of students who have completed
assessments, which could be useful for monitoring progress and considering deadline
extensions.)
- Enable or disable courses.

### Technical/Implementation Notes
- The system must be web-based and responsive.
- Backend must be implemented using Node.js.
- Authentication is required for all users.
- Data must be persisted.
- Students may only access their own data.
- All calculations must be performed on the server side.
- Input validation is required.
- Clear project structure and modular design are expected.
- You can use any library/framework you want.

### Bonus (with deliverable 2)
- GPA estimation across all courses.
- Export grades to PDF or CSV.
- Deadline reminders via email.
- Dark/light mode support.
Note: Please note that the description presented above is preliminary and other
requirements/features might be needed.

### Deliverables
There are two (2) deliverables for this project as follows:
- Deliverable 1 – Frontend: due Friday, February 27, 2026. This deliverable is about what a
user of the system can see and do. Please take note: a user here means any user of the website.
This can be a student or an instructor/admin. For this deliverable, data might be entered during
execution or might be “hard-coded”.
Marking rubric for deliverable #1:
o Completeness: 5 marks
o Look and feel(style): 5 marks
o Navigation between pages: 5 marks
o Total marks:15
- Deliverable 2 - Backend: due Friday, March 27, 2026. In this deliverable, data received from
users, generated, or sent to users is stored in a data store on the backend.
- There will be no hard-coded data as of deliverable #2 as data will go to/come from the data
store. Also, you might need to revisit some of the features you implemented in deliverable #1.
Marking rubric for deliverable #2:
o Completeness: 3 marks
o Look and feel(style): 1 mark
o Navigation between pages: 1 mark
o Data store: 10 marks
o Total marks:15
o Bonus: 2 points
For each deliverable, you are going to demo your project. When each deliverable is due, you will be
notified so you can pick a demo slot from Moodle scheduler. All demos will happen online through
Zoom. More information on scheduling and demoing will be provided close to the deadline.
In addition to the demo, you need to submit the following with each deliverable:
- A list of features that have been implemented so far,
- A list of features to be implemented in the next deliverable,
- A completed and signed “Teamwork Discussion” sheet (see Moodle) showing the
contribution(s) of each team member,
- A compressed file containing all your website’s files,
- An installation guide stating how to deploy your website, and
- A user guide showing how to use your website.

### Submission:
You need to submit each deliverable before 11:59pm of its specified due date above through Moodle.
Please see the Project’s section in Moodle for the submission link.
A few points please:
- The project must be done in teams of 3 (minimum) or 4 (maximum) students, not more,
not less.
- The expectations from teams are the same, regardless of the size of the team.
- You have the responsibility to make your own team. We will post on Moodle the list of all
students enrolled in the course: names and emails. As soon as you have a team, please remove
your name from that list.
- Make sure you meet, as a group, 2 or 3 times a week to check each other’s contributions and
progress. Statements like “we were surprised on the day of delivery that a colleague did
not do their part” will not be accepted.
- Make sure you submit each deliverable ahead of the deadline. That is, do not wait until the
last minute.
- All submissions will be through Moodle. Do not send us your submission by email, as we
cannot submit it for you. Email submissions will not be accepted.
- Only one member of the team can submit, do not submit more than once. However, it is
understood that what is submitted is endorsed by all team members.

### Marking considerations
For the marking of your deliverables, please keep in mind the following:
- Not all group members will necessarily get the same mark. There is a mark for the whole team
and there are individual marks. The individual marks are derived from the contribution as
stated in the "Teamwork discussion sheet" document and from the outcome of the demo.
- There is a mark for the work as a product of a team. If the product is not good, all team
members will lose marks. A statement like "My part is working fine, the problem is in others'
parts" is not accepted. After all, as engineers, you need to work as a team to deliver a
professional product.
- Make sure you detail the contribution(s) of each team member in the discussion sheet. The
golden rule here is: "Be professional in reporting the contributions and do not cover up
for a team member who did not contribute.".
- After grading, if you send us emails such as "I did most of the work in deliverable #1 …",
please make sure to CC all of your team members. We will need confirmation from the other
members on this. In that case, team members might have their marks appropriately reviewed
(up or down). You will also have to justify why you did not make that statement during the
submission and/or the demo.

---

## How to Run (Deliverable 1)
1. Navigate to the `frontend/` folder
2. Open `index.html` in any web browser