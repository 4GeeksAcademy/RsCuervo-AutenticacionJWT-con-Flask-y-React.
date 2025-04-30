import React, { useState } from 'react';

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleSignup = async (e) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        e.preventDefault();
        try {
            const response = await fetch(backendUrl + "signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || "Registro exitoso");
                window.location.href = "/login"; 
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error en la solicitud. Por favor, inténtelo de nuevo más tarde.");
            console.error("Error en la solicitud:", error);  
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5">Registro</h2>
            <form onSubmit={handleSignup}>
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
                <button type="submit" className="btn btn-primary btn-block">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

