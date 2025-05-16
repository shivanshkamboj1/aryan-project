import React, { useState, useEffect } from 'react';
import API from '../Apis/api';

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  const [form, setForm] = useState({ name: '', age: '', course: '', email: '' });

  useEffect(() => {
    if (editingStudent) setForm(editingStudent);
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await API.put(`/students/${editingStudent._id}`, form);
        setEditingStudent(null);
      } else {
        await API.post('/students', form);
      }
      setForm({ name: '', age: '', course: '', email: '' });
      fetchStudents();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="space-y-4 p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <input className="border p-2 w-full" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input className="border p-2 w-full" name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
      <input className="border p-2 w-full" name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
      <input className="border p-2 w-full" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">
        {editingStudent ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default StudentForm;
