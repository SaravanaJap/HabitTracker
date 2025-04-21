import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HabitStatsChart = ({ habits }) => {
    console.log('habits brought', habits);
    console.log('comes in');

    const data = {
        labels: habits.map(habit => habit.habit_name ?? "Unnamed Habit"), // Ensures habit names are valid
        datasets: [
            {
                label: 'Completed Days',
                data: habits.map(habit => habit.completed_days ?? 0), // Defaults to 0 if undefined
                backgroundColor: 'green',
            },
            {
                label: 'Skipped Days',
                data: habits.map(habit => habit.skipped_days ?? 0), // Defaults to 0 if undefined
                backgroundColor: 'red',
            },
        ],
    };

    const options = {
        scales: {
            x: { type: 'category', ticks: {
                font: {
                    size: 25, // Adjust this value to make the habit text bigger
                },
            },
 }, // Fix "category" scale error
            y: { beginAtZero: true, ticks: {
                font: {
                    size: 25, // Adjust this value to make the habit text bigger
                },
            },},
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <>
            <h2>📊 Habit Completion Stats</h2>
            {habits.length > 0 ? (
                <Bar data={data} options={options} />
            ) : (
                <p>Loading habit data...</p> // Placeholder if habits array is empty
            )}
        </>
    );
};

export default HabitStatsChart;