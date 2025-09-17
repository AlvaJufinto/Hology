/** @format */

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import PrivateRoute from "./components/shared/PrivateRoute";
import Assets from "./pages/Dashboard/Assets";
import AssetsCreate from "./pages/Dashboard/AssetsCreate";
import AssetsView from "./pages/Dashboard/AssetsView";
import AssetsEdit from "./pages/Dashboard/AssetsEdit";
import Dashboard from "./pages/Dashboard/Dashboard";
import DevSeed from "./pages/Dashboard/DevSeed";
import Help from "./pages/Dashboard/Help";
import NotaryFinder from "./pages/Dashboard/NotaryFinder";
import Reports from "./pages/Dashboard/Reports";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReportsCreate from "./pages/Dashboard/ReportsCreate";

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
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <PrivateRoute>
              <Assets />
            </PrivateRoute>
          }
        />
        <Route
          path="/assets/create"
          element={
            <PrivateRoute>
              <AssetsCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/assets/view/:id"
          element={
            <PrivateRoute>
              <AssetsView />
            </PrivateRoute>
          }
        />
        <Route
          path="/assets/edit/:id"
          element={
            <PrivateRoute>
              <AssetsEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          }
        />
        <Route
          path="/notary-finder"
          element={
            <PrivateRoute>
              <NotaryFinder />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/create"
          element={
            <PrivateRoute>
              <ReportsCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/seeds"
          element={
            <PrivateRoute>
              <DevSeed />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
