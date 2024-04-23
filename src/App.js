import React, { useContext } from 'react';
import PersonalInformation from './PersonalInformation';
import TechnicalSkills from './TechnicalSkills';
import UploadSection from './uploadSection';
import ReviewAndSubmit from './ReviewAndSubmit';
import {Stepper,StepLabel,Step} from '@mui/material'
import {multiStepContext} from './stepContext';

const App = () => {
  const{currentStep,finalData}=useContext(multiStepContext);
  function showStep(step){
    switch(step){
      case 1: 
        return <PersonalInformation/>
      case 2:
        return <TechnicalSkills/>
      case 3:
        return <UploadSection/>  
      case 4:
        return <ReviewAndSubmit/> 
    }
  }
  return (
    <div>
      <div>
      <Stepper style={{width:'18%'}} activeStep={currentStep-1} orientation="horizontal"></Stepper>
      <Step>
        <StepLabel></StepLabel>
      </Step>
      <Step>
        <StepLabel></StepLabel>
      </Step>
      <Step>
        <StepLabel></StepLabel>
      </Step>
      <Step>
        <StepLabel></StepLabel>
      </Step>
      </div>
      {showStep(currentStep)}
    </div>
  )   
};

export default App;