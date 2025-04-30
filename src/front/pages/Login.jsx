import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // URL del backend
    try {
      const response = await fetch(backendUrl + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user)); 
        alert(data.msg || "Inicio de sesión exitoso");
        window.location.href = "/private"; 
      } else {
        alert(data.msg || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <h2 className="text-center mt-5">Inicio de Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

