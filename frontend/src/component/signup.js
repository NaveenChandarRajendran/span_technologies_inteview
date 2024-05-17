import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      // Email validation
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(isValidEmail ? '' : 'Invalid email address');
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError) {
      const payload = {
        user_name: formData.username,
        email: formData.email,
        password: formData.password
      }
      const response = await axios.post("http://localhost:3001/signup", payload);
      if (response.data) {
        navigate('/dashboard');
      }
    } else {
      console.log('Invalid form data');
    }
  };
  return (
    <div>
      {/* <button onClick={() => navigate('/dashboard')}>Submit</button> */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Username:</Form.Label>
          <FormControl type="text" name="username" value={formData.username} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <FormControl type="email" name="email" value={formData.email} onChange={handleInputChange} />
          {emailError && <Alert variant="danger">{emailError}</Alert>}
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <FormControl type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  )
}

export default Signup