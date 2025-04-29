import React, { useState } from "react";

//Estilos
import "../Styles/Deposit.css";
import "../Styles/withdraw.css";
import { FormCard } from "../context.jsx/context";

//Contextos

const Withdraw = ({ balance, setBalance, addTrasaction }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [Status, setStatus] = useState(false);
  const [mensaje, setMensaje] = useState("");

  function handleDeposit(e) {
    const valor = e.currentTarget.value;
    setWithdrawAmount(valor);
  }

  function withdrawalInMongo(valor) {
    // Define the user data
    const userData = {
      amount: valor,
    };

    // Define the API endpoint
    const userID = "66899326e4fd5f7a95678eea";
    const apiEndpoint =
      "http://localhost:3010/api/users/" + userID + "/withdrawal";

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
        console.log("Withdrawal made successfully:", data); // Handle the response data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error); // Handle errors
      });
  }

  function handleClick() {
    const withdrawValue = parseFloat(withdrawAmount);

    function Mensaje(mensaje) {
      setStatus(true);
      setMensaje(mensaje);
    }

    if (
      !isNaN(withdrawValue) &&
      withdrawValue > 0 &&
      balance - withdrawValue >= 0
    ) {
      setBalance((prevBalance) => prevBalance - withdrawValue);
      Mensaje("¡successful money withdrawal!");
      setTimeout(() => setStatus(false), 2000);
      setTimeout(() => setMensaje(""), 2000);
      addTrasaction({
        tipo: "Withdraw",
        monto: withdrawValue,
        balance: balance - withdrawValue,
      });
      withdrawalInMongo(withdrawValue);
    } else if (withdrawValue.toString().includes("-")) {
      Mensaje("You can not enter negative numbers");
      setStatus(false);
      setTimeout(() => setStatus(false), 2000);
      setTimeout(() => setMensaje(""), 2000);
    } else if (balance - withdrawValue < 0) {
      Mensaje("the amount exceeds the account resources");
      setStatus(false);
      setTimeout(() => setStatus(false), 2000);
      setTimeout(() => setMensaje(""), 2000);
    }
  }

  return (
    <div className="contenedor-deposit">
      <FormCard
        bgcolor="primary"
        header="Withdraw"
        body={
          <>
            <div>
              <h1>Bad Bank</h1> <br />
              <div className="contenedor-balance">
                <h6>Your Balance</h6>
                <h3>US $ {balance}</h3>
              </div>
              <h3>Withdraw</h3>
              <h6>Enter Withdraw Amount</h6>
              <input
                type="number"
                value={withdrawAmount}
                onChange={handleDeposit}
              />
              <button
                className="btn"
                onClick={handleClick}
                disabled={!withdrawAmount}
                style={{
                  backgroundColor: "#dd3f51 ",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                Withdraw
              </button>
            </div>
            {Status ? (
              <h5 className="mensaje-retiro-exitoso">{mensaje}</h5>
            ) : (
              <h5 className="mensaje-de-negacion">{mensaje}</h5>
            )}
          </>
        }
      ></FormCard>
    </div>
  );
};

export { Withdraw };
