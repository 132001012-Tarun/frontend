import React, { useState, useContext, useEffect } from 'react';
import { multiStepContext } from '../context/stepContext';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Select, Typography } from '@mui/material';

const TechnicalSkills = () => {
    const { setStep, userData ,setUserData } = useContext(multiStepContext);
    const [programmingLanguage, setProgrammingLanguage] = useState(userData.programmingLanguage || '');
    const [experienceLevel, setExperienceLevel] = useState(userData.experienceLevel || '');
    const [developmentStack, setDevelopmentStack] = useState(userData.developmentStack || []);
    const [interestedAreas, setInterestedAreas] = useState(userData.interestedAreas || []);

    useEffect(() => {
        // Update state with userData values when component mounts
        setProgrammingLanguage(userData.programmingLanguage || '');
        setExperienceLevel(userData.experienceLevel || '');
        setDevelopmentStack(userData.developmentStack || []);
        setInterestedAreas(userData.interestedAreas || []);
    }, [userData]);

    const handleProgrammingLanguageChange = (event) => {
        const value = event.target.value;
        setProgrammingLanguage(value);
        setUserData(prevUserData => ({ ...prevUserData, programmingLanguage: value }));
    };

    const handleExperienceLevelChange = (event) => {
        const value = event.target.value;
        setExperienceLevel(value);
        setUserData(prevUserData => ({ ...prevUserData, experienceLevel: value }));
    };

    const handleDevelopmentStackChange = (event) => {
        const value = event.target.value;
        const stack = event.target.checked
            ? [...developmentStack, value]
            : developmentStack.filter(item => item !== value);
        setDevelopmentStack(stack);
        setUserData(prevUserData => ({ ...prevUserData, developmentStack: stack }));
    };

    const handleInterestedAreasChange = (event) => {
        const value = event.target.value;
        const areas = event.target.checked
            ? [...interestedAreas, value]
            : interestedAreas.filter(item => item !== value);
        setInterestedAreas(areas);
        setUserData(prevUserData => ({ ...prevUserData, interestedAreas: areas }));
    };

    const handlePrevious = () => {
        setStep(1);
    };

    const handleNext = () => {
        if (!programmingLanguage || !experienceLevel || developmentStack.length === 0) {
            alert('Please fill in all required fields.');
            return;
        }
        setStep(3);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Technical Skills and Preferences
            </Typography>
            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                <FormLabel>Primary Programming Language</FormLabel>
                <Select
                    value={programmingLanguage}
                    onChange={handleProgrammingLanguageChange}
                    required
                >
                    <MenuItem value="">Select Programming Language</MenuItem>
                    <MenuItem value="JavaScript">JavaScript</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                    <MenuItem value="Java">Java</MenuItem>
                    <MenuItem value="C#">C#</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                <FormLabel>Experience Level</FormLabel>
                <Select
                    value={experienceLevel}
                    onChange={handleExperienceLevelChange}
                    required
                >
                    <MenuItem value="">Select Experience Level</MenuItem>
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                    <MenuItem value="Expert">Expert</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <FormLabel>Preferred Development Stack</FormLabel>
                <FormGroup style={{ flexDirection: 'row' }}>
                    <FormControlLabel
                        control={<Checkbox checked={developmentStack.includes('MEAN')} onChange={handleDevelopmentStackChange} value="MEAN" />}
                        label="MEAN"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={developmentStack.includes('MERN')} onChange={handleDevelopmentStackChange} value="MERN" />}
                        label="MERN"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={developmentStack.includes('LAMP')} onChange={handleDevelopmentStackChange} value="LAMP" />}
                        label="LAMP"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={developmentStack.includes('OTHER')} onChange={handleDevelopmentStackChange} value="OTHER" />}
                        label="OTHER"
                    />
                </FormGroup>
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <FormLabel>Interested Areas in Task Scheduling</FormLabel>
                <FormGroup style={{ flexDirection: 'row' }}>
                    <FormControlLabel
                        control={<Checkbox checked={interestedAreas.includes('UI/UX Design')} onChange={handleInterestedAreasChange} value="UI/UX Design" />}
                        label="UI/UX Design"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={interestedAreas.includes('Backend Development')} onChange={handleInterestedAreasChange} value="Backend Development" />}
                        label="Backend Development"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={interestedAreas.includes('Database Management')} onChange={handleInterestedAreasChange} value="Database Management" />}
                        label="Database Management"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={interestedAreas.includes('Authentication')} onChange={handleInterestedAreasChange} value="Authentication" />}
                        label="Authentication"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={interestedAreas.includes('Real-Time Updates')} onChange={handleInterestedAreasChange} value="Real-Time Updates" />}
                        label="Real-Time Updates"
                    />
                </FormGroup>
            </FormControl>
            <Button variant="contained" onClick={handlePrevious} color="secondary" style={{ marginBottom: '1rem' }}>Previous</Button>
            <Button variant="contained" onClick={handleNext} color="primary">Next</Button>
        </div>
    );
};
export default TechnicalSkills;
