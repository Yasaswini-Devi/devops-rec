const express = require('express');
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: 'Yasaswini', age: 20, department: 'CSE' },
  { id: 2, name: 'Priya', age: 21, department: 'CSE' }
];

app.get('/students', (req, res) => res.json(students));

app.post('/students', (req, res) => {
  const student = { id: students.length + 1, ...req.body };
  students.push(student);
  res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({message:'Not found'});
  students[index] = { id, ...req.body };
  res.json(students[index]);
});

app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({message:'Not found'});
  students.splice(index, 1);
  res.json({message:'Deleted successfully'});
});

app.listen(3000, () => console.log('Server running on port 3000'));
