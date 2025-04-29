import React, { useState } from "react";

//Estilos
import '../Styles/Deposit.css'
import { FormCard } from "../context.jsx/context";

//Contextos


const Deposit = ({balance,setBalance,addTrasaction,usuarios}) => {

    const [depositAmount, setDepositAmount] = useState(0)
    const [Status, setStatus] = useState(false)  
    const [mensaje, setMensaje] = useState('')                         // estado para mirar si se muestra o no el mensaje de transacción
    
    function handleDeposit(e){
        const valor = e.currentTarget.value
        setDepositAmount(valor)
    }

    function createInMongo(valor) {
        // Define the user data
        const userData = { 
            amount: valor
        };
    
        // Define the API endpoint
        const userID = "66899326e4fd5f7a95678eea"
        const apiEndpoint = "http://localhost:3010/api/users/"+userID+"/deposit";
    
        // Send a POST request to create the user
        fetch(apiEndpoint, {
          method: "POST", // HTTP  GET, DELETE, PUT, POST;
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify(userData), // Convert the user data to a JSON string
        })
          .then((response) => {
            if (response.status != 201) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
          })
          .then((data) => {
            console.log("Deposit made successfully:", data); // Handle the response data
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error); // Handle errors
          });
      }

    function handleClick(){
        const depositValue = parseFloat(depositAmount);
        
        if (!isNaN(depositValue) && depositValue > 0) {
            setBalance(prevBalance => prevBalance + depositValue);
            setStatus(true)
            setMensaje('Approved Transaction')
            setTimeout(() => setStatus(false),2000)
            setTimeout(() => setMensaje(''),2000)
            addTrasaction({tipo: 'Deposit', monto: depositValue, balance: balance + depositValue})
            createInMongo(depositValue);
        }else if(depositValue.toString().includes('-')){
            setStatus(false)
            setMensaje('You can not enter negative numbers')
            setTimeout(() => setStatus(false),2000)
            setTimeout(() => setMensaje(''),2000)
            
        }
    }

    

    return (
        
            <div className="contenedor-deposit">
                <FormCard
                    bgcolor = 'primary'
                    header = 'Deposit'
                    
                    body = {
                        <>
                            <div>
                                <h1>
                                    Bad Bank 
                                </h1> <br />
                                <div className="contenedor-balance">
                                    <h6>Your Balance</h6>
                                    <h3>US $ {balance}</h3>
                                </div>
                                <h3>Deposit</h3>
                                <h6>Enter Deposit Amount</h6>
                                <input type="number" value={depositAmount} onChange={handleDeposit} placeholder="ingrese un valor"/>
                                <button className = 'btn boton-deposit'onClick={handleClick} disabled ={!depositAmount} style={{backgroundColor: '#dd3f51 ', color: 'white', marginTop: '10px', marginBottom: '10px'}}>Deposit</button>
                            </div>
                            {Status ? (
                                <>
                                <h5 className="mensaje-de-aprovado" >{mensaje}</h5>
                                </>  
                            ):(
                                <>
                                <h5 className="mensaje-de-rechazo">{mensaje}</h5>
                                </>  
                            )}
                            
                        </>
                    }
                >

                </FormCard>
            </div>
        
    )
}

export {Deposit}