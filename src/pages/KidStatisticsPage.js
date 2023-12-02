import './styleSheet.css';
import Chart from 'chart.js';
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

const kidGraph = document.getElementById("kidGraph");
const bookList = document.getElementById("bookTitles");

// Initialize the graph with weekly data
updateGraph('week');

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

// Initialize/update the graph using provided data
function updateChart(data) {
    // Get the context of the canvas element
    const ctx = kidGraph.getContext("2d");

    // Define the chart data and options
    const chartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Hours completed',
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color with opacity
                borderColor: 'rgba(54, 162, 235, 1)', // Solid blue color
                borderWidth: 1,
                data: data, // Use the provided data
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 10, // Customize the step size on the Y-axis
            },
        },
    };

    // Create or update the bar chart
    if (window.kidChart) {
        // If the chart already exists, destroy it before creating a new one
        window.kidChart.destroy();
    }

    window.kidChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
    });
}

function updateBookList(titles) {
    bookList.innerHTML = '';
    titles.forEach(title => {
        const li = document.createElement("li");
        li.textContent = title;
        bookList.appendChild(li);
    });
}