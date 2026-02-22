import React from "react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div
      style={{
        background: "#F2EDE4",
        minHeight: "100vh",
        color: "#1A1A1A",
      }}
    >
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>FocusLens</h1>
        <p>AI-powered study focus coach</p>
      </div>
    </div>
  );
};

export default LandingPage;