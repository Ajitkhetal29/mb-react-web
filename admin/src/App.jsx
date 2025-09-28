import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./App.css";
import AddProject from "./pages/addProject";
import Navbar from "./components/Navbar";
import AllProjects from "./pages/AllProjects";
import UpdateProject from "./pages/UpdateProject";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addProject" element={<AddProject />} />
            <Route path="/allProjects" element={<AllProjects />} />
            <Route path="/updateProject/:id" element={<UpdateProject />} />
          </Routes>
      </div>
    </>
  );
};

export default App;
