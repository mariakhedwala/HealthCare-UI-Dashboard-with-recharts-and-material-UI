// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
// import { fetchPatientDistribution } from './services/api';
import BarChart from './components/BarChart';
import ChartControls from './components/ChartControls';
import { CircularProgress, Alert, Button } from '@mui/material';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [ageFilters, setAgeFilters] = useState([]); // e.g., ["0-18", "19-35"]
    const [genderFilters, setGenderFilters] = useState([]); // e.g., ["male", "female"]
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showFilters, setShowFilters] = useState(false); // New state for toggling filters


    const dummyData = [
        { age_range: '0-18', Male: 1, Female: 1 },
        { age_range: '19-35', Male: 1, Female: 0 },
        { age_range: '36-60', Male: 1, Female: 0 },
        { age_range: '60+', Male: 1, Female: 0 }
    ];

    const loadData = async () => {
        setLoading(true);
        setError('');
        try {
            // const responseData = await fetchPatientDistribution();

            // // Map the data structure to a simpler format
            // const parsedData = responseData["ageGroup"].map(item => ({
            //     age_range: item.age_range,
            //     Male: item.male,
            //     Female: item.female
            // }));

            const parsedData = dummyData;

            setData(parsedData);
            setFilteredData(parsedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line 
    }, []);

    const applyFilters = () => {
        let filtered = data;
        // Filter by age groups
        if (ageFilters.length) {
            filtered = filtered.filter(item => ageFilters.some(a => a === item.age_range));
        }

        // Filter by gender
        if (genderFilters.length) {
            filtered = filtered.map(item => {
                const newItem = { age_range: item.age_range };
                if (genderFilters.includes('male')) newItem.Male = item.Male;
                if (genderFilters.includes('female')) newItem.Female = item.Female;
                return newItem;
            }).filter(item => Object.keys(item).length > 1); // Remove age groups with no selected gender

        }
        setFilteredData(filtered);
    };

    const resetFilters = () => {
        setAgeFilters([]);
        setGenderFilters([]);
        setFilteredData(data);
    };

    const refreshData = async () => {
        await loadData(); // Re-fetch data
        applyFilters(); // Re-apply the current filters on the new data set
    };

    return (
        <div>
            <h2>Healthcare Dashboard</h2>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowFilters(!showFilters)}
                style={{ marginBottom: '1rem' }}
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>

            <div className={`filter-section ${showFilters ? 'open' : 'closed'}`}>
                <ChartControls
                    ageFilters={ageFilters}
                    setAgeFilters={setAgeFilters}
                    genderFilters={genderFilters}
                    setGenderFilters={setGenderFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    refreshData={refreshData}
                />
            </div>

            <BarChart data={filteredData} />
        </div>
    );
};

export default Dashboard;
