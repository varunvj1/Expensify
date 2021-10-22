import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Doughnut } from "react-chartjs-2"
import useTransactions from '../../useTransactions'

import useStyles from "./styles"


const Details = ({ title }) => {
    //Styling
    const classes = useStyles();

    //Chart data
    const { total, chartData, } = useTransactions(title);

    return (
        <Card className={title === "Income" ? classes.income : classes.expense}>
            <CardHeader title={title} />
            <Typography variant="h5" style={{ textAlign: 'center' }} >₹{total}</Typography>
            <CardContent>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    )
}

export default Details
