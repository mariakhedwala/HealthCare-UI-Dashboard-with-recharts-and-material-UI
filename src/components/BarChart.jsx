// src/components/BarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
    if (!data.length) {
        return <p>No data available for the selected filters.</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age_range" />
                <YAxis />
                <Tooltip />
                <Legend />
                {data[0].Male !== undefined && <Bar dataKey="Male" fill="#8884d8" />}
                {data[0].Female !== undefined && <Bar dataKey="Female" fill="#82ca9d" />}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
