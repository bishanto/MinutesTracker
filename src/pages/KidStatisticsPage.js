import './styleSheet.css';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

// Sample data for kid's progress
const weeklyData = [10, 20, 15, 25, 30];
const monthlyData = [30, 45, 40, 50, 60];
const trimesterData = [80, 100, 90, 120, 130];

const bookTitles = [
    "Book 1",
    "Book 2",
    "Book 3",
    "Book 4",
    "Book 5"
];

export const KidStatisticsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // Update the graph using Chart.js
    const updateChart = (data) => {
        const ctx = document.getElementById("kidGraph").getContext("2d");
        const chartData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [
                {
                    label: 'Hours completed',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data: data,
                },
            ],
        };
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 10,
                },
            },
        };

        if (window.kidChart) {
            window.kidChart.destroy();
        }

        window.kidChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });
    }

    // Define the updateBookList function
    const updateBookList = (titles) => {
        const bookList = document.getElementById("bookTitles");
        if (bookList) {
            bookList.innerHTML = '';
            titles.forEach(title => {
                const li = document.createElement("li");
                li.textContent = title;
                bookList.appendChild(li);
            });
        }
    };

    function updateGraph(period) {
        let data = [];
    
        // pull data from DB
        axios.get('http://localhost/statistics/' + period)
        .then(res => {
            data = res.data["total"];
        }).catch(err => console.log(err));
    
        // Update the graph using Chart.js
        updateChart(data);
    
        // Update the book titles
        updateBookList(bookTitles);
    }

    // Initialize the graph with weekly data
    //useEffect(() => {
    //  const updateGraph = (period) => {
    //      let data;
    //      switch (period) {
    //          case 'week':
    //              data = weeklyData;
    //              break;
    //          case 'month':
    //              data = monthlyData;
    //              break;
    //          case 'trimester':
    //              data = trimesterData;
    //              break;
    //          default:
    //              data = [];
    //      }

    //      updateChart(data);
    //  };

    //  updateGraph(selectedPeriod);
    //}, [selectedPeriod]);

    useEffect(() => {
        // This effect runs after the initial render and when bookTitles changes
        updateBookList(bookTitles);
    }, []);

    return (
        <div className="KidStatisticsPage">
            <div className="header">
                <button onClick={() => setSelectedPeriod('week')}>Week</button>
                <button onClick={() => setSelectedPeriod('month')}>Month</button>
                <button onClick={() => setSelectedPeriod('trimester')}>Trimester</button>
            </div>
            <div className="graph">
                <canvas id="kidGraph"></canvas>
            </div>
            <div className="bookList">
                <ul id="bookTitles">
                    {/* Books displayed here */}
                </ul>
            </div>
        </div>
    );
}