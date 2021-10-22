import React, { useState, useContext, useEffect } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ExpenseTrackerContext } from "../../../context/context"
import { incomeCategories, expenseCategories } from "../../../constants/categories"
import formatDate from '../../../utils/formatDate'
import { v4 as uuidv4 } from "uuid"
import { useSpeechContext } from '@speechly/react-client'

import useStyles from "./styles"

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date())
}

const Form = () => {
    //For styling
    const classes = useStyles()

    //Store data in a state
    const [formData, setFormData] = useState(initialState)

    //Use context to store data in the GLOBAL state (add functionality)
    const { addTransaction } = useContext(ExpenseTrackerContext)

    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }

        //Call the addTransaction method of the context
        addTransaction(transaction)

        //Reset the form data to INITIALSTATE after clicking CREATE
        setFormData(initialState);
    }

    //Change category for different type (whether Income or Expense)
    const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories;

    //See what we are speaking
    const { segment } = useSpeechContext();

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' })
            }
            else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: "Income" })
            }
            else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                createTransaction();
            }
            else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                setFormData(initialState);
            }

            //Set values to different form inputs
            segment.entities.forEach((e) => {

                switch (e.type) {
                    case 'amount': setFormData({ ...formData, amount: e.value })
                        break;
                    case 'category': {
                        //Set the category name to lower case
                        const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`

                        //if category and type input by the user does not match, then set type acc to the category
                        if ((incomeCategories.map((ic) => ic.type).includes(category))) {
                            setFormData({ ...formData, type: 'Income', category })
                        }
                        else if ((expenseCategories.map((ic) => ic.type).includes(category))) {
                            setFormData({ ...formData, type: 'Expense', category })
                        }
                    }
                        break;
                    case 'date': setFormData({ ...formData, date: e.value })
                        break;
                    default:
                        break;
                }
            })
        }
    }, [segment])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment ? <div>{segment.words.map(w => w.value).join(' ')}</div> : null}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategory.map((category) => (
                            <MenuItem key={category.type} value={category.type}> {category.type} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
