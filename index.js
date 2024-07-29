 const express = require('express');
  const app = express();  
  const port = 5000;  
app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); 
  
  
 let employees = [
  // Sample employee data  
  { id: 1, name: 'John Doe', course: 'Engineering', roll_no: '101' },  
  { id: 2, name: 'Jane Smith', course: 'Maths', roll_no: '102' },  
  ]; 
  
  

 // Get all employees data (Read)
  app.get('/', (req, res) => {  
  res.json(employees);  
  });  


 // Get a single employee record (Read)
  app.get('/:id', (req, res) => {  
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));  
  if (!employee) return res.status(404).send('Employee not found');  
  res.json(employee);  
  }); 
  
  

// Insert a new employee record (Create)
  app.post('/', (req, res) => {  
  const { name, course, roll_no } = req.body;  
  const newEmployee = {  
    id: employees.length + 1,  
    name,  
    course,  
    roll_no  
  };  
  employees.push(newEmployee);  
  res.status(201).send('Employee added successfully');  
  }); 
  
  


 // Update an employee record (Update)
  app.put('/:id', (req, res) => {  
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));  
  if (!employee) return res.status(404).send('Employee not found');  
 const { name, course, roll_no } = req.body;
  employee.name = name;  
  employee.course = course;  
  employee.roll_no = roll_no;  
  
  res.status(201).send('Employee updated successfully');  
  });  



 // Partially update an employee record (Update)
  app.patch('/:id', (req, res) => {  
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));  
  if (!employee) return res.status(404).send('Employee not found');  
 const { name, course, roll_no } = req.body;
  if (name) employee.name = name;  
  if (course) employee.course = course;  
  if (roll_no) employee.roll_no = roll_no;  
  
  res.status(201).send('Employee updated successfully');  
  });  


  
 // Delete an employee record (Delete)
  app.delete('/:id', (req, res) => {  
  const employeeIndex = employees.findIndex(emp => emp.id === parseInt(req.params.id));  
  if (employeeIndex === -1) return res.status(404).send('Employee not found');  
  
  employees.splice(employeeIndex, 1);  
  res.status(204).send();  
  });  
 app.listen(port, () => {
  console.log(`Server running on port ${port}`);  
  });