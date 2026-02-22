import React from "react";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "#F2EDE4",
        borderBottom: "1px solid #C9BFEA",
        position: "sticky",
        top: 0,
      }}
    >
      <h2 style={{ margin: 0 }}>FocusLens</h2>

      <div style={{ display: "flex", gap: "24px" }}>
        <a href="#" style={{ textDecoration: "none", color: "#1A1A1A" }}>
          Features
        </a>
        <a href="#" style={{ textDecoration: "none", color: "#1A1A1A" }}>
          How it works
        </a>
        <a href="#" style={{ textDecoration: "none", color: "#1A1A1A" }}>
          Dashboard
        </a>
      </div>

      <button
        style={{
          background: "#EDE8F7",
          border: "1px solid #C9BFEA",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;