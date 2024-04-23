import React, { useState, useContext } from 'react';
import { multiStepContext } from './stepContext';
import { Button, TextField } from '@mui/material';

const PersonalInformation = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  const [fullName, setFullName] = useState(userData.fullName || ''); // Initialize state with userData values
  const [birthdate, setBirthdate] = useState(userData.birthdate || ''); // Initialize state with userData values
  const [email, setEmail] = useState(userData.email || ''); // Initialize state with userData values
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || ''); // Initialize state with userData values

  // Update userData state whenever any input field changes
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setUserData({ ...userData, fullName: e.target.value });
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
    setUserData({ ...userData, birthdate: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setUserData({ ...userData, phoneNumber: e.target.value });
  };

  const handleNext = () => {
    // Perform validation here if needed

    // Basic validations
    if (!fullName || !birthdate || !email || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number format
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      alert('Please enter a valid phone number (10 digits).');
      return;
    }

    // Move to the next step if all validations pass
    setStep(2); // Move to the next step
  };

  return (
    <div>
      <div>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
          margin="normal"
          variant="outlined"
          color="secondary"
          required
        />
      </div>
      <div>
        <TextField
          label="Birthdate"
          type="date"
          value={birthdate}
          onChange={handleBirthdateChange}
          margin="normal"
          variant="outlined"
          color="secondary"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          variant="outlined"
          color="secondary"
          required
        />
      </div>
      <div>
        <TextField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          margin="normal"
          variant="outlined"
          color="secondary"
          required
          pattern="[0-9]{10}"
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleNext} color="primary">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalInformation;
