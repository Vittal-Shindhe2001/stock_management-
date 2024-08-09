import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement,PointElement, CategoryScale, LinearScale } from 'chart.js';
import './css/stockChart.css'
// Register the necessary components for Chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
);

const StockChart = ({ data }) => {
    console.log(data);
    
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Stock Levels',
                data: data.values   ,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Stock Level',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='chart-container'>
            <h2 className='h2'>Stock Levels Over Time</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default StockChart;
