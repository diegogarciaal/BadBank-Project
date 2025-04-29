import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components 
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Createaccount } from './components/Createaccount';
import { Balance } from './components/Balance';
import { Deposit } from './components/Deposit';
import { Withdraw } from './components/withdraw';
import { Alldata } from './components/Alldata';
import { Home } from './components/home';

// Contexts
import { FormContext, FormCard } from './context.jsx/context';

// Function to fetch transactions
async function getTransactions() {
  const userID = "66899326e4fd5f7a95678eea";
  const apiEndpoint = `http://localhost:3010/api/users/${userID}/history`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}

function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState('');

  useEffect(() => {
    async function fetchTransactions() {
      const fetchedTransactions = await getTransactions();
      setTransactions(fetchedTransactions);
    }
    fetchTransactions();
  }, []);

  const handleTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <FormContext.Provider value={''}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={
            <Login
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              usuarioActivo={usuarioActivo}
              setUsuarioActivo={setUsuarioActivo}
            />
          } />
          <Route path='/createaccount' element={
            <Createaccount
              usuarios={usuarios}
              setUsuarios={setUsuarios}
            />
          } />
          <Route path='/deposit' element={
            <Deposit
              balance={balance}
              setBalance={setBalance}
              transactions={transactions}
              setTransactions={setTransactions}
              addTransaction={handleTransaction}
              usuarios={usuarios}
              setUsuarios={setUsuarios}
            />
          } />
          <Route path='/withdraw' element={
            <Withdraw
              balance={balance}
              setBalance={setBalance}
              addTransaction={handleTransaction}
            />
          } />
          <Route path='/alldata' element={
            <Alldata
              balance={balance}
              setBalance={setBalance}
              transactions={transactions}
              setTransactions={setTransactions}
              addTransaction={handleTransaction}
            />
          } />
        </Routes>
      </Router>
    </FormContext.Provider>
  );
}

export default App;
