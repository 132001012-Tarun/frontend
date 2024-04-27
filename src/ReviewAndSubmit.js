import React, { useContext } from 'react';
import { multiStepContext } from './stepContext';
import axios from 'axios';

const ReviewAndSubmit = () => {
  const { userData ,setStep} = useContext(multiStepContext);

  // Destructure userData object
  const { fullName, birthdate, email, phoneNumber, programmingLanguage, experienceLevel, developmentStack, interestedAreas} = userData;

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
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

    

  return (
    <div>
      <h2>Review and Submit</h2>
      <h3>Personal Information:</h3>
      <p>Full Name: {fullName}</p>
      <p>Birthdate: {birthdate}</p>
      <p>Email: {email}</p>
      <p>Phone Number: {phoneNumber}</p>

      <h3>Technical Skills and Preferences:</h3>
      <p>Programming Language: {programmingLanguage}</p>
      <p>Experience Level: {experienceLevel}</p>
      <p>Development Stack: {developmentStackString}</p>
      <p>Interested Areas: {interestedAreasString}</p>

      {/* Edit and Submit buttons */}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default ReviewAndSubmit;
