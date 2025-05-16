const Student = require('../models/student');

// Create
exports.createStudent = async (req, res) => {
  try {
    const { name, age, course, email } = req.body;
    const student = await Student.create({ name, age, course, email });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all
exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};

// Update
exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
