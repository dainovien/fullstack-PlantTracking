import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import PlantList from "./components/PlantList";
import AddPlant from "./components/AddPlant";
import EditPlant from "./components/EditPlant";
import PlantDetail from "./components/PlantDetail";

import PlantLogList from "./components/PlantLogList";
import AddPlantLog from "./components/AddPlantLog";
import EditPlantLog from "./components/EditPlantLog"; // pastikan file ini ada

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BASE_URL } from "./utils/utils";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-users`, data);
      alert(response.data.msg);
      window.location.href = "/login";
    } catch (error) {
      alert("Gagal Register. Pastikan semua data benar.");
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Email atau password salah.");
    }
  };

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect default ke halaman plant list */}
        <Route path="/" element={<Navigate to="/plants" />} />

        {/* Plant Routes */}
        <Route
          path="/plants"
          element={
            <ProtectedRoute>
              <PlantList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants/add"
          element={
            <ProtectedRoute>
              <AddPlant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants/edit/:id"
          element={
            <ProtectedRoute>
              <EditPlant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants/:id"
          element={
            <ProtectedRoute>
              <PlantDetail />
            </ProtectedRoute>
          }
        />

        {/* Plant Log Routes */}
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <PlantLogList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs/add"
          element={
            <ProtectedRoute>
              <AddPlantLog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs/edit/:id"
          element={
            <ProtectedRoute>
              <EditPlantLog />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<RegisterForm handleRegister={handleRegister} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
