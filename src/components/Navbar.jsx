import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";



import '../Navbar.css'


const Navbar = () => {

    const [showPopUpHome,setShowPopUpHome] = useState(false)
    const [showPopupLogin,setShowPopupLogin] = useState(false)
    const [showPopUpCreateAccount,setShowPopupCreateAccount] = useState(false)
    const [showPopUpDeposit,setShowPopUpDeposit] = useState(false)
    const [showPopUpWithdraw, setShowPopUpWithdraw] = useState(false)
    const [showPopUpAlldata, setShowPopUpAlldata] = useState(false)
    const [timer,setTimer] = useState(null)


    
    function mostrarPopup(setShowPopUp) {
        setShowPopUp(true);
    }

    function ocultarPopup(setShowPopUp) {
        clearTimeout(timer);
        setShowPopUp(false);
    }
    
    function mouseEnElemento(setShowPopUp) {
        const nuevoTimer = setTimeout(() => mostrarPopup(setShowPopUp), 3000);
        setTimer(nuevoTimer);
    }
    
    function mouseFueraElemento(setShowPopUp) {
        ocultarPopup(setShowPopUp);
    }

    return (
        <>
            <nav className = "navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div> 
                        <NavLink to={'/'} className="BadBank-title">
                            <div className="navbar-brand">Diego Garcia BadBank</div>
                        </NavLink>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            
                            <NavLink to={'/home'} className="NavLink-navbar">
                                <div className="nav-NavLink" aria-current="page" onMouseOver={() => mouseEnElemento(setShowPopUpHome)} onMouseOut={() => mouseFueraElemento(setShowPopUpHome)}>Home</div>
                                {showPopUpHome && (
                                    <div className="contenedor-hermano">Bad Bank's Home Page</div> 
                                )}
                            </NavLink>

                            <NavLink to={'/login'} className="NavLink-navbar">
                                <div className="nav-NavLink" aria-current="page" onMouseOver={()=> mouseEnElemento(setShowPopupLogin)} onMouseOut={()=> mouseFueraElemento(setShowPopupLogin)}>Login</div>
                                {showPopupLogin && (
                                    <div className="contenedor-hermano">Login into your account</div> 
                                )}
                            </NavLink>
                                
                            <NavLink to={'/createaccount'} className="NavLink-navbar">
                                <div className="nav-NavLink" onMouseOver={() => mouseEnElemento(setShowPopupCreateAccount)} onMouseOut={() => mouseFueraElemento(setShowPopupCreateAccount)}>Create Account</div> 
                                {showPopUpCreateAccount && (
                                    <div className="contenedor-hermano">Create a new checking account</div> 
                                )}       
                            </NavLink>
                            
                            <NavLink to={'/deposit'} className="NavLink-navbar">
                                <div className="nav-NavLink" onMouseOver={() => mouseEnElemento(setShowPopUpDeposit)} onMouseOut={() => mouseFueraElemento(setShowPopUpDeposit)}>Deposit</div>
                                {showPopUpDeposit && (
                                    <div className="contenedor-hermano">Deposit into your checking account</div> 
                                )}   
                            </NavLink>
                            
                            
                            <NavLink to={'/withdraw'} className="NavLink-navbar">
                                <div className="nav-NavLink" onMouseOver={() => mouseEnElemento(setShowPopUpWithdraw)} onMouseOut={() => mouseFueraElemento(setShowPopUpWithdraw)}>Withdraw</div>
                                {showPopUpWithdraw && (
                                    <div className="contenedor-hermano">Withdraw from you checking account</div> 
                                )}  
                            </NavLink>
                            
                            
                            <NavLink to={'/alldata'} className="NavLink-navbar">
                                <div className="nav-NavLink" onMouseOver={() => mouseEnElemento(setShowPopUpAlldata)} onMouseOut={() => mouseFueraElemento(setShowPopUpAlldata)}>All Data</div>
                                {showPopUpAlldata && (
                                    <div className="contenedor-hermano">Track all you transactions</div> 
                                )} 
                            </NavLink>
                            

                        </div>
                    </div>
                
                    <div className="navbar-brand">Usuario</div>

                    
                </div>
                
            </nav>

            
        </>
      
    )
}

export {Navbar}