// src/components/ChartControls.js
import React from 'react';
import { Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';

const ChartControls = ({
    ageFilters,
    setAgeFilters,
    genderFilters,
    setGenderFilters,
    applyFilters,
    resetFilters,
    refreshData,
}) => {
    const ageGroups = ["0-18", "19-35", "36-60", "60+"];
    const genders = ["male", "female"];

    const handleAgeFilterChange = (age_range) => {
        setAgeFilters(prev =>
            prev.includes(age_range) ? prev.filter(a => a !== age_range) : [...prev, age_range]
        );
    };

    const handleGenderFilterChange = (gender) => {
        setGenderFilters(prev =>
            prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
        );
    };

    return (
        <Box p={2} sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>

            {/* Age Group Filters */}
            <Typography variant="subtitle1">Age Groups</Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                {ageGroups.map(age_range => (
                    <FormControlLabel
                        key={age_range}
                        control={
                            <Checkbox
                                checked={ageFilters.includes(age_range)}
                                onChange={() => handleAgeFilterChange(age_range)}
                            />
                        }
                        label={age_range}
                        sx={{ flex: '1 1 45%', minWidth: '120px' }} // Responsive width
                    />
                ))}
            </Box>

            {/* Gender Filters */}
            <Typography variant="subtitle1">Gender</Typography>
            <Box display="flex" gap={1} mb={2}>
                {genders.map(gender => (
                    <FormControlLabel
                        key={gender}
                        control={
                            <Checkbox
                                checked={genderFilters.includes(gender)}
                                onChange={() => handleGenderFilterChange(gender)}
                            />
                        }
                        label={gender.charAt(0).toUpperCase() + gender.slice(1)}
                        sx={{ flex: '1 1 45%', minWidth: '120px' }}
                    />
                ))}
            </Box>

            {/* Buttons for actions */}
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                <Button fullWidth variant="contained" color="primary" onClick={applyFilters}>
                    Apply Filters
                </Button>
                <Button fullWidth variant="outlined" onClick={resetFilters}>
                    Reset Filters
                </Button>
                <Button fullWidth variant="outlined" onClick={refreshData}>
                    Refresh Data
                </Button>
            </Box>
        </Box>
    );
};

export default ChartControls;
