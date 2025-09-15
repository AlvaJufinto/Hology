/** @format */

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Assets from "./pages/Dashboard/Assets";
import AssetsEdit from "./pages/Dashboard/AssetsEdit";
import AssetsView from "./pages/Dashboard/AssetsView";
import Help from "./pages/Dashboard/Help";
import NotaryFinder from "./pages/Dashboard/NotaryFinder";
import Reports from "./pages/Dashboard/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <PrivateRoute>
              <Assets></Assets>
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute>
              <Help></Help>
            </PrivateRoute>
          }
        />
        <Route
          path="/notary-finder"
          element={
            <PrivateRoute>
              <NotaryFinder></NotaryFinder>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports></Reports>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
