import axios from 'axios';
import NavbarComponent from "../components/NavbarComponent/NavbarComponent.js";
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';


// Sample data for overall progress
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

const periodStrings = { "week": "Week", "month": "Month", "trimester": "Trimester" };

export const DragonStatisticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Update the graph using Chart.js
  const updateChart = (labels, data) => {
      const ctx = document.getElementById("StatsGraph").getContext("2d");
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

      if (window.StatsChart) {
        window.StatsChart.destroy();
    }

    window.StatsChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
    });
  }

  function updateGraph(period) {
    let labels = labelsByPeriod[period];
    let data = dataByPeriod[period];

    // pull data from DB (uncomment this part to see sample data instead)
    axios.get(`http://localhost:8081/statistics/${period}`)
    .then(res => {
        data = res.data["total"].map(minutes => minutes / 60); // reading + math
        labels = Array.from(Array(data.length).keys())
            .map(number => periodStrings[period] + " " + (number + 1));

        // Update the graph using Chart.js
        updateChart(labels, data);
    }).catch(err => console.log(err));

    
  }

  // update graph on initial render and then when the selected period changes
  useEffect(() => {
    updateGraph(selectedPeriod);
  }, [selectedPeriod]);

	var mathMin = 0;
	var readingMin = 0;

function getData(period) {

    axios.post('/dragonstatistics/mathmin/' + period)
    .then(res => {
        mathMin = res.data;
    }).catch(err => console.log(err));

    axios.post('/dragonstatistics/readingmin/' + period)
    .then(res => {
        readingMin = res.data;
    }).catch(err => console.log(err));
}

  return (
    <form>
      <NavbarComponent />
      <h1>Dragon Statistics</h1>
      <div className="header">
        <button onClick={() => setSelectedPeriod('week')}>Week</button>
        <button onClick={() => setSelectedPeriod('month')}>Month</button>
        <button onClick={() => setSelectedPeriod('trimester')}>Trimester</button>
      </div>
      <div className="graph">
        <canvas id="StatsGraph"></canvas>
      </div>
    </form>
  );
}
