import { useEffect, useState } from "react";
import {
  fetchStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "./services/service";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [search, setSearch] = useState("");

  // تحميل الطلاب عند فتح الصفحة
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  // إضافة طالب
  const handleAdd = async () => {
    if (!name.trim() || !major.trim()) {
      alert("Please enter name and major");
      return;
    }

    await addStudent({ name: name.trim(), major: major.trim() });
    setName("");
    setMajor("");
    loadStudents();
    alert("Student added successfully");
  };

  // حذف طالب
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    await deleteStudent(id);
    loadStudents();
    alert("Student deleted successfully");
  };

  // تعديل طالب
  const handleEdit = async (student) => {
    const newName = prompt("New name:", student.name);
    const newMajor = prompt("New major:", student.major);

    if (!newName || !newMajor) return;

    await updateStudent(student.id, {
      name: newName.trim(),
      major: newMajor.trim(),
    });

    loadStudents();
    alert("Student updated successfully");
  };

  // فلترة حسب الاسم أو الاختصاص 
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.major?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
      <h2>Student Management</h2>

      {/* إضافة طالب */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />

        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* البحث */}
      <input
        type="text"
        placeholder="Search by name or major..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "15px", width: "60%" }}
      />

      {/* الجدول */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Major</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="4">No students found</td>
            </tr>
          ) : (
            filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.major}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(s)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                  <input type="text"  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;