import React, { useState } from "react"
import { FormCard, FormContext } from "../context.jsx/context"
import { NavLink } from "react-router-dom";

import '../Styles/login.css'

function searchInMongo(name, password) {
    // Define the user data
    const userData = { 
        name: name,
        password: password
    };

    // Define the API endpoint
    const apiEndpoint = "http://localhost:3010/api/users/login";

    // Send a POST request to create the user
    fetch(apiEndpoint, {
      method: "POST", // HTTP  GET, DELETE, PUT, POST;
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(userData), // Convert the user data to a JSON string
    })
      .then((response) => { return response.json();})
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error); // Handle errors
      });
  }

const Login = ({usuarios}) => {

    const [show,setShow] = React.useState(true)
    const [status, setStatus] = React.useState('')

    const [name,setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorNameStatus,setErrorNameStatus] = useState('')

    const [password,setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorPasswordStatus,setErrorPasswordStatus] = useState('')

    function validate (field, label) {
        if (!field) {
            setStatus('Enter correctly your '+ label)
            setTimeout(() => setStatus(''),3000)
            return false
        }
        return true
    }

    function handleLogin () {
        

        if(!validate(name,'name')) return
        if(!validate(password,'password')) return


        const usuarioExistente = usuarios.find(usuario => usuario.name === name);
        const passwordExistente = usuarios.find(usuario => usuario.password === password)

        searchInMongo(name,password);
        console.log(name);

        if (!usuarioExistente) {
            setErrorName('Username does not exist');
            setTimeout(() => setErrorName(''),3000)
        } else if(!passwordExistente) {
            setErrorName('User name or password invalid, try again');
            setTimeout(() => setErrorName(''),3000)
        }else{

            setErrorName(''); // Resetear el mensaje de error si el usuario es válido
            setShow(false);
        }
        console.log(usuarios)
    }

    function handleNameChange(e){
        const inputValue = e.currentTarget.value;
        setName(inputValue); // Primero actualizamos el estado
        if (inputValue.includes("@")) {
            setErrorName('Name can not contain @ ');
            setErrorNameStatus(true)
        }else if (inputValue.match(/[0-9]/)){
            setErrorName('Name can not contain numbers')
            setErrorNameStatus(true)
        }else{
            setErrorName('')
            setErrorNameStatus(false)
        }

    }

    function handlePasswordChange(e){
        const inputValue = e.currentTarget.value;
        setPassword(inputValue)
        let arreglo = [...inputValue]
        if(arreglo.length >= 8){
            setErrorPassword('')
            setErrorPasswordStatus(false)
        }else{
            setErrorPassword('Password can not contain less than 8 characters')
            setTimeout(() => setErrorPassword(''),2000)
            setErrorPasswordStatus(true)
        }
    }

    return (
        <div className="contenedor-login">
            <div className="mitad formulario-login">
                <FormCard
                    bgcolor = 'primary'
                    header = 'Login'
                    status = {status}
                    body = {show ? (
                        <>
                            User Name <br/>
                            <input type="text" className = 'form-control' id = 'name' placeholder = 'Enter User Name' value={name} onChange={handleNameChange}/>
                            {errorName? (
                                    <>
                                        <h6 style={{color:'red'}}>{errorName}</h6>
                                    </>
                                ):(
                                    <>
                                    </>
                                )}

                            Password <br/>
                            <input type="text" className = 'form-control' id = 'password' placeholder = '********' onChange={handlePasswordChange}/>
                            {errorPassword && (
                                    <>
                                        <h6 style={{color:'red'}}>{errorPassword}</h6>
                                    </>
                                )}  
                            <button type = 'submit' className = 'btn btn-light' onClick={handleLogin} disabled = {!name || !password || errorName || errorPasswordStatus} style={{backgroundColor: '#dd3f51 ', color: 'white', marginTop: '20px'}}>Login</button>

                            <div className="contenedor-imgagen-login">
                                    <div src="../images/imagen_login.png" alt="" className="imagen-dibujo-login"/>
                            </div>
                        </>
                    ):(
                        <>
                            <h4>Welcome</h4><h4 style={{color:'green'}}>{name}</h4> 
                            <div className="contenedor-success-image-login">
                                        <div src="../images/loginsucces.png" alt="" className="imagen-dibujo-success-login"/>
                            </div>
                            <h3>What do you want to do next?</h3>
                            <div className="contenedor-botones-success-login">
                                <NavLink to={'/deposit'}>
                                    <button type="button" className="btn" style={{backgroundColor: '#dd3f51 ', color: 'white'}}>Deposit</button>
                                </NavLink>
                                <NavLink to={'/withdraw'}>
                                    <button type="button" className="btn" style={{backgroundColor: '#dd3f51 ', color: 'white'}}>Withdraw</button>
                                </NavLink>
                            </div>
                        </>
                    )
                        
                    }
                >
                </FormCard>
            </div>
            <div className="contenedor-imgane-login mitad">
                <div className="imagen-login"></div>
            </div>
        </div>
    )
}

export {Login}