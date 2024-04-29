// ReviewAndSubmit.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewAndSubmit from '../reviewAndSubmit';
import { multiStepContext } from '../../context/stepContext';
import axios from 'axios';

// Mock axios and context
jest.mock('axios');
const mockSetStep = jest.fn();
const mockUserData = {
  fullName: 'John Doe',
  birthdate: '1990-01-01',
  email: 'john@example.com',
  phoneNumber: '1234567890'
};
const wrapper = ({ children }) => (
  <multiStepContext.Provider value={{ userData: mockUserData, setStep: mockSetStep }}>
    {children}
  </multiStepContext.Provider>
);

describe('ReviewAndSubmit Component', () => {
  test('displays user data for review', () => {
    render(<ReviewAndSubmit />, { wrapper });
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/1990-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
  });

  test('handles submit', async () => {
    axios.post.mockResolvedValue({ data: 'User created successfully' });
    render(<ReviewAndSubmit />, { wrapper });
    fireEvent.click(screen.getByText(/submit/i));
    expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/user', mockUserData);
  });
});