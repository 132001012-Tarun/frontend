import React, { useState, useContext, useEffect } from 'react';
import { multiStepContext } from '../context/stepContext';
import { Button, Typography, Grid, Box } from '@mui/material';
import { validateResume } from '../utils/uploadSectionUtils';


const UploadSection = () => {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const [resume, setResume] = useState(null); // Initialize state with null initially
    const [resumeError, setResumeError] = useState(false); // State to track resume error

    // Initialize resume state with the value from userData when component mounts
    useEffect(() => {
        setResume(userData.resume || null);
    }, [userData.resume]);

    // Update userData state whenever file input changes
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        const validation = validateResume(file);
        if (!validation.isValid) {
            alert(validation.errorMessage);
            return;
        }
        setResume(file);
        setResumeError(false); // Clear resume error
        setUserData({ ...userData, resume: file });
    };

    const handleNext = () => {
        if (!resume) {
            setResumeError(true); // Set resume error if no file selected
            return;
        }
        setStep(4); // Move to the next step
    };

    // Conditionally render a message based on whether resume exists
    const resumeMessage = resume ? `Selected file: ${resume.name}` : 'No file chosen';

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleResumeChange}
                        required
                        style={{ display: 'none' }}
                        id="upload-input"
                    />
                    <label htmlFor="upload-input">
                        <Button variant="contained" component="span" color="primary">
                            Choose File
                        </Button>
                    </label>
                    <Typography variant="body1" ml={1}>{resumeMessage}</Typography>
                </Box>
                {/* Display error message if no file selected */}
                {resumeError && <Typography variant="body2" color="error">Please select a file.</Typography>}
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={() => setStep(2)} color="secondary">Previous</Button>
                    <Button variant="contained" onClick={handleNext} color="primary">Next</Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default UploadSection;
