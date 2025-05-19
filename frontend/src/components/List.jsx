import React, { useRef } from 'react';
import loadRazorpay from './Razorpaybutton';

const StudentList = ({ students, onEdit, onDelete }) => {
  const number = useRef(null)
  const loadRazorpay1=(n)=>{
    console.log(n)
  }
  return (
    <div className="mt-6">
      {students.map((student) => (
        <div key={student._id} className={student.pro?"flex justify-between items-center p-4 border rounded mb-2 bg-red-200" : "flex justify-between items-center p-4 border rounded mb-2"}>
          <div>
            <p><strong>{student.name}</strong> ({student.age}) - {student.course}</p>
            <p className="text-sm text-gray-600">{student.email}</p>
          </div>
          <div className="space-x-2">
            <input type='number' name='amount' onChange={(event)=>number.current=+event.target.value}/>
            <button onClick={()=>loadRazorpay(number.current,student._id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:cursor-pointer">Pay Now</button>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => onEdit(student)}>Edit</button>
            <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => onDelete(student._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
