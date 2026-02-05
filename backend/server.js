const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const filePath = __dirname + "/students.json";

let students = [];
let nextId = 1;

// تحميل الطلاب عند بدء السيرفر
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, "utf-8");
  students = JSON.parse(data);
  nextId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
}

// حفظ البيانات في ملف JSON
function saveStudents() {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
}

// عرض كل الطلاب
app.get("/students", (req, res) => res.json(students));

// إضافة طالب
app.post("/students", (req, res) => {
  const { name,major } = req.body;
  if (!name) return res.status(400).json({ error: "Name cannot be empty" });
 if(!major)return res.status(400).json({error:"major cannot be empty"})
  if (students.find(s => s.name === name))
    return res.status(400).json({ error: "Student already exists" });

  const newStudent = { id: nextId++, name,major };
  students.push(newStudent);
  saveStudents();
  res.json(newStudent);
});

// حذف طالب
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  saveStudents();
  res.json({ success: true });
});

// تعديل طالب
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name cannot be empty" });

  if (students.find(s => s.name === name && s.id !== id))
    return res.status(400).json({ error: "Student already exists" });

  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  student.name = name;
  saveStudents();
  res.json(student);
});

app.listen(3000, () => console.log("Server running on port 3000"));