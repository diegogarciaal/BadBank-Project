import React, { useContext, useState } from "react";
import { FormCard, FormContext } from "../context.jsx/context";
import "../Styles/createAccount.css";

const Createaccount = ({ usuarios, setUsuarios }) => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //cuadrar los errores que van a aparecer debajo de los input si se viola alguna restricción como no numeros ni @ en el nombre

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [errorNameStatus, setErrorNameStatus] = useState(false);
  const [errorEmailStatus, setErrorEmailStatus] = useState(false);
  const [errorPasswordStatus, setErrorPasswordStatus] = useState(false);

  const ctx = React.useContext(useContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Enter a valid " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    usuarios.push({ name, email, password });
    console.log(usuarios);

    createInMongo();

    setShow(false);
  }

  function createInMongo() {
    // Define the user data
    const userData = {
        name: name,
        email: email,
        password: password,
        account: {
            Balance: 0,
            History: []
        }
    };

    // Define the API endpoint
    const apiEndpoint = "http://localhost:3010/api/users";

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
        console.log("User created successfully:", data); // Handle the response data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error); // Handle errors
      });
  }

  function handleNameChange(e) {
    const inputValue = e.currentTarget.value;
    setName(inputValue); // Primero actualizamos el estado

    if (inputValue.includes("@")) {
      setErrorName("Name can not contain @");
      setErrorNameStatus(true);
    } else if (inputValue.match(/[0-9]/)) {
      setErrorName("Name can not contain numbers");
      setErrorNameStatus(true);
    } else {
      setErrorName("");
      setErrorNameStatus(false);
    }
  }

  function handleEmailChange(e) {
    const inputValue = e.currentTarget.value;
    setEmail(inputValue);

    if (!inputValue.includes("@")) {
      setErrorEmail("Enter a valid email");
      setErrorEmailStatus(true);
      setTimeout(() => setErrorEmail(""), 2000);
    } else {
      setErrorEmail("");
      setErrorEmailStatus(false);
    }
  }

  function handlePasswordChange(e) {
    const inputValue = e.currentTarget.value;
    setPassword(inputValue);
    let arreglo = [...inputValue];
    if (arreglo.length >= 8) {
      setErrorPassword("");
      setErrorPasswordStatus(false);
    } else {
      setErrorPassword("Password can not contain less than 8 characters");
      setTimeout(() => setErrorPassword(""), 2000);
      setErrorPasswordStatus(true);
    }
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <div className="contenedor-create-account">
      <div className="contenedor-imagen-create-account mitad img-fluid img-thumbnail">
        <div className="imagen-create-account"></div>
      </div>
      <div className="mitad formulario-create-account">
        <FormCard
          bgcolor="primary"
          header="Create Account"
          status={status}
          body={
            show ? (
              <>
                Name <br></br>
                <input
                  type="input"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleNameChange}
                ></input>
                <br></br>
                {errorName ? (
                  <>
                    <h6 style={{ color: "red" }}>{errorName}</h6>
                  </>
                ) : (
                  <></>
                )}
                Email <br></br>
                <input
                  type="input"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onBlur={handleEmailChange}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                ></input>
                <br></br>
                {errorEmail ? (
                  <>
                    <h6 style={{ color: "red" }}>{errorEmail}</h6>
                  </>
                ) : (
                  <></>
                )}
                Password <br></br>
                <input
                  type="input"
                  className="form-control"
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
                <br></br>
                {errorPassword && (
                  <>
                    <h6 style={{ color: "red" }}>{errorPassword}</h6>
                  </>
                )}
                <button
                  type="submit"
                  className="btn btn-light"
                  disabled={
                    (!name && !email && !password) ||
                    errorName ||
                    errorPasswordStatus ||
                    errorEmailStatus
                  }
                  onClick={handleCreate}
                  style={{ backgroundColor: "#dd3f51 ", color: "white" }}
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                <h4>¡You have succesfully created an account !</h4>
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={clearForm}
                  style={{ backgroundColor: "#dd3f51", color: "white" }}
                >
                  Add Another Account
                </button>
                <div className="contenedor-image-success">
                  <div
                    src="../images/video.mp4"
                    alt=""
                    className="imagen-success-create-account"
                  />
                </div>
              </>
            )
          }
        ></FormCard>
      </div>
    </div>
  );
};

export { Createaccount };
