import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirige al inicio de sesión si no hay token
    } else {
      const storedUser = JSON.parse(sessionStorage.getItem("user")); 
      setUser(storedUser); 
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Bienvenido a tu menú privado</h2>
      {user ? (
        <p>
          Usuario con id: {user.id} y email: {user.email}, puede disfrutar del contenido exclusivo para usuarios registrados.
        </p>
      ) : (
        <p>Cargando datos...</p>
      )}
      <button
        className="btn btn-danger"
        onClick={() => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          navigate("/login"); 
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
