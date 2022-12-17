import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserList from "./pages/userList/UserList";
import BaoCaoChamCong from "./pages/baocao/BaoCaoChamCong";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />

        <Routes>
          <Route exac path="/" element={<Home />}></Route>
          <Route path="/users" element={<UserList />}></Route>
          <Route path="/bao-cao-chi-tiet-in-out" element={<BaoCaoChamCong />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
