import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate, useLocation } from 'react-router-dom';

const Addemployee = () => {
  const [employee, setemployee] = useState({
    employeeId: " ",
    name: " ",
    designation: " ",
    salary: " ",
    department: " ",
    location: " "
  });
  
  const navigate= useNavigate();

  const handleChange = (e) => {
    setemployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee); // Log employee data

    // Reset form
    setemployee({
      employeeId: " ",
      name: " ",
      designation: " ",
      salary: " ",
      department: " ",
      location: " "
    });
  };
  const location= useLocation()
  let sendData=()=>{
    if(location.state!=null){
      axios.put('http://localhost:3000/api/employees/edit/'+location.state.employee._id,employee).then((res)=>{
        alert('data updated');
        navigate('/home')
      }).catch((error)=>{
        console.log(error);
      })
    }
    else{
      axios.post('http://localhost:3000/api/employees/Addemployee/',employee).then((res)=>{
         navigate('/home')
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
  useEffect(()=>
  {
    if(location.state!=null)
    {
      setemployee({...employee,
        employeeId:location.state.employee.employeeId,
        name: location.state.employee.name,
        designation:location.state.employee.designation,
        salary:location.state.employee.salary,
        department:location.state.employee.department,
        location:location.state.employee.location
        
      })
    }
  },[])
// employeeImage:String,
//employeeId:String,
//employeeName:String,
//cousrseCategory:String,
//employeeDiscription:String
  return (
    <Container sx={{ paddingTop: 3, background: 'white'}} className="add">
      <Typography variant="h4" className="add-title" color="blueviolet">
        Edit employee Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="employeeId"
          label="employee ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.employeeId}
          onChange={handleChange}
        />
        <TextField
          name="name"
          label="employee name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.name}
          onChange={handleChange}
        />
        <TextField
          name="designation"
          label="employee designation"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.designation}
          onChange={handleChange}
        />
        <TextField
          name="salary"
          label="employee salary"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.salary}
          onChange={handleChange}
        />
        <TextField
          name="department"
          label="employee Department"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={employee.department}
          onChange={handleChange}
        />
          <TextField
          name="location"
          label="employee Location"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={employee.location}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="add-button"
          onClick={sendData}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Addemployee;