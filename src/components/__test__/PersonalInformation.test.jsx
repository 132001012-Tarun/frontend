import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonalInformation from '../PersonalInformation';
import { multiStepContext } from '../../context/stepContext';

// Mock context provider
const mockSetStep = jest.fn();
const mockSetUserData = jest.fn();
const wrapper = ({ children }) => (
  <multiStepContext.Provider value={{ setStep: mockSetStep, setUserData: mockSetUserData, userData: {} }}>
    {children}
  </multiStepContext.Provider>
);

describe('PersonalInformation Component', () => {
  test('renders inputs for personal information', () => {
    render(<PersonalInformation />, { wrapper });
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birthdate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

    test('submits personal information', () => {     render(<PersonalInformation />, { wrapper });
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/birthdate/i), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
      fireEvent.click(screen.getByText(/next/i));
      expect(mockSetUserData).toHaveBeenCalledTimes(4);
      expect(mockSetStep).toHaveBeenCalledWith(2);
  });
});