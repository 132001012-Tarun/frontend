// StepContext.test.js
import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import StepContext, { multiStepContext } from '../stepContext';
import '@testing-library/jest-dom';

// A mock component to consume our context
const MockComponent = () => {
  const { currentStep, setStep, userData, setUserData, finalData, setFinalData } = useContext(multiStepContext);

  return (
    <div>
      <div data-testid="step">{currentStep}</div>
      <button onClick={() => setStep(currentStep + 1)}>Increment Step</button>
      <div data-testid="userData">{JSON.stringify(userData)}</div>
      <button onClick={() => setUserData(['test'])}>Set User Data</button>
      <div data-testid="finalData">{JSON.stringify(finalData)}</div>
      <button onClick={() => setFinalData(['final'])}>Set Final Data</button>
    </div>
  );
};

describe('StepContext', () => {
  test('initial context values are set correctly', () => {
    const { getByTestId } = render(
      <StepContext>
        <MockComponent />
      </StepContext>
    );

    expect(getByTestId('step').textContent).toBe('1');
    expect(getByTestId('userData').textContent).toBe('[]');
    expect(getByTestId('finalData').textContent).toBe('[]');
  });

  test('context setters update the values correctly', () => {
    const { getByTestId, getByText } = render(
      <StepContext>
        <MockComponent />
      </StepContext>
    );

    act(() => {
      getByText('Increment Step').click();
      getByText('Set User Data').click();
      getByText('Set Final Data').click();
    });

    expect(getByTestId('step').textContent).toBe('2');
    expect(getByTestId('userData').textContent).toBe('["test"]');
    expect(getByTestId('finalData').textContent).toBe('["final"]');
  });
});
