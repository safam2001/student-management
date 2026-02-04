const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Ahmed Ali", age: 20, major: "CS" },
  { id: 2, name: "Sara Mohamed", age: 22, major: "Math" },
];

app.get("/students", (req, res) => res.json(students));

app.post("/students", (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.json(newStudent);
});

app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ success: true });
});

app.put("/students/:id", (req, res) => {
  students = students.map(s =>
    s.id == req.params.id ? { ...s, ...req.body } : s
  );
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));