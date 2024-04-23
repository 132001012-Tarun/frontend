import React, { useState, useContext, useEffect } from 'react';
import { multiStepContext } from './stepContext';
import { Button } from '@mui/material';

const UploadSection = () => {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const [resume, setResume] = useState(null); // Initialize state with null initially

    // Initialize resume state with the value from userData when component mounts
    useEffect(() => {
        setResume(userData.resume || null);
    }, [userData.resume]);

    // Update userData state whenever file input changes
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('Please select a file.');
            return;
        }
        // Check file format
        const allowedFormats = ['.pdf', '.docx'];
        const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
        if (!allowedFormats.includes(fileExtension)) {
            alert('Please select a PDF or DOCX file.');
            return;
        }
        // Check file size
        const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSizeInBytes) {
            alert('File size exceeds the limit (10MB).');
            return;
        }
        setResume(file);
        setUserData({ ...userData, resume: file });
    };

    const handleNext = (e) => {
        setStep(4); // Move to the next step
    };

    // Conditionally render a message based on whether resume exists
    const resumeMessage = resume ? `Selected file: ${resume.name}` : 'No file chosen';

    return (
        <div>
            <div>
                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleResumeChange}
                    required
                />
                <p>{resumeMessage}</p>
            </div>
            <div>
                <Button variant="contained" onClick={() => setStep(2)} color="secondary">Previous</Button>
                <Button variant="contained" onClick={handleNext} color="primary">Next</Button>
            </div>
        </div>
    );
};

export default UploadSection;
