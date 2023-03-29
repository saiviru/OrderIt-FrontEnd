import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import ConfirmEmail from "./Components/Auth/ConfirmEmail";
import Status from "./Components/Auth/Status";
import MediaControlCard from "./Components/Dashboard/index";
import MenuList from "./Components/Dashboard/MenuList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from "./Components/Auth/GlobalStates";
import {Account} from './Components/Auth/Account';
import ProtectedComponent from './Components/Auth/ProtectedComponent';

function App() {
  return (
    <main className="App">
      {/* <AuthContext> */}
        <Router>
        <AuthContextProvider>
      <Account>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<ProtectedComponent><MenuList /></ProtectedComponent>} />
            <Route path="/status" element={<ProtectedComponent><Status /></ProtectedComponent>} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirmEmail" element={<ConfirmEmail />} />
          </Routes>
      </Account>
        </AuthContextProvider>
        </Router>
      {/* </AuthContext> */}
      <ToastContainer style={{fontSize:'1rem'}} />
    </main>
  );
}

export default App;
