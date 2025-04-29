import React from "react";
import '../Styles/alldata.css'

const Alldata = ({transactions}) => {
    return (
        <div className="contenedor-tabla-externo">
            <div className="contenedor-tabla-interno">
                <h2>Transactions Tracking</h2>
                <table className="table tabla">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Transaction</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={transaction.No}>
                        <th scope="row">{transaction.No}</th>
                        <td>{transaction.transaction}</td>
                        <td>{transaction.Amount}</td>
                        <td>{transaction.Balance}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export {Alldata}