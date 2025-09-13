/** @format */

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div>Dashbaord</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
