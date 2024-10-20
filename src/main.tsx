import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="activate/:activatedToken"/>
      </Route>
    </Routes>
  </Router>

);
