import React, { useReducer, createContext } from "react"
import contextReducer from "./contextReducer";

//Fetch transactions from the localStorage OR initally set the initial transactions to empty if localStorage has no transactions (empty array)
const initialState = JSON.parse(localStorage.getItem('transactions')) || [];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    //Action Creators
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
    }

    // console.log(transactions);
    //Total balance
    let balance = 0
    transactions.forEach((t) => {
        if (t.type === 'Expense') {
            balance -= t.amount
        }
        else {
            balance += t.amount
        }
    })

    return (
        <ExpenseTrackerContext.Provider value={{ deleteTransaction, addTransaction, transactions, balance }}>
            {/* value object above is same as- */}
            {/* {
                deleteTransaction: deleteTransaction,
                addTransaction: addTransaction
            } */}
            {/* (ES6) */}
            {children}
        </ExpenseTrackerContext.Provider>
    )
}