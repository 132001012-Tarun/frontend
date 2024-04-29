import React, { useContext } from 'react';
import PersonalInformation from './components/PersonalInformation';
import TechnicalSkills from './components/TechnicalSkills';
import UploadSection from './components/uploadSection';
import ReviewAndSubmit from './components/reviewAndSubmit';
import {Stepper,StepLabel,Step} from '@mui/material'
import {multiStepContext} from './context/stepContext';
import './styles/App.css'

const App = () => {
  const{currentStep}=useContext(multiStepContext);
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
    <div className="App">
      <div className="App-header">
        <div className="center-stepper">
          <Stepper style={{width:'18%'}} activeStep={currentStep-1} orientation="horizontal">
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
          </Stepper>
        </div>
      {showStep(currentStep)}
     </div>
    </div>
  )   
};

export default App;