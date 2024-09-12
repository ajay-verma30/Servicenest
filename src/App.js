import './App.css';
import AuthProvider from './Authentication/authentication';
import Login from './Views/Login';
import Ticket from './Views/Ticket';
import Tickets from './Views/Tickets';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (

    <Router>
          <AuthProvider>
      <Routes>
        <Route>
          <Route path="/ticketlist" element={<Tickets />} />
          <Route path="/ticket/:tID" element={<Ticket/>} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
