import React, { useState, useContext } from 'react';
import { multiStepContext } from '../context/stepContext';
import { Button, TextField, Typography, Grid } from '@mui/material';
import { validateEmail, validatePhoneNumber } from  '../utils/PersonalInformationUtils'

const PersonalInformation = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  const [fullName, setFullName] = useState(userData.fullName || '');
  const [birthdate, setBirthdate] = useState(userData.birthdate || '');
  const [email, setEmail] = useState(userData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || '');

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
    if (!fullName || !birthdate || !email || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number (10 digits).');
      return;
    }

    setStep(2);
  };

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <TextField
          label="Birthdate"
          type="date"
          value={birthdate}
          onChange={handleBirthdateChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <TextField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          fullWidth
          required
          pattern="[0-9]{10}"
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handleNext}
          color="primary"
          fullWidth
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default PersonalInformation;
