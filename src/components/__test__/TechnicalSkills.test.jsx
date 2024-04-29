
// TechnicalSkills.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TechnicalSkills from '../TechnicalSkills';
import { multiStepContext } from '../../context/stepContext';

// Mock context setup
const mockContextValue = {
  setStep: jest.fn(),
  setUserData: jest.fn(),
  userData: {
    programmingLanguage: '',
    experienceLevel: '',
    developmentStack: [],
    interestedAreas: []
  }
};
const wrapper = ({ children }) => (
  <multiStepContext.Provider value={mockContextValue}>
    {children}
  </multiStepContext.Provider>
);

describe('TechnicalSkills Component', () => {
  test('renders technical skill selection fields', () => {
    render(<TechnicalSkills />, { wrapper });
    expect(screen.getByText(/primary programming language/i)).toBeInTheDocument();
    expect(screen.getByText(/experience level/i)).toBeInTheDocument();
    expect(screen.getByText(/preferred development stack/i)).toBeInTheDocument();
  });

  test('handles changes in programming language', () => {
    render(<TechnicalSkills />, { wrapper });
    fireEvent.change(screen.getByLabelText(/primary programming language/i), { target: { value: 'JavaScript' } });
    expect(mockContextValue.setUserData).toHaveBeenCalled();
  });
});