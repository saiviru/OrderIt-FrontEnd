import Register from "./Components/Auth/Register";
// import Register from "./Components/Auth/NewRegister";
import Login from "./Components/Auth/Login";
import ConfirmEmail from "./Components/Auth/ConfirmEmail";
import Status from "./Components/Auth/Status";
import MediaControlCard from "./Components/Dashboard/index";
import MenuList from "./Components/Dashboard/MenuList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from "./Components/Auth/GlobalStates";
import {Account} from './Components/Auth/Account';
import {Checkout} from './Components/Dashboard/Checkout'
import ProtectedComponent from './Components/Auth/ProtectedComponent';
import OrderStatus from "./Components/Dashboard/OrderStatus";
import Profile from "./Components/Dashboard/Profile";
import OrderHistory from "./Components/Dashboard/OrderHistory";


 import NewMenu from "./Components/Dashboard/NewMenu";
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
            <Route path="/menu" element={<ProtectedComponent><NewMenu /></ProtectedComponent>} />
            <Route path="/checkout" element={<ProtectedComponent><Checkout /></ProtectedComponent>} />
            <Route path="/status" element={<ProtectedComponent><Status /></ProtectedComponent>} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirmEmail" element={<ConfirmEmail />} />
            <Route path="/orderStatus" element={<OrderStatus />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orderHistory" element={<OrderHistory/>} />
           

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
