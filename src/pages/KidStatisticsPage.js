import './styleSheet.css';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

// Sample data for kid's progress
const weeklyData = [10, 20, 15, 25, 30];
const monthlyData = [30, 45, 40, 50, 60];
const trimesterData = [80, 100, 90, 120, 130];

const labelsByPeriod = {
    "week": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    "month": ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"],
    "trimester": ["Trimester 1", "Trimester 2", "Trimester 3", "Trimester 4", "Trimester 5"]
};

const dataByPeriod = {
    "week": weeklyData,
    "month": monthlyData,
    "trimester": trimesterData
};

const bookTitles = [
    "Book 1",
    "Book 2",
    "Book 3",
    "Book 4",
    "Book 5"
];

const periodStrings = { "week": "Week", "month": "Month", "trimester": "Trimester" };

const studentID = 1;
const firstName = "First";
const lastName = "Last";

export const KidStatisticsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // Update the graph using Chart.js
    const updateChart = (labels, data) => {
        const ctx = document.getElementById("kidGraph").getContext("2d");
        const chartData = {
            labels: labels,
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
            maintainAspectRatio: true,
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
        let labels = labelsByPeriod[period];
        let data = dataByPeriod[period];

        // pull data from DB (uncomment this part to see sample data instead)
        axios.get(`http://localhost:8081/statistics/${period}`)
        .then(res => {
            data = res.data["total"].map(minutes => minutes / 60); // reading + math
            labels = Array.from(Array(data.length).keys())
                .map(number => periodStrings[period] + " " + (number + 1));

            updateChart(labels, data);
        }).catch(err => console.log(err));

        // Update the graph using Chart.js
        updateChart(labels, data);
    }

    // update graph on initial render and then when the selected period changes
    useEffect(() => {
        updateGraph(selectedPeriod);
    }, [selectedPeriod]);

    useEffect(() => {
        // This effect runs after the initial render and when bookTitles changes
        updateBookList(bookTitles);
    }, [bookTitles]);

    return (
        <div className="KidStatisticsPage">
            <h1>{firstName} {lastName}'s Progess</h1>
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