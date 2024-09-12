import React, { useContext, useState } from 'react';
import './login.css';
import { Container, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../Authentication/authentication'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className='login-div'>
      <Container className='container-1'>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="password">  {/* Changed the controlId to "password" */}
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <br></br>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Container>
    </div>
  );
}

export default Login;
