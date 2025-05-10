import React, { useState } from "react";
import { server } from "../constant";
import { useAdmin } from "../context";

const Home = () => {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [admin,setAdmin]=useAdmin();
    console.log(admin);

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    // Placeholder for authentication logic
    if (!adminId || !adminPassword) {
      setError("Please enter both Admin ID and Password.");
      return;
    }
    try {
      const res = await fetch(`${server}/api/v1/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, adminPass:adminPassword }),
        credentials:"include"
      });
      const result =await res.json();
      if(result.success){
        setAdmin(true)
      }
      console.log(result);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "1rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          display: "flex",
          flexDirection: "column",
          minWidth: "320px",
          maxWidth: "90vw",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#4f3c8d",
            letterSpacing: "1px",
          }}
        >
          Admin Login
        </h2>
        <label
          style={{ marginBottom: "0.5rem", color: "#333", fontWeight: 500 }}
        >
          Admin ID
        </label>
        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          placeholder="Enter Admin ID"
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        />
        <label
          style={{ marginBottom: "0.5rem", color: "#333", fontWeight: 500 }}
        >
          Admin Password
        </label>
        <input
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Enter Password"
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        />
        {error && (
          <div
            style={{
              color: "#e53e3e",
              marginBottom: "1rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
