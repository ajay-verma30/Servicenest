// authentication.js
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";  // Fixed the import

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      const { token } = response.data;
      
      if (isTokenExpired(token)) {
        alert("Token is expired. Please login again.");
        return;
      }

      setUser(response.data);
      setToken(token);  // Store token in state
      localStorage.setItem('token', token);
      navigate('/ticketlist');
    } catch (error) {
      console.error("Login error: ", error);
      alert('Login failed, please check your credentials.');
    }
  };

  // Automatically check and load token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken); // Set the token in the state
      const decodedToken = jwtDecode(storedToken);
      setUser(decodedToken);
    } else {
      localStorage.removeItem('token');
      setToken(''); // Reset token
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
