import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      {students.map((student) => (
        <div key={student._id} className="flex justify-between items-center p-4 border rounded mb-2">
          <div>
            <p><strong>{student.name}</strong> ({student.age}) - {student.course}</p>
            <p className="text-sm text-gray-600">{student.email}</p>
          </div>
          <div className="space-x-2">
            <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => onEdit(student)}>Edit</button>
            <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => onDelete(student._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
