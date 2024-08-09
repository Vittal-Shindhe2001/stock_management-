import React, { useState, useEffect } from 'react'
import StockChart from './StockChart' // Ensure this path is correct
import { useDispatch, useSelector } from 'react-redux'
import { startListProducts } from '../actions/products_action'
import { format,parseISO } from 'date-fns'

const StockPage = () => {
    const [chartData, setChartData] = useState({ labels: [], values: [] })
    console.log(chartData)
    
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(startListProducts())
    }, [])
const data=useSelector(state=>state.products.data)
console.log(data)

useEffect(() => {
    if (Array.isArray(data)) {
        const monthlyData = data.reduce((acc, item) => {
            // Check if item.createdAt exists and is a valid string
            if (item.createdAt && typeof item.createdAt === 'string') {
                const date = parseISO(item.createdAt) // Convert createdAt to Date object
                const monthYear = format(date, 'MMM yyyy') // Format date to 'Month Year'

                if (!acc[monthYear]) {
                    acc[monthYear] = 0
                }
                acc[monthYear] += item.quantity // Accumulate stock levels
            } else {
                console.log("Invalid or missing createdAt:", item.createdAt)
            }
            return acc
        }, {})
        // Prepare data for the chart
        const labels = Object.keys(monthlyData) // Get month names and sort them
        const values = labels.map(month => monthlyData[month]) // Get stock values for each month
        setChartData({
            labels: labels,
            values: values
        })
    } 
}, [data])

    return (
        <div>
            <h1>Stock Chart</h1>
            <StockChart data={chartData} />
        </div>
    )
}

export default StockPage
