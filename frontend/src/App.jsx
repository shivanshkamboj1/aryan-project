import React, { useEffect, useState } from 'react';
import StudentForm from './components/Form';
import StudentList from './components/List';
import API from './Apis/api';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await API.get('/students');
    setStudents(res.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/students/${id}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Management App</h1>
      <StudentForm fetchStudents={fetchStudents} editingStudent={editingStudent} setEditingStudent={setEditingStudent} />
      <StudentList students={students} onEdit={setEditingStudent} onDelete={handleDelete} />
      <ToastContainer />
    </div>
  );
}

export default App;
