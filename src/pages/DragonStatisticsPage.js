import Navbar from "../components/Navbar/Navbar";
mport './styleSheet.css';
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

export const DragonStatisticsPage = () => {
  return (
    <form>
      <Navbar />
      <h1>Dragon Statistics</h1>
    </form>
  );
};
