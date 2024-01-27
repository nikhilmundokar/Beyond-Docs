import React from "react";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome";
import UploadDocument from "./components/upload-document";
import Dashboard from "./components/dashboard";
import Navbar from "./components/Navbar";
import ContactUs from "./components/contactus";
import Footer from "./components/footer";
import { AuthProvider } from "./components/utils/context";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome/" element={<Welcome user="Omkar" />} />
            <Route path="/upload/" element={<UploadDocument />} />
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/contact/" element={<ContactUs />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
