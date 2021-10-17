import { useContext } from "react";
import { ExpenseTrackerContext } from './context/context';

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {
    resetCategories();

    const { transactions } = useContext(ExpenseTrackerContext);

    const transactionsPerType = transactions.filter((t) => t.type === title) //Filter out all transactions of one type (Income or Expense)

    //reduce() will sum up all the values of an array. Like [2, 3] would give 5
    // const total = transactionsPerType.reduce((acc, currVal) => acc += currVal.amount, 0);

    //Calculating total using a map
    let total = 0;
    transactionsPerType.map((t) => total += t.amount);

    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    console.log({ transactionsPerType, total, categories });

    transactionsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)

        //If category exists, then add the transaction's amount to the category's amount
        if (category) {
            category.amount += t.amount;
        }
    })

    //Filter out those categories that have amount equal to 0
    const filteredCategories = categories.filter((c) => c.amount > 0)

    //Syntax acoording to chart.js 
    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color)
        }],
        labels: filteredCategories.map((c) => c.type)
    }

    return { filteredCategories, total, chartData }
}

export default useTransactions