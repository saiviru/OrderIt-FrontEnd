import Register from "./Components/Auth/Register";
// import Register from "./Components/Auth/NewRegister";
import Login from "./Components/Auth/Login";
import ConfirmEmail from "./Components/Auth/ConfirmEmail";
import Status from "./Components/Auth/Status";
import MediaControlCard from "./Components/Dashboard/index";
import MenuList from "./Components/Dashboard/MenuList";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Account } from "./Components/Auth/Account";
import { Checkout } from "./Components/Dashboard/Checkout";
import ViewQR from "./Components/Dashboard/ViewQR";
import ListQR from "./Components/Dashboard/ListQR";
// import ProtectedComponent from './Components/Auth/ProtectedComponent';
import ProtectedRoutes from "./ProtectedRoutes";

import NewMenu from "./Components/Dashboard/NewMenu";
function App() {
  return (
    <main className="App">
      {/* <AuthContext> */}
      <Router>
        <Account>
          <Routes>
            <Route element={<ProtectedRoutes redirectPath="/login" />}>
              {/* <Route index path="/menu" element={<NewMenu />} /> */}
              <Route path="/" element={<Login />} />
              <Route path="/status" element={<Status />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/menu" element={<NewMenu />} />
              <Route path="/orderit/:id" element={<NewMenu />} />
              <Route path="/viewQR/:id" element ={<ViewQR />} />
              <Route path="/listQR/:id" element ={<ListQR />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirmEmail" element={<ConfirmEmail />} />
          </Routes>
        </Account>
      </Router>

      {/* </AuthContext> */}
      <ToastContainer style={{ fontSize: "1rem" }} />
    </main>
  );
}

export default App;
