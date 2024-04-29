// UploadSection.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadSection from '../uploadSection';
import { multiStepContext } from '../../context/stepContext';

// Mock context
const mockSetStep = jest.fn();
const mockSetUserData = jest.fn();
const wrapper = ({ children }) => (
  <multiStepContext.Provider value={{ setStep: mockSetStep, setUserData: mockSetUserData, userData: {} }}>
    {children}
  </multiStepContext.Provider>
);

describe('UploadSection Component', () => {
  test('renders file upload section', () => {
    render(<UploadSection />, { wrapper });
    expect(screen.getByText(/choose file/i)).toBeInTheDocument();
  });

  test('handles file selection', () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    render(<UploadSection />, { wrapper });
    const input = screen.getByLabelText(/choose file/i);
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText(/selected file: hello.png/i)).toBeInTheDocument();
  });
});