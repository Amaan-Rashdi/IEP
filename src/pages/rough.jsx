import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HobbiesAndInterest from './HobbiesAndIntrest';
import Aspired from './Aspired';
import Header from '../components/Header';
import StudentInformation from '../components/StudentInformation';
import Riasec from '../components/Riasec';
import Prefrence from './Preference';
import College from './College';
import { HobbiesAndIntrest, PersonalStatement, PersonalStrengths, ProfileBuilding, Recommendation, TeacherRecommendation } from '.';
import HonrsAndAward from './HonorsAndAward';
import FurtherStudies from '../components/FurtherStudies'
import PreferredSubjects from '../components/PreferredSubjects'

const steps = [
    { label: 'RIASEC Test and Career Choices', component: (
      <>
        <Riasec />
        <br></br>
        <Aspired />
      </>
    )},
    { label: 'Further Studies Preferences', component: (
        <>
          <FurtherStudies />
          <br></br>
          <PreferredSubjects />
        </>
      )},
      { label: 'A-Level/HSSC Plans', component: (
        <>
          <Prefrence />
          <br></br>
          <College />
        </>
      )},
      { label: 'Personal Strengths and Qualities', component: (
        <>
          <PersonalStrengths />
        </>
      )},
      { label: 'Hobbies/Interests', component: (
        <>
          <HobbiesAndIntrest />
         
        </>
      )},
      { label: 'Honors and Awards', component: (
        <>
          <HonrsAndAward />
        </>
      )},
      { label: 'Profile Building Activities', component: (
        <>
          <ProfileBuilding />
         
        </>
      )},
      { label: 'Recommendation and Personal Statement', component: (
        <>
          <PersonalStatement />
          <br></br>
          <Recommendation/>
          <br></br>
          <TeacherRecommendation/>
        </>
      )},
    // Add more steps as needed
  ];
  

const Wizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
          <Header></Header>
            <br></br>
            <StudentInformation></StudentInformation>
            <br></br>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Stepper activeStep={activeStep} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px' }}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}  sx={{ margin: '10px 0' }} >{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
            <Box sx={{ width: '70%', justifyContent: 'center' }}>
      
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
          <Box sx={{ mt: 3, border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
  {steps.map((step, index) => (
    <div key={index} style={{ display: index === activeStep ? 'block' : 'none' }}>
      {step.component}
    </div>
  ))}
</Box>

        </React.Fragment>
      )}
    </Box>
    </Box>
    </div>
  );
};

export default Wizard;
