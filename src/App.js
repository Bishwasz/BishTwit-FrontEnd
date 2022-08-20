import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { useAuth } from './Context/AuthContext';
import { AuthProvider } from './Context/AuthContext';

import { Container} from 'react-bootstrap'

import Signup from './Components/signup';
import Login from './Components/login';
import PrivateRoute from './Components/Privatroute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dash from './Components/dash';


function App(){



  return(
    <Container  style={{minHeight: "100vh"}}>
      <div >
        <AuthProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Signup/>}/>
              <Route path="/login" element={<Login/>} />
              <Route element={<PrivateRoute/>}>
                <Route path='/dash' element={<Dash/>}/>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
        

      </div>
    </Container>
  );
}
export default App;


