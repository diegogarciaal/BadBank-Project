import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavLink } from "react-router-dom";


import '../Styles/home.css'


const Home = () => {
    return (
        <div className="contanedor-externo">
            <div className="video-background">
                <video autoPlay loop muted>
                    <source src='./images/home_video.mp4' type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>
            <div className="contendor-interno">
                <h3 className="Mensaje-bienvenida">Bienvenido a Bad Bank</h3>
                <div className="imagen-banco-home"></div>
                <div className="contenedor-botones-home">
                    <NavLink to={'/login'}>
                        <button type="button" className="btn">Login</button>
                    </NavLink>
                    <NavLink to={'/createaccount'}>
                        <button type="button" className="btn">Create Account</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export {Home}