import React, { useContext, useState } from 'react';
import { multiStepContext } from '../context/stepContext';
import axios from 'axios';
import { Button, Typography } from '@mui/material';

const ReviewAndSubmit = () => {
    const { userData, setStep } = useContext(multiStepContext);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    // Destructure userData object
    const { fullName, birthdate, email, phoneNumber, programmingLanguage, experienceLevel, developmentStack, interestedAreas } = userData;

    // Ensure that developmentStack and interestedAreas are arrays before calling join method
    const developmentStackString = developmentStack ? developmentStack.join(', ') : '';
    const interestedAreasString = interestedAreas ? interestedAreas.join(', ') : '';

    // Placeholder functions for onEdit and onSubmit
    const onEdit = () => {
        // Handle edit functionality
        setStep(3);
    };

    const onSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/user', userData);
            console.log('User created successfully:', response.data);
            setSubmissionStatus('success');
        } catch (error) {
            console.error('Error creating user:', error);
            setSubmissionStatus('error');
        }
    };

    return (
        <div>
            <Typography variant="h4">Review and Submit</Typography>
            <Typography variant="h5">Personal Information:</Typography>
            <Typography>Full Name: {fullName}</Typography>
            <Typography>Birthdate: {birthdate}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Phone Number: {phoneNumber}</Typography>

            <Typography variant="h5">Technical Skills and Preferences:</Typography>
            <Typography>Programming Language: {programmingLanguage}</Typography>
            <Typography>Experience Level: {experienceLevel}</Typography>
            <Typography>Development Stack: {developmentStackString}</Typography>
            <Typography>Interested Areas: {interestedAreasString}</Typography>

            {/* Show submission status */}
            {submissionStatus === 'success' && (
                <Typography variant="body1" style={{ color: 'green' }}>Application submitted successfully!</Typography>
            )}
            {submissionStatus === 'error' && (
                <Typography variant="body1" style={{ color: 'red' }}>Failed to submit application. Please try again later.</Typography>
            )}

            {/* Edit and Submit buttons */}
            <Button variant="contained" onClick={onEdit} color="secondary">Edit</Button>
            <Button variant="contained" onClick={onSubmit} color="primary">Submit</Button>
        </div>
    );
};

export default ReviewAndSubmit;
